-- CLASSES
INSERT INTO CLASSES (c_name) VALUES
('6th grade 1'),
('6th grade 2');

-- STUDENTS
INSERT INTO STUDENTS (s_name, s_id_number, c_id) VALUES
('Yael Cohen', '076547678', 1),
('Noa Levi', '263786765', 1),
('Chavi Cohen', '954565578', 1),
('Tali Levi', '346687333', 2),
('Hadas Cohen', '065542678', 2),
('Lea Levi', '963632890', 2);


-- TEACHERS
INSERT INTO TEACHERS (t_name, t_id_number, c_id) VALUES
('Tamar Cohen', '123456789', 1),
('Efrat Levi', '987654321', 2);

-- LOCATIONS
INSERT INTO LOCATIONS (longitude, latitude, at_time, s_id_number) VALUES
(34.7750, 32.0875, '2024-12-05T15:30:00Z', '076547678'),
(34.7760, 32.0882, '2024-12-05T15:31:00Z', '263786765'),
(34.7742, 32.0868, '2024-12-05T15:32:00Z', '954565578'),
(34.7770, 32.0895, '2024-12-05T15:33:00Z', '346687333'),
(34.7735, 32.0859, '2024-12-05T15:34:00Z', '065542678'),
(34.7782, 32.0903, '2024-12-05T15:35:00Z', '963632890');