-- get student by id num
PREPARE get_student(CHAR) AS
SELECT *
FROM STUDENTS
WHERE s_id_number = $1;

EXECUTE get_student('076547678');


-- get teacher by id num
PREPARE get_teacher(CHAR) AS
SELECT *
FROM TEACHERS
WHERE t_id_number = $1;

EXECUTE get_teacher('123456789');

-- get all students
CREATE VIEW all_students AS
SELECT 
  s.s_id AS student_id,
  s.s_name AS student_name,
  c.c_name AS class_name
FROM STUDENTS s
JOIN CLASSES c ON s.c_id = c.c_id;

-- get all teachers
CREATE VIEW all_teachers AS
SELECT 
   t.t_id AS teacher_id,
   t.t_name AS teacher_name,
   c.c_name AS class_name
FROM TEACHERS t
JOIN CLASSES c ON t.c_id = c.c_id;

-- get all students and teachers
CREATE VIEW all_students_and_teachers AS
SELECT t_name AS full_name,
       t_id_number AS id_number, 
	   c_name AS class_name,
	   'Teacher' AS type
FROM TEACHERS t
JOIN CLASSES c ON t.c_id = c.c_id

UNION

SELECT s_name, s_id_number, c_name, 'Student' AS type
FROM STUDENTS s
JOIN CLASSES c ON s.c_id = c.c_id;


-- get all classes
CREATE VIEW all_classes AS
SELECT c_id, c_name AS class_name
FROM CLASSES;


-- get students of teacher
PREPARE get_students_of_teacher(CHAR) AS
SELECT 
  s.s_id,
  s.s_name,
  s.s_id_number,
  c.c_name AS class_name
FROM STUDENTS s
JOIN CLASSES c ON s.c_id = c.c_id
JOIN TEACHERS t ON t.c_id = c.c_id
WHERE t.t_id_number = $1;

EXECUTE get_students_of_teacher('123456789');

-- get class id
PREPARE get_class_id(CHAR) AS
SELECT c_id, c_name AS class_name
FROM CLASSES
WHERE c_name = $1;

EXECUTE get_class_id('6th grade 1');


-- get all student locations
CREATE VIEW all_student_locations AS
SELECT
  l.l_id AS location_id,
  s.s_id AS student_id,
  s.s_name AS student_name,
  s.s_id_number,
  c.c_name AS class_name,
  l.longitude,
  l.latitude,
  l.at_time
FROM LOCATIONS l
JOIN STUDENTS s ON l.s_id_number = s.s_id_number
JOIN CLASSES c ON s.c_id = c.c_id;

-- get latest location of each student
CREATE VIEW latest_student_locations AS
SELECT DISTINCT ON (s.s_id_number)
  s.s_id AS student_id,
  s.s_name AS student_name,
  s.s_id_number,
  c.c_name AS class_name,
  l.longitude,
  l.latitude,
  l.at_time
FROM STUDENTS s
JOIN CLASSES c ON s.c_id = c.c_id
JOIN LOCATIONS l ON l.s_id_number = s.s_id_number
ORDER BY s.s_id_number, l.at_time DESC;

SELECT *
FROM latest_student_locations;

-- get latest locations of students of teacher
PREPARE get_latest_locations_of_my_students(CHAR) AS
SELECT DISTINCT ON (s.s_id_number)
  s.s_id AS student_id,
  s.s_name AS student_name,
  c.c_name AS class_name,
  l.longitude,
  l.latitude,
  l.at_time
FROM STUDENTS s
JOIN CLASSES c ON s.c_id = c.c_id
JOIN TEACHERS t ON t.c_id = c.c_id
JOIN LOCATIONS l ON l.s_id_number = s.s_id_number
WHERE t.t_id_number = $1
ORDER BY s.s_id_number, l.at_time DESC;

EXECUTE get_latest_locations_of_my_students('123456789');