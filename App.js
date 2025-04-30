import React from 'react';
import Home from './components/Home'; // Add this line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Common/PrivateRoute'; // Import PrivateRoute
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ViewUsers from './components/Admin/ViewUsers';
import ManageServices from './components/Admin/ManageServices';
import CreateService from './components/Admin/CreateService';
import AdminProfile from './components/Admin/AdminProfile';
import StaffLogin from './components/Staff/StaffLogin';
import StaffDashboard from './components/Staff/StaffDashboard';
import ViewApplications from './components/Staff/ViewApplications';
import UserDashboard from './components/User/UserDashboard';
import SearchServices from './components/User/SearchServices';
import MyApplications from './components/User/MyApplications';
import UserProfile from './components/User/UserProfile';
import StaffProfile from './components/Staff/StaffProfile';
import AgriculturalSupport from './components/Staff/AgriculturalSupport';
import CommunityDevelopment from './components/Staff/CommunityDevelopment';
import ViewServices from './components/Staff/ViewServices';

export default function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} /> // Home page
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<CreateService />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/user/my-applications" element={<MyApplications />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/admin/users" element={<ViewUsers />} />
          <Route path="/admin/update_services" element={<ManageServices />} />
          <Route path="/user/search-services" element={<SearchServices />} />
          <Route path="/staff/view-applications" element={<ViewApplications />} />
          <Route path="/staff/viewservices" element={<ViewServices />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/staff/agricultural-support" element={<AgriculturalSupport />} />
          <Route path="/staff/community-development" element={<CommunityDevelopment />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

<Route path="/staff/dashboard" element={<PrivateRoute element={<StaffDashboard />} requiredRole="staff" />} />
<Route path="/user/dashboard" element={<PrivateRoute element={<UserDashboard />} requiredRole="user" />} />

        </Routes>
        
      </Router>
    </AuthProvider>
  );
}
