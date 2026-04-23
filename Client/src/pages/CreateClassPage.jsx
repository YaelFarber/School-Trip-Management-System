import { useState } from "react";
import { createClass } from "../services/api";

export default function CreateClassPage() {
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await createClass({ class_name: className });
      setMessage(`Class created successfully: ${data.class.name}`);
      setClassName("");
    } catch (err) {
      setError(err.message || "Failed to create class.");
    }
  }

  return (
    <div className="page page-sm">
      <h1 className="page-title">Create Class</h1>

      <form onSubmit={handleSubmit} className="card section-card">
        <input
          type="text"
          placeholder="Enter class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
          className="input"
        />

        <button type="submit" className="btn btn-primary">
          Create Class
        </button>

        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-error">{error}</p>}
      </form>
    </div>
  );
}