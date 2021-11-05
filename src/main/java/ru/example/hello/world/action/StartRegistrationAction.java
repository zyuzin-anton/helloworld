package ru.example.hello.world.action;

import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.statemachine.StateContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

@Component
@AllArgsConstructor
public class StartRegistrationAction extends TelegramBotReactiveAction {
    @Override
    public Mono<Void> apply(StateContext<TelegramBotState, TelegramBotCommand> context) {
        val chatId = context.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
        val locale = context.getExtendedState().get(ActionVariable.LOCALE, String.class);
        sendMessage(chatId, message.getMessage("telegram.bot.registration.start", locale));
        return Mono.empty();
    }
}
