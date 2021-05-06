Create database smartsto_app;
use smartsto_app;


create table vehicleCategories(
	vehicleCategory_id int not null auto_increment, 
    category varchar(60) not null,
    primary key (vehicleCategory_id));


create table users (
    user_id int not null primary key auto_increment,
    user_fullname varchar(60) not null,
    user_email varchar(30) not null,
    user_password varchar(100) not null,
    user_birthday date not null,    
    user_mobile int not null,
    user_nif int not null,                        
    user_moderador boolean default false,
    user_active boolean default false,
    unique key unique_email(user_email));
    
create table vehicles (
    vehicle_id int not null primary key auto_increment,
    vehicle_model varchar(30) not null,
    vehicle_brand varchar(30) not null,
    vehicle_registration varchar(30) not null,
    vehicle_user_id int not null,
    vehicle_category int not null,
    vehicle_ON boolean default true,
    foreign key (vehicle_user_id) references users(user_id),
    foreign key (vehicle_category) references vehicleCategories(vehicleCategory_id ));

create table payment_methods (
    payment_method_id int not null primary key auto_increment,
    payment_method_card_number int not null,
    payment_method_expiry_date varchar(10) not null,
    payment_method_cvv int not null,
    payment_method_user_id int not null,
    payment_method_ON boolean default true,
    foreign key (payment_method_user_id) references users(user_id));
    
create table parks (
    park_id int not null primary key auto_increment,
    park_name varchar(30) not null,
    park_spots int not null,
    park_latitude decimal(10,8) not null,
    park_longitude decimal(11,8) not null,
    park_hour_open time not null,
    park_hour_close time not null,
    park_contact int(9) not null,
    park_price_hour double not null,
	park_create_user_id int not null,
    park_ON boolean default true,
	foreign key (park_create_user_id) references users(user_id));

    create table reservations (
    reservation_id int not null primary key auto_increment,
    reservation_date datetime default current_timestamp,
    reservation_duration datetime not null,
    reservation_start_day datetime not null,
    reservation_status int not null default 4, 
    reservation_park_id int not null,
    reservation_payment_method int not null,
    foreign key (reservation_park_id) references parks(park_id),
    foreign key (reservation_payment_method) references payment_methods(payment_method_id));
    

    create table register_tokens (
	register_token_id int not null primary key auto_increment,
	register_token varchar(50) not null,
	register_token_user_id int not null,
	foreign key (register_token_user_id) references users(user_id));