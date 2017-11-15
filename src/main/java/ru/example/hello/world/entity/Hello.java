package ru.example.hello.world.entity;

import javax.persistence.*;

@Entity
@Table(name = "hello")
public class Hello extends BaseEntity {

    @Column(name = "description")
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
