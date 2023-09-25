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
import AllSubjectsView from "./views/all-subject-view";
import StudentSchedule from "./views/schedule";
import SelectedSubjectsView from "./views/selected-subjects-view";
import SubjectSectionsView from "./views/subject-sections-view";
import SubjectPage from "./views/subject-view";
import UpdateSubjectView from "./admin/subject/update-subject";

//component
import Appbar from "./components/app-bar";
import DetailsCard from "./components/details-card";
import AccountMenu from "./components/account-menu";
import MenuIcon from "./components/menu";

//admin
import EditSubjectPage from "./admin/subject/edit-subject";
import ManageSubject from "./admin/subject/manage-subject";
import ViewUserTable from "./admin/view/view-userTable";
import { AddSubject } from "./admin/subject/add-Subjects";
import HomeAdmin from "./admin/view/home.admin";
import { DeteilUpdateSubject } from "./admin/subject/deteil-update-subject";


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
        <Route path="/details-subject/:id" element={<DetailSubject />} />
        <Route path="/select-subject/:id" element={<SelectSubject />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/schedule-me" element={<SheduleMe />} />
        <Route path="/home-member" element={<HomeMember />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<DetailAccount />} />
        <Route path="/all-subject-view" element={<AllSubjectsView />} />
        <Route path="/schedule" element={<StudentSchedule />} />
        <Route path="/selected-subjects-view" element={<SelectedSubjectsView />} />
        <Route path="/subject-sections-view/:subjectId" element={<SubjectSectionsView />} />
        <Route path="/subject-view/:id" element={<SubjectPage />} />
        <Route path="/update-subject/:subject_id" element={<UpdateSubjectView />} />

        //component
        <Route path="/details-card" element={<DetailsCard />} />
        <Route path="/account-menu" element={<AccountMenu />} />
        <Route path="/menu" element={<MenuIcon />} />

        //addmin
        <Route path="/edit-subject/:subject_id" element={<EditSubjectPage />} />
        <Route path="/manage-subject" element={<ManageSubject />} />
        <Route path="/home.admin" element={<HomeAdmin />} />
        <Route path="/viewUser" element={<ViewUserTable />} />
        <Route path="/add-Subjects" element={<AddSubject />} />
        <Route path="/deteil-update-subject" element={<DeteilUpdateSubject />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
