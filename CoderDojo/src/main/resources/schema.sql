create table role (id bigint generated by default as identity (start with 1), name varchar(255), primary key (id));
create table user (id bigint generated by default as identity (start with 1), enabled boolean, password varchar(255), username varchar(255), primary key (id));
create table user_roles (users_id bigint not null, roles_id bigint not null, primary key (users_id, roles_id));
alter table user_roles add constraint FKj9553ass9uctjrmh0gkqsmv0d foreign key (roles_id) references role;
alter table user_roles add constraint FK7ecyobaa59vxkxckg6t355l86 foreign key (users_id) references user;
/*
create table users(
    username varchar_ignorecase(50) not null primary key,
    password varchar_ignorecase(100) not null,
    enabled boolean not null
);

create table authorities (
    username varchar_ignorecase(50) not null,
    authority varchar_ignorecase(50) not null,
    constraint fk_authorities_users foreign key(username) references users(username)
);
create unique index ix_auth_username on authorities (username,authority);

create table groups (
    id bigint generated by default as identity(start with 0) primary key,
    group_name varchar_ignorecase(50) not null
);

create table group_authorities (
    group_id bigint not null,
    authority varchar(50) not null,
    constraint fk_group_authorities_group foreign key(group_id) references groups(id)
);

create table group_members (
    id bigint generated by default as identity(start with 0) primary key,
    username varchar(50) not null,
    group_id bigint not null,
    constraint fk_group_members_group foreign key(group_id) references groups(id)
);
*/