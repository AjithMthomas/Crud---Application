import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard"
import AddUser from "./Pages/AddUser";
import UpdateUser from "./Pages/UpdateUser";
import UserProfile from "./Pages/UserProfile";
import CreateCard from "./Pages/CreateCard";

import "./App.css";
import SignupPage from "./Pages/SignupPage";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<HomePage />} />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<Dashboard/>} path="/dashboard" />
            <Route element={<AddUser/>} path="/adduser" />
            <Route element={<UpdateUser/>} path="/updateUser/:user_id" />
            <Route element={<UserProfile/>} path="/userProfile" />
            <Route element={<CreateCard/>} path="/CreateCard" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
