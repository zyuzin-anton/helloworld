package ru.example.hello.world.action;

import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.ReactiveAction;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Component
public class StartRegistrationAction implements ReactiveAction<TelegramBotState, TelegramBotCommand> {
    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        context.getExtendedState().getVariables().put(ActionVariable.RESPONSE_MESSAGE, "Type your todo list account username");
        return Mono.empty();
    }
}
