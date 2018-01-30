package ru.example.hello.world.mapper;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.ClassMapBuilder;

import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class BaseMapper<A, B> extends ConfigurableMapper{

    private Class<A> classA;
    private Class<B> classB ;

    public BaseMapper() {
    }

    public BaseMapper(Class<A> classA, Class<B> classB) {
        this.classA = classA;
        this.classB = classB;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void init() {
        this.classA = (Class<A>) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        this.classB = (Class<B>) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[1];

        super.init();
    }

    protected abstract void mapAtoB(A a, B b, MappingContext context);

    protected abstract void mapBtoA(B b, A a, MappingContext context);

    protected abstract List<String> exclusionFields();

    @Override
    protected void configure(MapperFactory factory) {
        ClassMapBuilder<A, B> classMapBuilder = factory.classMap(classA, classB);

        for (String fieldName : exclusionFields()) {
            classMapBuilder.exclude(fieldName);
        }

        classMapBuilder
            .byDefault()
            .customize(new CustomMapper<A, B>() {
                @Override
                public void mapAtoB(A a, B b, MappingContext context) {
                    BaseMapper.this.mapAtoB(a, b, context);
                }

                @Override
                public void mapBtoA(B b, A a, MappingContext context) {
                    BaseMapper.this.mapBtoA(b, a, context);
                }
            })
            .register();
    }
}
