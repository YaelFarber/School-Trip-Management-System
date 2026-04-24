import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await login(id);
      setMessage(data.message);
      navigate("/teachersdashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSignin() {
    navigate("/signin");
  }

  return (
    <div className="page-center">
      <button type="button" onClick={() => navigate("/")} className="btn btn-secondary" style={{ left: 10, top: 10, position: "absolute" }}>
         Home
      </button>

      <form onSubmit={handleSubmit} className="card form-card">
        <h2 className="page-title">Teacher Login</h2>

        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter 9 digit ID"
          maxLength={9}
          required
          className="input"
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <button
          type="button"
          id="signin"
          onClick={handleSignin}
          className="btn btn-secondary"
        >
          Sign In
        </button>

        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-error">{error}</p>}
      </form>
    </div>
  );
}