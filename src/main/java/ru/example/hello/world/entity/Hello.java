package ru.example.hello.world.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode
@Entity
@Table(name = "hello")
public class Hello extends BaseEntity {

    @Column(name = "description")
    private String description;
}
