import React, { useEffect, useState } from "react";
import Popup from "./generals/Popup";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoaderComponent from "./generals/LoaderComponent";

const unameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10}$/;

const BookingForm = () => {
  const { path, doctorId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [selectedTime, setSelectedTime] = useState('');

  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0);

    while (startTime.getHours() < 17) {
      const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30 + 10); // Move to the next slot with a 10-minute gap
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/repo-by-anish/fake_server/${path}/${doctorId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [path, doctorId]);

  if (loading) {
    return <LoaderComponent/>
  }

  const validateForm = () => {
    const errors = {};

    if (!name.trim() || !unameRegex.test(name)) {
      errors.name = "Please Enter a Valid Username. It should not contain Numbers or Special Characters.";
    }

    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = "Please Enter a Valid Email Id. eg: john@example.com";
    }

    if (!mobile.trim() || !mobileRegex.test(mobile)) {
      errors.mobile = "Please Enter your 10-digit Mobile Number. eg: 1234567890";
    }

    return errors;
  };

  const clearError = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const register = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setOpenPopup(true);
      setEmail("");
      setMobile("");
      setName("");
    }
  };

  return (
    <div className="container">
      <div className="booking_form">
        <h1>Booking Page</h1>
        <div className="doctor_details">
          <div className="dd_upper">
            <div>
              <h3 className="dd_heading">Doctor</h3>
              <span className="d_name">{doctor.name}</span>
              <p className="d_fee">₹ {doctor.fee}</p>
            </div>
            <img className="dd_image" src={`../../${doctor.image}`} alt="doctor" />
          </div>
          <div className="address">
            <h4>{doctor.address}</h4>
            <span className="dot"></span>
            <p>{doctor.clinic_name}</p>
          </div>
        </div>
        <form>
          <label htmlFor="inp_name">Name</label>
          <input
            autoComplete="off"
            type="text"
            id="inp_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => clearError("name")}
          />
          <p className={errors.name ? "error" : "offScrn"}>{errors.name}</p>

          <label htmlFor="inp_email">Email Id</label>
          <input
            autoComplete="off"
            type="text"
            id="inp_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => clearError("email")}
          />
          <p className={errors.email ? "error" : "offScrn"}>{errors.email}</p>

          <label htmlFor="inp_mobile">Mobile No</label>
          <input
            autoComplete="off"
            type="number"
            id="inp_mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onFocus={() => clearError("mobile")}
          />
          <p className={errors.mobile ? "error" : "offScrn"}>{errors.mobile}</p>

          <label htmlFor="date">Date</label>
          <input
            autoComplete="off"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => clearError("date")}
          />

          <label htmlFor="time">Select Time:</label>
          <select
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button type="button" onClick={register}>
            Confirm booking
          </button>
        </form>
      </div>
      {openPopup && <Popup path="../../" response={200} message="Booking Successful..." setOpenPopup={setOpenPopup} />}
    </div>
  );
};

export default BookingForm;
