package ru.example.hello.world.action;

import lombok.val;
import org.springframework.statemachine.StateContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Component
public class StartRegistrationAction extends TelegramBotReactiveAction {
    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        val chatId = context.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
        sendMessage(chatId, "Type your todo list account username");
        return Mono.empty();
    }
}
