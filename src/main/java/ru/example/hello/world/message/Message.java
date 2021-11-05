package ru.example.hello.world.message;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Component
public class Message {
    private MessageSource messageSource;
    private Map<String, Locale> locales;
    public Message(MessageSource messageSource) {
        this.messageSource = messageSource;
        locales = new HashMap<>();
        locales.put("en", Locale.ENGLISH);
        locales.put("ru", new Locale("ru"));
    }

    public String getMessage(String id, String locale) {
        return messageSource.getMessage(id, null, locales.getOrDefault(locale, Locale.ENGLISH));
    }
}
