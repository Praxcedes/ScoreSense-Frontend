// Simple test to verify API connection
console.log('Testing frontend API configuration...');
console.log('VITE_API_URL from env:', process.env.VITE_API_URL || 'Not set in Node context');

// Simulate what the frontend would see
const testURL = 'https://scoresense-africa-backend.onrender.com/api';
console.log('Test URL would be:', testURL);

// Test the actual endpoint
const https = require('https');
const options = {
  hostname: 'scoresense-africa-backend.onrender.com',
  port: 443,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Status Message:', res.statusMessage);
  res.on('data', (d) => {
    console.log('Response (first 200 chars):', d.toString().substring(0, 200));
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(JSON.stringify({email: "test2@example.com", password: "Test123!"}));
req.end();
