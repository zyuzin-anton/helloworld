package ru.example.hello.world.telegram;

import com.pengrad.telegrambot.request.SendMessage;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.UpdatesListener;
import org.apache.commons.lang.StringUtils;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.statemachine.config.StateMachineFactory;
import org.springframework.statemachine.persist.StateMachinePersister;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.action.ActionVariable;
import ru.example.hello.world.action.TelegramBotReactiveAction;
import ru.example.hello.world.config.properties.TelegramBotProperties;
import ru.example.hello.world.dto.TodoUserData;
import ru.example.hello.world.service.TelegramChatService;
import ru.example.hello.world.service.TodoService;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
public class TodoTelegramBot extends TelegramBot {

    private final StateMachineFactory<TelegramBotState, TelegramBotCommand> stateMachineFactory;
    private final StateMachinePersister<TelegramBotState, TelegramBotCommand, Long> persister;
    private final TodoService todoService;
    private final TelegramChatService telegramChatService;
    private final List<TelegramBotReactiveAction> telegramBotReactiveActionList;

    public TodoTelegramBot(
            TelegramBotProperties telegramBotProperties,
            StateMachineFactory<TelegramBotState, TelegramBotCommand> stateMachineFactory,
            StateMachinePersister<TelegramBotState, TelegramBotCommand, Long> persister,
            TodoService todoService,
            TelegramChatService telegramChatService,
            List<TelegramBotReactiveAction> telegramBotReactiveActionList
    ) {
        super(telegramBotProperties.getToken());
        this.stateMachineFactory = stateMachineFactory;
        this.persister = persister;
        this.todoService = todoService;
        this.telegramChatService = telegramChatService;
        this.telegramBotReactiveActionList = telegramBotReactiveActionList;
    }

    @PostConstruct
    private void init() {
        telegramBotReactiveActionList.forEach(action -> action.setTodoTelegramBot(this));
        setUpdatesListener(updates -> {
            updates.forEach(update -> {
                if (StringUtils.isBlank(update.message().text())) {
                    return;
                }
                val stateMachine = stateMachineFactory.getStateMachine();
                try {
                    persister.restore(stateMachine, update.message().chat().id());
                    if (stateMachine.getState().getId().equals(TelegramBotState.PRE_END)) {
                        stateMachine.getExtendedState().getVariables().clear();
                        stateMachine.sendEvent(Mono.just(MessageBuilder.withPayload(TelegramBotCommand.START).build())).blockLast();
                    }
                } catch (Exception e) {
                    stateMachine.startReactively().subscribe();
                }
                stateMachine.getExtendedState().getVariables().put(ActionVariable.CHAT_ID, update.message().chat().id());
                stateMachine.getExtendedState().getVariables().put(ActionVariable.REQUEST_MESSAGE, update.message().text());
                stateMachine.getExtendedState().getVariables().put(ActionVariable.LOCALE, update.message().from().languageCode());
                log.info("State machine current state: {} for chat: {}", stateMachine.getState().getId(), update.message().chat().id());
                val event = MessageBuilder.withPayload(TelegramBotCommand.of(update.message().text())).build();
                log.info("Send event: {} for chat: {}", event.getPayload(), update.message().chat().id());
                stateMachine.sendEvent(Mono.just(event)).blockLast();
                log.info("Event: {} has been sent for chat: {}", event.getPayload(), update.message().chat().id());
            });
            return UpdatesListener.CONFIRMED_UPDATES_ALL;
        });
    }

    @Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void sendNotifications() {
        val currentDateTime = LocalDateTime.now();
        todoService.findTodoInRateRange(currentDateTime.minusMinutes(1).plusSeconds(1), currentDateTime)
                .subscribe(this::sendNotification);
    }

    private void sendNotification(TodoUserData todoUserData) {
        telegramChatService.findByUsername(todoUserData.getUsername())
                .subscribe(telegramChat -> execute(
                        new SendMessage(
                                telegramChat.getChatId(),
                                String.format("%s", todoUserData.getDescription())
                        ))
                );
    }

    public void sendMessage(Long chatId, String message) {
        log.info("Send response to user {} in chat {}", message, chatId);
        execute(new SendMessage(
                chatId, message != null
                ? message
                : "Unknown command, sorry, I'm steel in development mode"
        ));
    }
}
