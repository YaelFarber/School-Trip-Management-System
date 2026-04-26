import { useEffect, useState } from "react";
import { getAllStudents, getStudent } from "../services/api";

export default function AllStudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setError("");
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students.");
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchId.trim()) {
      loadStudents();
      return;
    }

    try {
      setError("");
      const student = await getStudent(searchId);
      setStudents([student]);
    } catch (err) {
      setError(err.message || "Student not found.");
      setStudents([]);
    }
  }

  function handleClear() {
    setSearchId("");
    setError("");
    loadStudents();
  }

  return (
    <div className="page page-md">
      <h1 className="page-title">All Students</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search student by ID number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input search-input"
        />

        <button type="submit" className="btn btn-primary">
          Search
        </button>

        <button type="button" className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </form>

      {error && <p className="text-error">{error}</p>}

      <div className="table-card">
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

        {students.length === 0 && !error && <p>No students found.</p>}
      </div>
    </div>
  );
}