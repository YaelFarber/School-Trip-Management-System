import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleSignin() {
    navigate("/signin");
  }

  return (
    <div className="page-center">
      <h1 className="page-title">School Trip Management System</h1>

      <div className="home-actions">
        <button id="login" onClick={handleLogin} className="btn btn-primary">
          Login
        </button>

        <button id="signin" onClick={handleSignin} className="btn btn-secondary">
          Sign In
        </button>
      </div>
    </div>
  );
}