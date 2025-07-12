const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve the form manually (for local testing only)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../form-frontend/index.html'));
});

// ✅ Handle form submission
app.post('/submit', (req, res) => {
  const { name, age, college, email, password } = req.body;

  const newUser = {
    name,
    age,
    college,
    email,
    password
  };

  const filePath = path.join(__dirname, 'data.json');

  // Read existing data
  let users = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    try {
      users = JSON.parse(fileData);
    } catch (e) {
      users = [];
    }
  }

  // Append new user
  users.push(newUser);

  // Write updated data
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

  console.log('Data saved to data.json');
  res.send(`<h2>Thanks ${name}, your data has been saved!</h2>`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
