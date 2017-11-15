package ru.example.hello.world.dao;

import com.googlecode.genericdao.dao.hibernate.GenericDAO;
import org.hibernate.SessionFactory;
import ru.example.hello.world.entity.BaseEntity;

import java.io.Serializable;

public interface BaseDao<ENTITY extends BaseEntity, ID extends Serializable> extends GenericDAO<ENTITY, ID>{

    void setSessionFactory(SessionFactory sessionFactory);

    void setPersistentClass(Class<ENTITY> persistentClass);
}
