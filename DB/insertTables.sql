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