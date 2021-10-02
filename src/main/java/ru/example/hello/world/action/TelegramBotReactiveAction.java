package ru.example.hello.world.action;

import lombok.Setter;
import org.springframework.statemachine.action.ReactiveAction;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;
import ru.example.hello.world.telegram.TodoTelegramBot;

@Setter
public abstract class TelegramBotReactiveAction implements ReactiveAction<TelegramBotState, TelegramBotCommand> {
    private TodoTelegramBot todoTelegramBot;

    void sendMessage(Long chatId, String message) {
        todoTelegramBot.sendMessage(chatId, message);
    }
}
