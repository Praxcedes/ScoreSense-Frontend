import { matchesService } from './services/matches.service'

async function testAPI() {
  console.log('Testing API connection...')
  console.log('Testing live matches...')
  
  try {
    const liveMatches = await matchesService.getLiveMatches()
    console.log('Live matches response:', JSON.stringify(liveMatches, null, 2))
    
    console.log('\nTesting upcoming matches...')
    const upcomingMatches = await matchesService.getUpcomingMatches(5, 'football')
    console.log('Upcoming matches response:', JSON.stringify(upcomingMatches, null, 2))
    
  } catch (error) {
    console.error('API test failed:', error)
  }
}

testAPI()
