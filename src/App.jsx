import { useState } from 'react'

import { Navigate, Routes, Route, BrowserRouter } from "react-router";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Onboarding from './pages/Onboarding';
import Signupclient from "./pages/Signupclient";
import Loginclient from "./pages/Loginclient";
import Clientonbording from "./pages/Clientonboarding";
import FreeDashboard from "./pages/Freelauncerdashboard";
import Clientdashboard from './pages/Clientdashboard';
import RoleSelection from './pages/RoleSelection';
import ClientReview from './pages/ClientReview';
import FreelancerReview from './pages/FreelancerReview';
// import Loginclient from "./pages/Loginclient";

let authenticated = true;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  return (
    <BrowserRouter basename="/smartFreelancingSite">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/freelancerDashboard" /> : <RoleSelection />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/loginclient" element={<Loginclient setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signupclient" element={<Signupclient setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/onboarding" element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" replace />} />
        <Route path="/clientonbording" element={isAuthenticated ? <Clientonbording /> : <Navigate to="/loginclient" replace />} />

        <Route path="/freelancerreview" element={isAuthenticated ? <FreelancerReview /> : <Navigate to="/login" replace />} />
        <Route path="/clientreview" element={isAuthenticated ? <ClientReview /> : <Navigate to="/loginclient" replace />} />

        <Route path="/freelancerDashboard" element={isAuthenticated ? <FreeDashboard /> : <Navigate to="/login" replace />} />
        <Route path="/clientdashboard" element={isAuthenticated ? <Clientdashboard /> : <Navigate to="/loginclient" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

