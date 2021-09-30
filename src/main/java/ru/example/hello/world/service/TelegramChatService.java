package ru.example.hello.world.service;

import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.TelegramChat;

public interface TelegramChatService {
    Mono<TelegramChat> findByChatId(Long chatId);
    Mono<TelegramChat> findByUsername(String username);

    Mono<TelegramChat> createTelegramChat(TelegramChat telegramChat);
    Mono<TelegramChat> updateTelegramChat(TelegramChat telegramChat);
}
