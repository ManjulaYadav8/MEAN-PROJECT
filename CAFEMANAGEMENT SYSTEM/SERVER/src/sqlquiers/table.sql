
-- // Create User Table
create table user(
        id int primary key auto_increment,
        name varchar(250),
        contactNumber varchar(20),
        email varchar(50),
        password varchar(20),
        role varchar(20),
       unique(email)
);
alter table user add status varchar(40);

insert into user(name, contactNumber, email, password,status,role) values('Admin','7411219655','manjulamanu877@gmail.com','admin@123', 'true','admin');


--//create category table

create table category(
        id int not null auto_increment,
        name varchar(250) not null,
        primary key(id)
);

--//craete product table

create table product (
        id int auto_increment not null,
        name varchar(200),
        categoryId int not null,
        price int,
        description varchar(250),
        status varchar(20),
        primary key(id)
);