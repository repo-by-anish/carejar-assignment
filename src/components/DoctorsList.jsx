import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import LoaderComponent from "./generals/LoaderComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DoctorsList = () => {

  const { path } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigator = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(`https://my-json-server.typicode.com/repo-by-anish/fake_server/${path}`);
    setData(response.data.sort((a, b) => (a.positive_stories - b.positive_stories) / (a.total_stories - b.total_stories)));
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading])

  const location = useLocation();

  if (loading) {
    return <LoaderComponent />;
  }

  const doctorsList = (
    <div className="doctors__list">
      {data?.map((doctor, index) => (
        <div key={index} onClick={()=>navigator(`${location.pathname}/booking/${doctor.id}`)} className="doctor__item">
          <div className="d_i__left">
            <img className="profile_img" src={doctor.image} alt="doctor image" />
            <img className="verified" src="logo/verified.svg" alt="" />
          </div>
          <div className="d_i__middle">
            <h3 className="dim__name">{doctor.name}</h3>
            <p className="info">Dentist</p>
            <p className="info">{doctor.yoe} years experience overall</p>
            <div className="address">
              <h4>{doctor.address}</h4>
              <span className="dot"></span>
              <p>{doctor.clinic_name}</p>
            </div>
            <p className="info">₹ {doctor.fee} Consultation fee at clinic</p>
            <hr className="dotted_hr" />
            <div className="popularity">
              <span className="pop_likes">
                <img className="like" src="logo/like.svg" alt="" />
                {Math.round((doctor.positive_stories / doctor.total_stories) * 100)}%
              </span>
              <span className="total_stories">{doctor.total_stories} Patient stories</span>
            </div>
          </div>
          <div className="d_i__right">
            <div className="availibality">
              <img src="logo/availibality.svg" alt="" />
              <span>Available Today</span>
            </div>
            <button className="book_now">
              Book Appointment <br />
              <span>No Booking Fee</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="doctor_list_main">
      <h1>Doctors List</h1>
      {doctorsList}
      <hr className="bottom_line" />
    </div>
  )
}

export default DoctorsList

