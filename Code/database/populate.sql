INSERT INTO vehicleCategories(category) VALUES("A");
INSERT INTO vehicleCategories(category) VALUES("A1");
INSERT INTO vehicleCategories(category) VALUES("B");
INSERT INTO vehicleCategories(category) VALUES("C");
INSERT INTO vehicleCategories(category) VALUES("D");



INSERT INTO parks(park_name, park_spots ,park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id) VALUES ("Park1", 35, 1, 38.7009012, -9.217223,"Lisboa", "07:00:00", "23:00:00", 935649003,"Park1@park.com", 3, 1);
INSERT INTO parks(park_name, park_spots ,park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id) VALUES ("Park2", 55, 1, 38.703566, -9.168966,"Lisboa", "07:00:00", "23:00:00", 935981003,"Park2@park.com", 2,1);
INSERT INTO parks(park_name, park_spots ,park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id) VALUES ("Park3", 17, 1, 38.744641, -9.199860,"Lisboa", "07:00:00", "23:00:00", 935649408,"Park3@park.com", 3.5, 2);
INSERT INTO parks(park_name, park_spots ,park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id ) VALUES ("Park4", 25, 1, 38.722098, -9.1212317,"Lisboa", "07:00:00", "23:00:00", 934349003,"Park4@park.com", 5, 2);
INSERT INTO parks(park_name, park_spots ,park_types, park_latitude, park_longitude, park_localization, park_hour_open, park_hour_close, park_contact, park_email, park_price_hour, park_create_user_id) VALUES ("Park5", 43, 1, 38.4652694, -8.6760867,"Lisboa", "07:00:00", "23:00:00", 939759003,"Park5@park.com", 1.5, 2);


    
INSERT INTO payment_methods(payment_method_card_name, payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES('Jorge Minhalma',4400440044004400,'2000-12-12',256,1);
INSERT INTO payment_methods(payment_method_card_name, payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES('Jorge',4400440044004400,'2000-12-12',256,2);
INSERT INTO payment_methods(payment_method_card_name, payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES('Jorge',4400440044004400,'2000-12-12',256,3);
INSERT INTO payment_methods(payment_method_card_name, payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES('Jorge',4400440044004400,'2000-12-12',256,4);




INSERT INTO vehicles(vehicle_model,vehicle_brand, vehicle_registration, vehicle_registration_date, vehicle_user_id, vehicle_category) VALUES('Opel','crosa','AA3212','2000-12-12',1,1);
INSERT INTO vehicles(vehicle_model,vehicle_brand, vehicle_registration, vehicle_registration_date, vehicle_user_id, vehicle_category) VALUES('Tesla','X','AA3212','2000-12-12',2,1);
INSERT INTO vehicles(vehicle_model,vehicle_brand, vehicle_registration, vehicle_registration_date, vehicle_user_id, vehicle_category) VALUES('Ferrari','458','AA3212','2000-12-12',3,1);


INSERT INTO reservations(reservation_date, reservation_duration, reservation_start_day, reservation_status, reservation_park_id, reservation_payment_method, reservation_vehicle, reservation_user_id) VALUES('2000-12-12','10:00:00','2000-12-13',4 , 1 , 1, 1, 1);





INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Jorge Minhalma" , "jorge@IADE.pt", "asd123", '2000-12-12',96969696,213456789,1);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Miguel Amaro" , "miguel@IADE.pt", "asd123",'2000-12-12' ,96969696,213456789,1);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("José Brandão" , "jose@IADE.pt", "asd123", '2000-12-12',96969696, 213456789,0);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Pedro Amaro" , "pedro@IADE.pt", "asd123", '2000-12-12',96969696,213456789,0);





