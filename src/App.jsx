import React from "react"
import AppointMents from "./components/Appointments"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DoctorsList from "./components/DoctorsList"
import BookingForm from "./components/BookingForm"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AppointMents />} />
        <Route path="/:path" element={<DoctorsList />} />
        <Route path="/:path/booking/:doctorId" element={<BookingForm />} />
      </Route>
    </Routes>
  )
}

export default App