package ru.example.hello.world.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.TelegramChat;
import ru.example.hello.world.mapper.TelegramChatMapper;
import ru.example.hello.world.repository.TelegramChatRepository;
import ru.example.hello.world.service.TelegramChatService;

@Service
@AllArgsConstructor
public class TelegramChatServiceImpl implements TelegramChatService {

    private TelegramChatRepository telegramChatRepository;
    private TelegramChatMapper telegramChatMapper;

    @Override
    public Mono<TelegramChat> findByChatId(Long chatId) {
        return telegramChatRepository.findByChatId(chatId)
                .map(telegramChatMapper::toTelegramChat);
    }

    @Override
    public Mono<TelegramChat> findByUsername(String username) {
        return telegramChatRepository.findByUsername(username).map(telegramChatMapper::toTelegramChat);
    }

    @Override
    public Mono<TelegramChat> createTelegramChat(TelegramChat telegramChat) {
        return telegramChatRepository
                .save(telegramChatMapper.toTelegramChatEntity(telegramChat))
                .map(telegramChatMapper::toTelegramChat);
    }

    @Override
    public Mono<TelegramChat> updateTelegramChat(TelegramChat telegramChat) {
        return telegramChatRepository.findByChatId(telegramChat.getChatId())
                .switchIfEmpty(Mono.error(new RuntimeException()))
                .flatMap(telegramChatEntity -> {
                    telegramChatEntity.setUsername(telegramChat.getUsername());
                    return telegramChatRepository.save(telegramChatEntity).map(telegramChatMapper::toTelegramChat);
                });
    }
}
