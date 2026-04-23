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
    <PageTable
      title="All Classes"
      error={error}
      columns={["Class ID", "Class Name"]}
      rows={classes.map((c) => [c.c_id, c.class_name])}
      emptyText="No classes found."
    />
  );
}

function PageTable({ title, error, columns, rows, emptyText }) {
  return (
    <div className="page page-md">
      <h1 className="page-title">{title}</h1>
      {error && <p className="text-error">{error}</p>}

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && !error && <p>{emptyText}</p>}
      </div>
    </div>
  );
}