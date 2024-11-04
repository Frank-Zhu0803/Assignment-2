import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Delete() {
    //Extract the country id from url parameters
    const { id } = useParams();

    //State to store the country details
    const [country, setCountry] = useState(null);

    //Initialize nav to allow redirection after deletion
    const navigate = useNavigate();

    //Fetch the country details when the component mounts
    useEffect(() => {
        const fetchCountry = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/countries/get/${id}`);
            if (response.ok) {
            const data = await response.json();
            setCountry(data); // Store the fetched country data
            } else {
            setCountry(null);
            }
        };
        fetchCountry();
    }, [id]);

    //Function to handle the deletion of the country
    const handleDelete = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/countries/delete/${id}`, {
            method: 'DELETE',
          });

    //Redirect to the home page on successful deletion
        if (response.ok) {
            navigate('/');
        }else{
            alert('Error deleting country');
        }
    };
    return (
        <div className="container mt-5">
          <h1>Remove Country</h1>
          <h2>Are you sure you want to delete this country?</h2>
          
          {/* Display country details if they exist */}
          {country && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">{country.countryName}</h5>
                <img
                  src={`${import.meta.env.VITE_API_HOST}/images/${country.flagImage}`}
                  alt={`${country.countryName} Flag`}
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
              </div>
            </div>
          )}
    
          {/* Confirmation buttons */}
          <button onClick={handleDelete} className="btn btn-danger mt-3 me-2">Yes, Delete</button>
          <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">Cancel</button>
        </div>
      );
}