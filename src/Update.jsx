import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
    //Get the country id from url parameters
    const { id } = useParams();

    //State variables to store country data 
    const[coutryName, setCountryName] = useState('');
    const [flagImage, setFlagImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    
    //Intialize nav to allow redirection after update
    const navigate = useNavigate();

    //Fetch the country details when the component mounts
    useEffect(() => {
        const fetchCountry = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/countries/get/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCountryName(data.countryName);
                setExistingImage(data.flagImage);
            }
        };
        fetchCountry();
    }, [id]);

    //Handle form submission to uodate the country
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Prepare FormData to send updated data, including the flag image if provided
        const formData = new FormData();
        formData.append('countryName', countryName);
        if (flagImage) formData.append('flagImage', flagImage);

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/countries/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            navigate('/');
        } else {
            alert('Error updating country');
        }
    };

    return (
    <div className="container mt-5">
        <h2>Update Country</h2>
        <form onSubmit={handleUpdate}>
        {/* Input for Country Name */}
        <div className="mb-3">
            <label className="form-label">Country Name</label>
            <input
            type="text"
            className="form-control"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            />
        </div>

        {/* Display current flag image */}
        <div className="mb-3">
            <label className="form-label">Current Flag</label>
            <img
            src={`${import.meta.env.VITE_API_HOST}/images/${existingImage}`}
            alt="Existing Flag"
            style={{ width: '100px', height: 'auto', marginTop: '10px' }}
            />
        </div>

        {/* File input for new flag image (optional) */}
        <div className="mb-3">
            <label className="form-label">New Flag Image (optional)</label>
            <input
            type="file"
            className="form-control"
            onChange={(e) => setFlagImage(e.target.files[0])}
            />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary ms-2">Cancel</button>
        </form>
    </div>
    );
    }