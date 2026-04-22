-- CLASSES
INSERT INTO CLASSES (c_id, c_name) VALUES
(1, '6th grade 1'),
(2, '6th grade 2');

-- STUDENTS
INSERT INTO STUDENTS (s_id, s_name, s_id_number, c_id) VALUES
(1, 'Yael Cohen', '076547678', 1),
(2, 'Noa Levi', '263786765', 1),
(3, 'Chavi Cohen', '954565578', 1),
(4, 'Tali Levi', '346687333', 2),
(5, 'Hadas Cohen', '065542678', 2),
(6, 'Lea Levi', '963632890', 2);


-- TEACHERS
INSERT INTO TEACHERS (t_id, t_name, t_id_number, c_id) VALUES
(1, 'Tamar Cohen', '123456789', 1),
(2, 'Efrat Levi', '987654321', 2);
