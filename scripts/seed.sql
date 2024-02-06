begin;

create table if not exists surgery(
   id bigserial primary key,
   date timestamp without time zone,
   type text,
   deleted boolean default false,
   patient_id bigint,
   provider_id bigint,
   created_at timestamp without time zone default now()
);

create table if not exists provider(
   id bigserial primary key,
   first_name text,
   last_name text,
   created_at timestamp without time zone default now()
);

insert into provider(id, first_name, last_name) values (1, 'Gregory', 'House');
insert into provider(id, first_name, last_name) values (2, 'James', 'Wilson');

create table if not exists patient(
   id bigserial primary key,
   first_name text,
   last_name text,
   created_at timestamp without time zone default now()
);

insert into patient(id, first_name, last_name) values (1, 'Hugh', 'Laurie');
insert into patient(id, first_name, last_name) values (2, 'Robert', 'Leonard');


insert into surgery(date, type, patient_id, provider_id) values ('2024-02-10', 'appendectomy', 1, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 1, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 2, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 2, 3);

rollback;
-- commit;