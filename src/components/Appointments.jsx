import React, { useEffect, useState } from 'react'
import LoaderComponent from './generals/LoaderComponent'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Appointments = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigator = useNavigate();

    const fetchData = async () => {
        const response = await axios.get('https://my-json-server.typicode.com/repo-by-anish/fake_server/categories');
        setData(response.data);
        setLoading(false);
    }
    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading])

    if (loading) {
        return <LoaderComponent />;
    }

    const appoint_categories = (
        <div className='appoint_categories'>
            {
                data?.map((category, index) => (
                    <div onClick={() => navigator(`${category.route}`)} key={index} className='ap_c__item'>
                        <img src={category.image} alt={`category image at ${index}`} />
                        <h4>{category.name}</h4>
                        <p>{category.dialogue}</p>
                    </div>
                ))
            }
        </div>
    )

    return (
        <div className='appointments'>
            <h2 className='appointments__heading'>Book an appointment for an in-clinic consultation.</h2>
            <p>Find experienced doctors across all specialties</p>
            {appoint_categories}
        </div>
    )
}

export default Appointments