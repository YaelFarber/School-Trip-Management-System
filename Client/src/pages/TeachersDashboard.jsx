import { useEffect, useState } from "react";
import { getStudentsByTeacher } from "../services/api";

export default function TeachersDashboard() {
  const [students, setStudents] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    setError("");

    try {
      const teacher = JSON.parse(localStorage.getItem("teacher"));

      if (!teacher || !teacher.teacher_id_number) {
        setError("No logged in teacher found.");
        setLoading(false);
        return;
      }

      setTeacherId(teacher.teacher_id_number);
      const data = await getStudentsByTeacher(teacher.teacher_id_number);
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-lg">
      <h1 className="page-title">My Students</h1>
      <p className="page-subtitle">Teacher ID: {teacherId || "-"}</p>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-error">{error}</p>}

      {!loading && !error && (
        <div className="table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>ID Number</th>
                <th>Class ID</th>
                <th>Class Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.student_name}</td>
                  <td>{student.student_id_number}</td>
                  <td>{student.class_id}</td>
                  <td>{student.class_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && <p>No students found.</p>}
        </div>
      )}
    </div>
  );
}