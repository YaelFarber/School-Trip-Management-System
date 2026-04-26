import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeacher, createStudent, getAllClasses } from "../services/api";

export default function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    class_id: "",
    type: "student",
  });

  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      setLoadingClasses(true);
      setError("");
      const data = await getAllClasses();
      setClasses(data);
    } catch (err) {
      setError(err.message || "Failed to load classes.");
    } finally {
      setLoadingClasses(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const newValue = name === "id"
      ? value.replace(/\D/g, "")
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      let result;

      if (formData.type === "student") {
        result = await createStudent({
          student_name: formData.name,
          student_id_number: formData.id,
          class_id: Number(formData.class_id),
        });
      } else {
        result = await createTeacher({
          teacher_name: formData.name,
          teacher_id_number: formData.id,
          class_id: Number(formData.class_id),
        });
      }

      console.log(result);
      setMessage("User created successfully!");

      setFormData({
        name: "",
        id: "",
        class_id: "",
        type: "student",
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create account");
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="page-center">
      <button type="button" onClick={() => navigate("/")} className="btn btn-secondary" style={{ left: 10, top: 10, position: "absolute" }}>
         Home
      </button>
      
      <form onSubmit={handleSubmit} className="card form-card">
        <h2 className="page-title">Sign In</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="text"
          name="id"
          placeholder="9 digit ID"
          value={formData.id}
          onChange={handleChange}
          maxLength={9}
          pattern="\d{9}"
          required
          className="input"
        />

        <select
          name="class_id"
          value={formData.class_id}
          onChange={handleChange}
          required
          disabled={loadingClasses}
          className="select"
        >
          <option value="">
            {loadingClasses ? "Loading classes..." : "Select Class"}
          </option>

          {classes.map((cls) => (
            <option key={cls.c_id} value={cls.c_id}>
              {cls.class_name}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="select"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>

        <button type="button" onClick={handleLogin} className="btn btn-secondary">
          Login
        </button>

        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-error">{error}</p>}
      </form>
    </div>
  );
}