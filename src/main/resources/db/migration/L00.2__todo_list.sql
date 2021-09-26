create table todo(
    id serial,
    date timestamp not null,
    description varchar(256) not null,
    user_id varchar(256) not null,
    is_deleted boolean default false
);

create index on todo(date);

insert into todo(date, description, user_id) values (parsedatetime('24-09-2021 11:00:00.069', 'dd-MM-yyyy hh:mm:ss.SS'), 'do something', '894fac32-328f-492f-90b3-3002cb52fbc6')