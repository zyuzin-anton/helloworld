package ru.example.hello.world.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "hello")
public class Hello extends BaseEntity {

    @Column(name = "description")
    private String description;
}
