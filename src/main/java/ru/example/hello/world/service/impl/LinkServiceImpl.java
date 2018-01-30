package ru.example.hello.world.service.impl;

import com.googlecode.genericdao.search.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.example.hello.world.dao.BaseDao;
import ru.example.hello.world.dao.DaoFactory;
import ru.example.hello.world.dto.LinkDto;
import ru.example.hello.world.entity.Link;
import ru.example.hello.world.mapper.LinkMapper;
import ru.example.hello.world.service.LinkService;

import java.util.List;

@Service
public class LinkServiceImpl extends BaseServiceImpl<Link, Long> implements LinkService {

    @Autowired
    private DaoFactory daoFactory;

    @Autowired
    private LinkMapper linkMapper;

    @Override
    @Transactional(readOnly = true)
    public List<LinkDto> findAll() {
        BaseDao<Link, Long> baseDao = daoFactory.getDaoForClass(Link.class);

        Search search = new Search();
        search.addFetches("source", "target");

        List<Link> linkList = baseDao.search(search);

        return linkMapper.mapAsList(linkList, LinkDto.class);
    }
}
