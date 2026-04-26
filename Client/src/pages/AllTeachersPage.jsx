import { useEffect, useState } from "react";
import { getAllTeachers, getTeacher } from "../services/api";

export default function AllTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      setError("");
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err.message || "Failed to load teachers.");
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchId.trim()) {
      loadTeachers();
      return;
    }

    try {
      setError("");
      const teacher = await getTeacher(searchId);
      setTeachers([teacher]);
    } catch (err) {
      setError(err.message || "Teacher not found.");
      setTeachers([]);
    }
  }

  function handleClear() {
    setSearchId("");
    setError("");
    loadTeachers();
  }

  return (
    <div className="page page-md">
      <h1 className="page-title">All Teachers</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search teacher by ID number"
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
              <th>Teacher Name</th>
              <th>ID Number</th>
              <th>Class Name</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td>{teacher.teacher_name}</td>
                <td>{teacher.teacher_id_number}</td>
                <td>{teacher.class_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && !error && <p>No teachers found.</p>}
      </div>
    </div>
  );
}