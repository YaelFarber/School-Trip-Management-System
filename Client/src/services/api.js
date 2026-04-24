const URL = 'http://127.0.0.1:8000';

async function handleResponse(response, msg) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || msg);
    }

    return data;
}

// home
export async function home() {
    const response = await fetch(`${URL}/`);
    return handleResponse(response, 'Home page retrieval failed');
}

// login
export async function login(teacher_id) {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ id_number: teacher_id })
    });

    const res = await handleResponse(response, 'Login failed');
    sessionStorage.setItem("teacher", JSON.stringify(res));
    return res;
}

// sign in for teachers
export async function createTeacher(teacher_data) {
    const response = await fetch(`${URL}/teacher`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(teacher_data)
    });

    return handleResponse(response, 'Teacher creation failed');
}

// sign in for students
export async function createStudent(student_data) {
    const response = await fetch(`${URL}/student`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(student_data)
    });

    return handleResponse(response, 'Student creation failed');
}

// create new class
export async function createClass(class_data) {
    const response = await fetch(`${URL}/class`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(class_data)
    });

    return handleResponse(response, 'Class creation failed');
}


// get students of a specific teacher
export async function getStudentsByTeacher(teacher_id) {
    const response = await fetch(`${URL}/teachers/${teacher_id}/students`);

    return handleResponse(response, "Teacher's students retrieval failed");
}

// get a specific student
export async function getStudent(student_id) {
    const response = await fetch(`${URL}/students/${student_id}`);

    return handleResponse(response, "Student not found");
}

// get a specific teacher
export async function getTeacher(teacher_id) {
    const response = await fetch(`${URL}/teachers/${teacher_id}`);

    return handleResponse(response, "Teacher not found");
}

// get all students
export async function getAllStudents() {
    const response = await fetch(`${URL}/students`);

    return handleResponse(response, "Students retrieval failed");
}

// get all teachers
export async function getAllTeachers() {
    const response = await fetch(`${URL}/teachers`);

    return handleResponse(response, "Teachers retrieval failed");
}

// get all students and teachers
export async function getAllStudentsAndTeachers() {
    const response = await fetch(`${URL}/students_and_teachers`);

    return handleResponse(response, "Teachers and students retrieval failed");
}

// get all classes
export async function getAllClasses() {
    const response = await fetch(`${URL}/classes`);

    return handleResponse(response, "Classes retrieval failed");
}

