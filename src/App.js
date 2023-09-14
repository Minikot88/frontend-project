import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//view
import SignUp from "./views/signup";
import Home from "./views/home-page";
import SearchAll from "./views/search-all";
import SearchSelect from "./views/search-select";
import DetailSubject from "./views/details-subject";
import SelectSubject from "./views/select-subject";
import CreateTable from "./views/create-table";
import SheduleMe from "./views/schedule-me";
import ForgotPassword from "./views/forgot-password";
import HomeMember from "./views/home-member";
import Login from "./views/login";
import DetailAccount from "./views/account";

//component
import Appbar from "./components/app-bar";
import DetailsCard from "./components/details-card";
import AccountMenu from "./components/account-menu";

//admin
import AddSubjectPage from "./admin/subject/add-subject";
import EditSubjectPage from "./admin/subject/edit-subject";
import ManageSubject from "./admin/subject/manage-subject";
import HomeAdmin from "./admin/home.admin";
import ViewUserPage from "./admin/accountUser/viewUsers";

import axios from "axios";

function App() {
  const setAxiosHeader = async () => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    console.log(token)
  }

  useEffect(() => {
    setAxiosHeader()
  }, [])
  return (
    <BrowserRouter>
      <Appbar></Appbar>
      <Routes  >
        //view
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search-all" element={<SearchAll />} />
        <Route path="/search-select" element={<SearchSelect />} />
        <Route path="/details-subject" element={<DetailSubject />} />
        <Route path="/select-subject/:id" element={<SelectSubject />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/schedule-me" element={<SheduleMe />} />
        <Route path="/home-member" element={<HomeMember />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<DetailAccount />} />

        //component
        <Route path="/details-card" element={<DetailsCard />} />
        <Route path="/account-menu" element={<AccountMenu />} />

        //addmin
        <Route path="/add-subject" element={<AddSubjectPage />} />
        <Route path="/edit-subject/:subject_id" element={<EditSubjectPage />} />
        <Route path="/manage-subject" element={<ManageSubject />} />
        <Route path="/home.admin" element={<HomeAdmin />} />
        <Route path="/viewUser" element={<ViewUserPage />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
