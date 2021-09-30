package ru.example.hello.world.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.ZonedDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Table("todo")
public class TodoEntity extends BaseEntity {
    @Column
    private String description;

    @Column
    private String userId;

    @Column
    private String username;

    @Column
    private ZonedDateTime date;

    @Column
    private Boolean isDeleted;
}
