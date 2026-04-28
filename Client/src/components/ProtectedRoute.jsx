import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const teacher = JSON.parse(sessionStorage.getItem("teacher"));

  if (!teacher || !teacher.teacher_id_number) {
    return <Navigate to="/login" replace />;
  }

  return children;
}