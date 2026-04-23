import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import TeachersDashboard from "./pages/TeachersDashboard";
import AllClassesPage from "./pages/AllClassesPage";
import AllTeachersPage from "./pages/AllTeachersPage";
import AllStudentsPage from "./pages/AllStudentsPage";
import AllSchoolMembersPage from "./pages/AllSchoolMembersPage";
import TeacherLayout from "./components/TeacherLayout";
import CreateClassPage from "./pages/CreateClassPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/teachersdashboard" element={<TeacherLayout />}>
          <Route index element={<TeachersDashboard />} />
          <Route path="classes" element={<AllClassesPage />} />
          <Route path="teachers" element={<AllTeachersPage />} />
          <Route path="students" element={<AllStudentsPage />} />
          <Route path="members" element={<AllSchoolMembersPage />} />
          <Route path="create-class" element={<CreateClassPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;