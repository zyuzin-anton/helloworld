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

@Component
@Slf4j
public class TodoTelegramBot extends TelegramBot {

    private StateMachineFactory<TelegramBotState, TelegramBotCommand> stateMachineFactory;
    private StateMachinePersister<TelegramBotState, TelegramBotCommand, Long> persister;
    private TodoService todoService;
    private TelegramChatService telegramChatService;
    private List<TelegramBotReactiveAction> telegramBotReactiveActionList;

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
                    if (stateMachine.getState().getId().equals(TelegramBotState.END)) {
                        stateMachine.getExtendedState().getVariables().clear();
                        stateMachine.startReactively().subscribe();
                    }
                } catch (Exception e) {
                    stateMachine.startReactively().subscribe();
                }
                stateMachine.getExtendedState().getVariables().put(ActionVariable.CHAT_ID, update.message().chat().id());
                stateMachine.getExtendedState().getVariables().put(ActionVariable.REQUEST_MESSAGE, update.message().text());
                val event = MessageBuilder.withPayload(TelegramBotCommand.of(update.message().text())).build();
                log.info("Send event to state machine: {}", event.getPayload());
                stateMachine.sendEvent(Mono.just(event)).subscribe();
                try {
                    persister.persist(stateMachine, update.message().chat().id());
                } catch (Exception e) {
                    log.warn("Can't persist state machine for chat id: {}", update.message().chat().id(), e);
                }
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
                                String.format("Notification: %s", todoUserData.getDescription())
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
