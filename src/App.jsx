import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExampleMail from "./pages/GraphServiceExamples/mailuser";
import ProfileUser from "./pages/profileUser";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/graphExamples" element={<ExampleMail />} />
          <Route path="/profileUser" element={<ProfileUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
