package ru.example.hello.world.action;

import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.ReactiveAction;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.TelegramChat;
import ru.example.hello.world.service.TelegramChatService;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Component
@AllArgsConstructor
public class SaveUsernameAction implements ReactiveAction<TelegramBotState, TelegramBotCommand> {

    private TelegramChatService telegramChatService;

    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        val username = context.getExtendedState().get(ActionVariable.REQUEST_MESSAGE, String.class);
        context.getExtendedState().getVariables().put(ActionVariable.USERNAME, username);
        val chatId = context.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
        return telegramChatService.findByChatId(chatId)
                .switchIfEmpty(Mono.error(new RuntimeException()))
                .flatMap(telegramChat -> {
                    if (telegramChat.getUsername().equals(username)) {
                        return alreadyRegister(username);
                    } else {
                        return update(chatId, username);
                    }
                })
                .doOnError(error -> create(chatId, username).subscribe(responseMessage -> context.getExtendedState().getVariables().put(ActionVariable.RESPONSE_MESSAGE, responseMessage)))
                .map(responseMessage -> {
                    return context.getExtendedState().getVariables().put(ActionVariable.RESPONSE_MESSAGE, responseMessage);
                })
                .then();
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
