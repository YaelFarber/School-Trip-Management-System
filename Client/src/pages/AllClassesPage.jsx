import { useEffect, useState } from "react";
import { getAllClasses } from "../services/api";

export default function AllClassesPage() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      setError("");
      const data = await getAllClasses();
      setClasses(data);
    } catch (err) {
      setError(err.message || "Failed to load classes.");
    }
  }

  return (
    <div className="page page-md">
      <h1 className="page-title">All Classes</h1>

      {error && <p className="text-error">{error}</p>}

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
            </tr>
          </thead>  

          <tbody>
            {classes.map((c) => (
              <tr key={c.c_id}>
                <td>{c.c_id}</td>
                <td>{c.class_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {classes.length === 0 && !error && <p>No classes found.</p>}
      </div>
    </div>
  );
}