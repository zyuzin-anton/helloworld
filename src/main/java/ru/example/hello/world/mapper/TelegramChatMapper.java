package ru.example.hello.world.mapper;

import org.mapstruct.Mapper;
import ru.example.hello.world.dto.TelegramChat;
import ru.example.hello.world.entity.TelegramChatEntity;

@Mapper(componentModel = "spring")
public interface TelegramChatMapper {
    TelegramChat toTelegramChat(TelegramChatEntity telegramChatEntity);
    TelegramChatEntity toTelegramChatEntity(TelegramChat telegramChat);
}
