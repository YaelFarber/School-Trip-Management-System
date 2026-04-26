import { useEffect, useState } from "react";
import { getStudentsByTeacher, getTeacherStudentLocationsWithDistance, } from "../services/api";
import MapComponent from "../components/MapComponent";

export default function TeachersDashboard() {
  const [students, setStudents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError("");

    try {
      const teacher = JSON.parse(sessionStorage.getItem("teacher"));

      if (!teacher || !teacher.teacher_id_number) {
        setError("No logged in teacher found.");
        return;
      }

      setTeacherInfo(teacher);

      const studentsData = await getStudentsByTeacher(teacher.teacher_id_number);
      const locationsData = await getTeacherStudentLocationsWithDistance(teacher.teacher_id_number);

      setStudents(studentsData);
      setLocations(locationsData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-lg">
      <h1 className="page-title">My Students</h1>

      <p className="page-subtitle">
        Welcome {teacherInfo?.teacher_name || "-"}!
        <br />
        <br />
        ID: {teacherInfo?.teacher_id_number || "-"}
      </p>

      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="table-card">
            <h2>Students</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>ID Number</th>
                  <th>Class Name</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_name}</td>
                    <td>{student.student_id_number}</td>

                    <td>{student.class_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {students.length === 0 && <p>No students found.</p>}
          </div>
          <div className="table-card">
            <h2>Student Locations</h2>
            <MapComponent locations={locations} />
            {locations.length === 0 && <p>No locations found.</p>}
          </div>
        </>
      )}
    </div>
  );
}