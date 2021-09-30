package ru.example.hello.world.action;

import lombok.AllArgsConstructor;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.action.ReactiveAction;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Component
@AllArgsConstructor
public class StartAction implements ReactiveAction<TelegramBotState, TelegramBotCommand> {

    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        context.getExtendedState().getVariables().put(
                ActionVariable.RESPONSE_MESSAGE,
                "Greetings. You can control me by sending these commands:\n/start - to start conversation\n/link - to link your telegram accout tot todo list\n");
        return Mono.empty();
    }
}
