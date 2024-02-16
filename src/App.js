import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmpListing from "./components/EmpListing";
import EmpCreate from "./components/EmpCreate";
import EmpEdit from "./components/EmpEdit";
import EmpDetail from "./components/EmpDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <h1 className="app-h1">React Js Crud With Json Server</h1>
      <Router>
        <Routes>
          <Route path={"/"} element={<EmpListing />} />
          <Route path="/employee/create" element={<EmpCreate />} />
          <Route path="/employee/detail/:empId" element={<EmpDetail />} />
          <Route path="/employee/edit/:empId" element={<EmpEdit />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
