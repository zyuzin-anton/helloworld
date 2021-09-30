alter table todo add username varchar(32);

delete from todo where user_id <> '894fac32-328f-492f-90b3-3002cb52fbc6';
update todo set username = 'user';

alter table todo alter column username set not null;
alter table todo alter column date set data type timestamp with time zone;

create table telegram_chat(
    id serial,
    username varchar(256) not null,
    chat_id bigint not null
);

create index on telegram_chat(username);
create index on telegram_chat(chat_id);