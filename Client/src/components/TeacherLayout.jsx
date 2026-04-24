import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function TeacherLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("teacher");
    navigate("/");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">School Trip System</div>

        <nav className="nav">
          <NavLink
            to="/teachersdashboard"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Students
          </NavLink>

          <NavLink
            to="/teachersdashboard/classes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            All Classes
          </NavLink>

          <NavLink
            to="/teachersdashboard/teachers"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            All Teachers
          </NavLink>

          <NavLink
            to="/teachersdashboard/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            All Students
          </NavLink>

          <NavLink
            to="/teachersdashboard/members"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            All School Members
          </NavLink>

          <NavLink
            to="/teachersdashboard/create-class"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Create Class
          </NavLink>

          <button
            onClick={handleLogout}
            className="btn btn-danger nav-spacer"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}