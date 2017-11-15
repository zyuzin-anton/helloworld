package ru.example.hello.world.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.example.hello.world.dao.impl.BaseDaoImpl;
import ru.example.hello.world.entity.BaseEntity;

@Component
public class DaoFactory {

    @Autowired
    private SessionFactory sessionFactory;

    public <ENTITY extends BaseEntity> BaseDao<ENTITY, Long> getDaoForClass(Class<ENTITY> clazz) {
        BaseDao<ENTITY, Long> baseDao = new BaseDaoImpl<>();

        baseDao.setSessionFactory(sessionFactory);
        baseDao.setPersistentClass(clazz);

        return baseDao;
    }
}
