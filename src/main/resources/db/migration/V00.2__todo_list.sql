create table todo(
    id serial,
    date timestamp not null,
    description text not null,
    user_id text not null,
    is_deleted boolean default false
);

create index on todo(user_id);
create index on todo(date);