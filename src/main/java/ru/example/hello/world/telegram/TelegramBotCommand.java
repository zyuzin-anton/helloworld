package ru.example.hello.world.telegram;

public enum TelegramBotCommand {
    START("/start"),
    LINK("/link"),
    SHOW_NEAREST("/show_nearest"),
    USER_MESSAGE("");

    private String description;

    TelegramBotCommand(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static TelegramBotCommand of(String description) {
        for (int i = 0; i < values().length; i ++) {
            if (values()[i].getDescription().equals(description)) {
                return values()[i];
            }
        }
        return USER_MESSAGE;
    }
}
