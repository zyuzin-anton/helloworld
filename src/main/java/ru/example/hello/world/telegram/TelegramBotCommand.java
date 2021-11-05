package ru.example.hello.world.telegram;

import java.util.Arrays;

public enum TelegramBotCommand {
    START("/start"),
    LINK("/link"),
    SHOW_NEAREST("/show_nearest"),
    USER_MESSAGE(""),
    TERMINATE(null);

    private final String description;

    TelegramBotCommand(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static TelegramBotCommand of(String description) {
        return Arrays.stream(values())
                .filter(value -> value.getDescription() != null && value.getDescription().equals(description))
                .findFirst()
                .orElse(USER_MESSAGE);
    }
}
