begin;

create table if not exists surgery(
   id bigserial primary key,
   date timestamp with time zone,
   type text,
   cancelled boolean default false,
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
   dob date,
   created_at timestamp without time zone default now()
);

insert into patient(id, first_name, last_name, dob) values (1, 'Hugh', 'Laurie', '11-06-1959');
insert into patient(id, first_name, last_name, dob) values (2, 'Robert', 'Leonard', '02-28-1969');


insert into surgery(date, type, patient_id, provider_id) values ('2024-02-10', 'appendectomy', 1, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 1, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 2, 1);
insert into surgery(date, type, patient_id, provider_id) values ('2024-02-11', 'appendectomy', 2, 2);

rollback;
-- commit;
