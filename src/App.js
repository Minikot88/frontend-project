import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Appbar from "./components/app-bar";

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

//component
import TableAll from "./components/table-all";
import DetailsCard from "./components/details-card";

//admin
import AddSubjectPage from "./admin/add-subject";
import EditSubjectPage from "./admin/edit-subject";
import ManageSubject from "./admin/manage-subject";
import HomeAdmin from "./admin/home.admin";

function App() {
  return (
    <BrowserRouter>
      <Routes  >
        //view
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search-all" element={<SearchAll />} />
        <Route path="/search-select" element={<SearchSelect />} />
        <Route path="/details-subject" element={<DetailSubject />} />
        <Route path="/select-subject" element={<SelectSubject />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/schedule-me" element={<SheduleMe />} />
        <Route path="/home-member" element={<HomeMember />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />

        //component
        <Route path="/table-all" element={<TableAll />} />
        <Route path="/details-card" element={<DetailsCard />} />

        //addmin
        <Route path="/add-subject" element={<AddSubjectPage />} />
        <Route path="/edit-subject/:subject_id" element={<EditSubjectPage />} />
        <Route path="/manage-subject" element={<ManageSubject />} />
        <Route path="/home.admin" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
