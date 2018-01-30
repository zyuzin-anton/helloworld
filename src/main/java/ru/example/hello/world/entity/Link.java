package ru.example.hello.world.entity;

import javax.persistence.*;

@Entity
@Table(name = "diagram_link")
public class Link extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source", nullable = false)
    private Task source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target", nullable = false)
    private Task target;

    @Column(name = "type")
    private String type;

    public Task getSource() {
        return source;
    }

    public void setSource(Task source) {
        this.source = source;
    }

    public Task getTarget() {
        return target;
    }

    public void setTarget(Task target) {
        this.target = target;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
