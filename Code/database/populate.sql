INSERT INTO vehicleCategories(category) VALUES("A");
INSERT INTO vehicleCategories(category) VALUES("A1");
INSERT INTO vehicleCategories(category) VALUES("B");
INSERT INTO vehicleCategories(category) VALUES("C");
INSERT INTO vehicleCategories(category) VALUES("D");


INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Jorge Minhalma" , "jorge@IADE.pt", "asd123", '2000-12-12',96969696,213456789,1);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Miguel Amaro" , "miguel@IADE.pt", "asd123",'2000-12-12' ,96969696,213456789,1);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("José Brandão" , "jose@IADE.pt", "asd123", '2000-12-12',96969696, 213456789,0);
INSERT INTO users (user_fullname, user_email, user_password, user_birthday, user_mobile, user_nif, user_moderador) VALUES ("Pedro Amaro" , "pedro@IADE.pt", "asd123", '2000-12-12',96969696,213456789,0);



INSERT INTO payment_methods(payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES(4400440044004400,'2000-12-12',256,1);
INSERT INTO payment_methods(payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES(4400440044004400,'2000-12-12',256,2);
INSERT INTO payment_methods(payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES(4400440044004400,'2000-12-12',256,3);
INSERT INTO payment_methods(payment_method_card_number,	payment_method_expiry_date ,payment_method_cvv,payment_method_user_id) VALUES(4400440044004400,'2000-12-12',256,4);

INSERT INTO parks(park_name, park_spots, park_latitude, park_longitude, park_hour_open, park_hour_close, park_contact, park_price_hour, park_create_user_id) VALUES ("Park1", 35, 38.7009012, -9.217223, "07:00:00", "23:00:00", 935649003, 3, 1);
INSERT INTO parks(park_name, park_spots, park_latitude, park_longitude, park_hour_open, park_hour_close, park_contact, park_price_hour, park_create_user_id) VALUES ("Park2", 55, 38.703566, -9.168966, "07:00:00", "23:00:00", 935981003, 2,1);
INSERT INTO parks(park_name, park_spots, park_latitude, park_longitude, park_hour_open, park_hour_close, park_contact, park_price_hour, park_create_user_id) VALUES ("Park3", 17, 38.744641, -9.199860, "07:00:00", "23:00:00", 935649408, 3.5, 2);
INSERT INTO parks(park_name, park_spots, park_latitude, park_longitude, park_hour_open, park_hour_close, park_contact, park_price_hour, park_create_user_id ) VALUES ("Park4", 25, 38.722098, -9.1212317, "07:00:00", "23:00:00", 934349003, 5, 2);
INSERT INTO parks(park_name, park_spots, park_latitude, park_longitude, park_hour_open, park_hour_close, park_contact, park_price_hour, park_create_user_id) VALUES ("Park5", 43, 38.4652694, -8.6760867, "07:00:00", "23:00:00", 939759003, 1.5, 2);

