import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import './App.css';
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { ChangeProfile } from "./pages/ChangeProfile";
import { PrivateRoutes } from "./services/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='change_profile' element={<ChangeProfile />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace/>}/>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot_password' element={<ForgotPassword />} />
          <Route path='reset_password/:token' element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App
