from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database settings
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")


def get_connection():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )


# ------------------------------------------------------

# Pydantic models

class StudentCreate(BaseModel):
    student_name: str
    student_id_number: constr(pattern=r'^\d{9}$')
    class_id: int


class TeacherCreate(BaseModel):
    teacher_name: str
    teacher_id_number: constr(pattern=r'^\d{9}$')
    class_id: int


class ClassCreate(BaseModel):
    class_name: str


class LoginRequest(BaseModel):
    id_number: constr(pattern=r'^\d{9}$')


# ------------------------------------------------------

# Home
@app.get("/")
def home():
    return {"message": "School Trip Management System API is running"}


# Login
@app.post("/login")
def login(request: LoginRequest):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT 1
            FROM teachers
            WHERE t_id_number = %s
            """,
            (request.id_number,)
        )

        teacher_row = cur.fetchone()
        if not teacher_row:
            raise HTTPException(status_code=401, detail="Only teachers are allowed to login")

        return {
            "message": "Login successful",
            "teacher_id_number": request.id_number
        }

    except HTTPException:
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# ------------------------------------------------------

# Students

# create new student
@app.post("/student")
def create_student(student: StudentCreate):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT c_id, c_name
            FROM classes
            WHERE c_id = %s
            """,
            (student.class_id,)
        )

        class_row = cur.fetchone()
        if not class_row:
            raise HTTPException(status_code=400, detail="Class does not exist")

        cur.execute(
            """
            INSERT INTO students (s_name, s_id_number, c_id)
            VALUES (%s, %s, %s)
            RETURNING s_id, s_name, s_id_number, c_id;
            """,
            (student.student_name, student.student_id_number, student.class_id)
        )

        new_student = cur.fetchone()
        conn.commit()
        return new_student

    except HTTPException:
        if conn:
            conn.rollback()
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# get all students
@app.get("/students")
def get_students():
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                s.s_id AS student_id,
                s.s_name AS student_name,
                s.s_id_number AS student_id_number,
                c.c_id AS class_id,
                c.c_name AS class_name
            FROM students s
            JOIN classes c ON s.c_id = c.c_id;
            """
        )

        return cur.fetchall()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# get student by id
@app.get("/students/{student_id}")
def get_student(student_id: str):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                s.s_id AS student_id,
                s.s_name AS student_name,
                s.s_id_number AS student_id_number,
                c.c_id AS class_id,
                c.c_name AS class_name
            FROM students s
            JOIN classes c ON s.c_id = c.c_id
            WHERE s.s_id_number = %s;
            """,
            (student_id,)
        )

        student = cur.fetchone()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        return student

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# ------------------------------------------------------

# Classes

# create new class
@app.post("/class")
def create_class(class_data: ClassCreate):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            INSERT INTO classes (c_name)
            VALUES (%s)
            RETURNING c_id, c_name;
            """,
            (class_data.class_name,)
        )

        new_class = cur.fetchone()
        conn.commit()

        return {
            "message": "Class created",
            "class": {
                "id": new_class["c_id"],
                "name": new_class["c_name"]
            }
        }

    except HTTPException:
        if conn:
            conn.rollback()
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# get all classes
@app.get("/classes")
def get_classes():
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT c_id, c_name AS class_name
            FROM classes
            ORDER BY c_id;
            """
        )

        return cur.fetchall()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# ------------------------------------------------------

# Teachers

# create new teacher
@app.post("/teacher")
def create_teacher(teacher: TeacherCreate):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # Check if class exists
        cur.execute(
            """
            SELECT c_id, c_name
            FROM classes
            WHERE c_id = %s
            """,
            (teacher.class_id,)
        )
        class_row = cur.fetchone()

        if not class_row:
            raise HTTPException(status_code=400, detail="Class does not exist")
        
        # Check if class already has a teacher
        cur.execute(
            """
            SELECT t_id, t_name, t_id_number
            FROM teachers
            WHERE c_id = %s
            """,
            (teacher.class_id,)
        )
        existing_teacher = cur.fetchone()

        if existing_teacher:
            raise HTTPException(
                status_code=400,
                detail="This class already has a teacher"
            )

        cur.execute(
            """
            INSERT INTO teachers (t_name, t_id_number, c_id)
            VALUES (%s, %s, %s)
            RETURNING t_id, t_name, t_id_number, c_id;
            """,
            (teacher.teacher_name, teacher.teacher_id_number, teacher.class_id)
        )

        new_teacher = cur.fetchone()
        conn.commit()
        return new_teacher

    except HTTPException:
        if conn:
            conn.rollback()
        raise
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()



# get all teachers
@app.get("/teachers")
def get_teachers():
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                t.t_id AS teacher_id,
                t.t_name AS teacher_name,
                t.t_id_number AS teacher_id_number,
                c.c_id AS class_id,
                c.c_name AS class_name
            FROM teachers t
            JOIN classes c ON t.c_id = c.c_id;
            """
        )

        return cur.fetchall()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# get teacher by id
@app.get("/teachers/{teacher_id}")
def get_teacher(teacher_id: str):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                t.t_id AS teacher_id,
                t.t_name AS teacher_name,
                t.t_id_number AS teacher_id_number,
                c.c_id AS class_id,
                c.c_name AS class_name
            FROM teachers t
            JOIN classes c ON t.c_id = c.c_id
            WHERE t.t_id_number = %s;
            """,
            (teacher_id,)
        )

        teacher = cur.fetchone()
        if not teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")

        return teacher

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# ------------------------------------------------------

# get all school members
@app.get("/students_and_teachers")
def get_students_and_teachers():
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                t.t_name AS full_name,
                t.t_id_number AS id_number,
                c.c_name AS class_name,
                'Teacher' AS type
            FROM teachers t
            JOIN classes c ON t.c_id = c.c_id

            UNION

            SELECT
                s.s_name AS full_name,
                s.s_id_number AS id_number,
                c.c_name AS class_name,
                'Student' AS type
            FROM students s
            JOIN classes c ON s.c_id = c.c_id;
            """
        )

        return cur.fetchall()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# get all students of one teacher by teacher id
@app.get("/teachers/{teacher_id}/students")
def get_students_of_teacher(teacher_id: str):
    conn = None
    cur = None

    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(
            """
            SELECT
                s.s_id AS student_id,
                s.s_name AS student_name,
                s.s_id_number AS student_id_number,
                c.c_id AS class_id,
                c.c_name AS class_name
            FROM students s
            JOIN classes c ON s.c_id = c.c_id
            JOIN teachers t ON t.c_id = c.c_id
            WHERE t.t_id_number = %s;
            """,
            (teacher_id,)
        )

        students = cur.fetchall()
        if not students:
            raise HTTPException(status_code=404, detail="No students assigned to this teacher")

        return students

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()