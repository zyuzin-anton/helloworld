package ru.example.hello.world.action;

import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.statemachine.StateContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.service.TelegramChatService;
import ru.example.hello.world.service.TodoService;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class ShowNearestTodoAction extends TelegramBotReactiveAction {

    private TodoService todoService;
    private TelegramChatService telegramChatService;

    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        val chatId = context.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
        return telegramChatService.findByChatId(chatId)
                .switchIfEmpty(
                        Mono.defer(() -> {
                            sendMessage(chatId, "You have to link your username.");
                            return Mono.error(new RuntimeException());
                        })
                )
                .flatMap(telegramChat -> todoService.findNearestTodo(LocalDateTime.now(), telegramChat.getUsername()))
                .switchIfEmpty(
                        Mono.defer(() -> {
                            sendMessage(chatId, "You don't have any todo yeat.");
                            return Mono.error(new RuntimeException());
                        })
                )
                .flatMap(todoUserData -> {
                    sendMessage(chatId, String.format("Nearest todo:\n%tc - %s", todoUserData.getDate(), todoUserData.getDescription()));
                    return Mono.empty();
                });
    }
}
