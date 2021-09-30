package ru.example.hello.world.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.relational.core.mapping.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@Table("telegram_chat")
public class TelegramChatEntity extends BaseEntity {
    private String username;
    private Long chatId;
}
