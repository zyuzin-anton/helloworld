package ru.example.hello.world.mapper;

import ma.glasnost.orika.MappingContext;

public class BaseMapperAdapter<A, B> extends BaseMapper<A, B> {

    public BaseMapperAdapter() {
    }

    public BaseMapperAdapter(Class<A> classA, Class<B> classB) {
        super(classA, classB);
    }

    @Override
    protected void mapAtoB(A a, B b, MappingContext context) {
    }

    @Override
    protected void mapBtoA(B b, A a, MappingContext context) {
    }
}
