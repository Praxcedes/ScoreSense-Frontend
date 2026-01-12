const axios = require('axios');

const API_BASE_URL = 'http://localhost:10000/api';

async function testEndpoint(endpoint, params = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`\nTesting: ${url}`);
    
    const response = await axios.get(url, { params, timeout: 10000 });
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`Success: ${response.data.success}`);
    
    if (response.data.count !== undefined) {
      console.log(`Count: ${response.data.count}`);
    }
    
    if (response.data.matches && response.data.matches.length > 0) {
      console.log('Sample match:');
      const match = response.data.matches[0];
      console.log(`  ${match.home_team} vs ${match.away_team}`);
      console.log(`  League: ${match.league}`);
      console.log(`  Status: ${match.status}`);
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    if (error.response) {
      console.log(`Response status: ${error.response.status}`);
      console.log(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return false;
  }
}

async function runTests() {
  console.log('=== Testing Backend API Connection ===');
  console.log(`Base URL: ${API_BASE_URL}`);
  
  const tests = [
    { endpoint: '/health/simple' },
    { endpoint: '/matches/live' },
    { endpoint: '/matches/upcoming', params: { limit: 2 } },
    { endpoint: '/matches/search', params: { q: 'Premier', limit: 1 } },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const success = await testEndpoint(test.endpoint, test.params);
    if (success) passed++;
    else failed++;
  }
  
  console.log(`\n=== Test Results ===`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${tests.length}`);
  
  if (failed === 0) {
    console.log('✅ All tests passed! Frontend can connect to backend.');
  } else {
    console.log('❌ Some tests failed. Check backend server.');
  }
}

runTests();
