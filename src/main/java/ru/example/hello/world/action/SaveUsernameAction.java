package ru.example.hello.world.action;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.statemachine.StateContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.TelegramChat;
import ru.example.hello.world.service.TelegramChatService;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Slf4j
@Component
@AllArgsConstructor
public class SaveUsernameAction extends TelegramBotReactiveAction {

    private TelegramChatService telegramChatService;

    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        val username = context.getExtendedState().get(ActionVariable.REQUEST_MESSAGE, String.class);
        context.getExtendedState().getVariables().put(ActionVariable.USERNAME, username);
        val chatId = context.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
        log.info("Start registration for username: {} and chat: {}", username, chatId);
        return telegramChatService.findByChatId(chatId)
                .switchIfEmpty(Mono.error(new RuntimeException()))
                .flatMap(telegramChat -> {
                    if (telegramChat.getUsername().equals(username)) {
                        log.info("Already register username: {} for chat: {}", username, chatId);
                        return alreadyRegister(username);
                    } else {
                        log.info("Update username: {} for chat: {}", username, chatId);
                        return update(chatId, username);
                    }
                })
                .doOnError(error -> {
                    log.info("Create connection username: {} for chat: {}", username, chatId);
                    create(chatId, username).subscribe(responseMessage -> sendMessage(chatId, responseMessage));
                })
                .flatMap(responseMessage -> {
                    log.info("Send response: {}", responseMessage);
                    sendMessage(chatId, responseMessage);
                    return Mono.empty();
                });
    }

    private Mono<String> alreadyRegister(String username) {
        return Mono.just(String.format("You already registered as %s! Have a nice day", username));
    }

    private Mono<String> update(Long chatId, String username) {
        return telegramChatService.updateTelegramChat(new TelegramChat(username, chatId))
                .map(telegramChat -> String.format("Info about your username is successfully updated! Now it is: %s.", username));
    }

    private Mono<String> create(Long chatId, String username) {
        return telegramChatService.createTelegramChat(new TelegramChat(username, chatId))
                .map(telegramChat -> String.format("You successfully registered as %s!", username));
    }
}
