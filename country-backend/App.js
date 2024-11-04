const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = 3000;

// Enable CORS to allow frontend to access this API
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// In-memory data storage (use a real database in production)
let countries = [];

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create a new country
app.post('/api/countries/create', upload.single('flagImage'), (req, res) => {
  const { countryName } = req.body;
  const flagImage = req.file ? req.file.filename : null;

  if (!countryName || !flagImage) {
    return res.status(400).json({ error: 'Country name and flag image are required' });
  }

  const newCountry = {
    id: countries.length + 1,
    countryName,
    flagImage: `/uploads/${flagImage}`
  };

  countries.push(newCountry);
  res.status(201).json(newCountry);
});

// Get all countries
app.get('/api/countries/all', (req, res) => {
  res.status(200).json(countries);
});

// Get a specific country by ID
app.get('/api/countries/get/:id', (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  res.status(200).json(country);
});

// Update a country by ID
app.put('/api/countries/update/:id', upload.single('flagImage'), (req, res) => {
  const country = countries.find(c => c.id === parseInt(req.params.id));
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }

  const { countryName } = req.body;
  if (countryName) country.countryName = countryName;

  if (req.file) {
    // Delete the old image if it exists
    if (country.flagImage) {
      const oldImagePath = path.join(__dirname, country.flagImage);
      fs.unlink(oldImagePath, err => {
        if (err) console.error('Error deleting old image:', err);
      });
    }
    // Update the image with the new file
    country.flagImage = `/uploads/${req.file.filename}`;
  }

  res.status(200).json(country);
});

// Delete a country by ID
app.delete('/api/countries/delete/:id', (req, res) => {
  const index = countries.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Country not found' });
  }

  const country = countries[index];
  // Delete the image file if it exists
  if (country.flagImage) {
    const imagePath = path.join(__dirname, country.flagImage);
    fs.unlink(imagePath, err => {
      if (err) console.error('Error deleting image:', err);
    });
  }

  countries.splice(index, 1); // Remove the country from the array
  res.status(200).json({ message: 'Country deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
