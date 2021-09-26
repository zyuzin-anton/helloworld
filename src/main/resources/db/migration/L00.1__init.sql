create table hello(
    id serial,
    description varchar(255) not null,
    primary key (id)
);

insert into hello values(1, 'Hello, World!');