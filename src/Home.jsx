import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    //State to store the list of countries
    const [countries, setCounties] = useState([]);

    //Base url for the api
    const apiUrl = import.meta.env.VITE_API_HOST;

    //Fetch all contries from the api when the componect mounts
    useEffect(() => {
        async function fetchData () {
            const response = await fetch(`${apiUrl}/api/countries/all`);
            if (response.ok) {
                const data = await response.json();
                setCountries(data);
            } else {
                setCountries([]);
            }
        }

        fetchData(); //Fetch countries on mount
    },[]);

    return (
        <div className="container mt-5">
          <h1>Country List</h1>
          <p>
            {/* Link to navigate to the Create page */}
            <Link to="/create" className="btn btn-outline-secondary">Add a Country</Link>
          </p>
    
          {/* Display countries if available, otherwise show a message */}
          {countries.length > 0 ? (
            countries.map((country, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center position-relative">
                    {/* Display country flag */}
                    <img
                      src={`${apiUrl}/images/${country.flagImage}`}
                      className="thumbnail"
                      alt={`${country.countryName} Flag`}
                    />
    
                    {/* Display country info */}
                    <div className="ms-3">
                      <h5 className="card-title">{country.countryName}</h5>
                    </div>
    
                    {/* Update and Delete buttons */}
                    <div className="position-absolute top-0 end-0">
                      <Link to={`/update/${country.id}`} className="btn btn-light btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      &nbsp;
                      <Link to={`/delete/${country.id}`} className="btn btn-light btn-sm">
                        <i className="bi bi-trash"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No countries found.</p>
          )}
        </div>
      );
    }