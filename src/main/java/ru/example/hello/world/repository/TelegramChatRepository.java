package ru.example.hello.world.repository;

import reactor.core.publisher.Mono;
import ru.example.hello.world.entity.TelegramChatEntity;

public interface TelegramChatRepository extends BaseRepository<TelegramChatEntity> {
    Mono<TelegramChatEntity> findByChatId(Long chatId);
    Mono<TelegramChatEntity> findByUsername(String username);
}
