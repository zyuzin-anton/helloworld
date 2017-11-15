package ru.example.hello.world.dao.impl;

import com.googlecode.genericdao.dao.hibernate.GenericDAOImpl;
import ru.example.hello.world.dao.BaseDao;
import ru.example.hello.world.entity.BaseEntity;

import java.io.Serializable;

public class BaseDaoImpl<ENTITY extends BaseEntity, ID extends Serializable> extends GenericDAOImpl<ENTITY, ID> implements BaseDao<ENTITY, ID> {

    @Override
    public void setPersistentClass(Class<ENTITY> persistentClass) {
        this.persistentClass = persistentClass;
    }
}
