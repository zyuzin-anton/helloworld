delete from todo;
alter table todo add column username varchar(32) not null;
alter table todo alter column date type timestamp with time zone;

create table telegram_chat(
    id serial,
    username varchar(256) not null,
    chat_id bigint not null
);

create index on telegram_chat(username);
create index on telegram_chat(chat_id);