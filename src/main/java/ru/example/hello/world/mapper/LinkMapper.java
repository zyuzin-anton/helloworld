package ru.example.hello.world.mapper;

import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;
import ru.example.hello.world.dto.LinkDto;
import ru.example.hello.world.entity.Link;

import java.util.Arrays;
import java.util.List;

import static ru.example.hello.world.entity.Link_.*;

@Component
public class LinkMapper extends BaseMapperAdapter<Link, LinkDto> {

    public LinkMapper() {
    }

    @Override
    protected void mapAtoB(Link link, LinkDto linkDto, MappingContext context) {
        super.mapAtoB(link, linkDto, context);

        linkDto.setId(link.getId());
        linkDto.setSource(link.getSource().getId());
        linkDto.setTarget(link.getTarget().getId());
        linkDto.setType(link.getType());
    }

    @Override
    protected List<String> exclusionFields() {
        return Arrays.asList(source.getName(), target.getName());
    }
}
