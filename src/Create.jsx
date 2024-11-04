import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    //State to store the input values for country name and falg image
    const[countryName, setCountryName] =useState('');
    const[falgImage, setFlagImage] = useState(null);

    //Initalize navigate to allow redrection after submission
    const navigate = useNavigate();

    //Function to handle form submission
    const addCountry = (event) =>{
        event.preventDefault();//Prevent the default form submission behavior

        //Create FormData to handle file upload alone with text data
        const FormData = new FormData();
        FormData.append('coutryName', countryName);
        FormData.append('flagImage', falgImage);

        //Asynchronous function to post data to the api
        async function postData() {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/countries/create`, {
                method: 'POST',
                body: formData,
              });

            //If the response is successful, nav to the home page
            if (response.ok) {
                navigate('/');
            } else {
                alert('Error adding coutry!');
            }
        }

        //call the postData function to send the data
        postData();
    };

    
    return (
        <div className="container mt-5">
          <h2>Add New Country</h2>
          <form onSubmit={addCountry}>
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
    
            {/* File input for Flag Image */}
            <div className="mb-3">
              <label className="form-label">Flag Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFlagImage(e.target.files[0])}
              />
            </div>
    
            {/* Submit and Cancel buttons */}
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary ms-2">Cancel</button>
          </form>
        </div>
      );
    
}