package ru.example.hello.world.dto;

import java.util.List;

public class DiagramData {

    private List<TaskDto> data;

    private List<LinkDto> links;

    public DiagramData(List<TaskDto> data, List<LinkDto> links) {
        this.data = data;
        this.links = links;
    }

    public List<TaskDto> getData() {
        return data;
    }

    public void setData(List<TaskDto> data) {
        this.data = data;
    }

    public List<LinkDto> getLinks() {
        return links;
    }

    public void setLinks(List<LinkDto> links) {
        this.links = links;
    }
}
