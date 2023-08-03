import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//view
import SignUp from "./view/signup";
import SignIn from "./view/signin";
import Home from "./view/home-page";
import SearchAll from "./view/search-all";
import SearchSelect from "./view/search-select";
import DetailSubject from "./view/details-subject";
import SelectSubject from "./view/select-subject";
import CreateTable from "./view/create-table";
import SheduleMe from "./view/schedule-me";
import ForgotPassword from "./view/forgot-password";
import HomeMember from "./view/home-member";

//component
import TableAll from "./component/table-all";
import TableSubject from "./component/table-subject";
import DetailsCard from "./component/details-card";

//admin
import AddSubjectPage from "./admin/add-subject";
import EditSubjectPage from "./admin/edit-subject";
import ManageSubject from "./admin/manage-subject";
import DetailSubjectAdmin from "./admin/detail-subjectadmin";
import HomeAdmin from "./admin/home.admin";

function App() {
  return (
    <BrowserRouter>
      <Routes  >
        //view
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search-all" element={<SearchAll />} />
        <Route path="/search-select" element={<SearchSelect />} />
        <Route path="/details-subject" element={<DetailSubject />} />
        <Route path="/select-subject" element={<SelectSubject />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/schedule-me" element={<SheduleMe />} />
        <Route path="/home-member" element={<HomeMember />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        //component
        <Route path="/table-all" element={<TableAll />} />
        <Route path="/table-subject" element={<TableSubject />} />
        <Route path="/details-card" element={<DetailsCard />} />

        //addmin
        <Route path="/add-subject" element={<AddSubjectPage />} />
        <Route path="/edit-subject" element={<EditSubjectPage />} />
        <Route path="/manage-subject" element={<ManageSubject />} />
        <Route path="/detail-subjectadmin" element={<DetailSubjectAdmin />} />
        <Route path="/home.admin" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;