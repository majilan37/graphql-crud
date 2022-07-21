import { Routes, Route } from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import Home from "./pages/Home";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
