import cron from 'node-cron';
import { GET } from '../../src/app/api/cron/route'; 
cron.schedule('0 0 * * *', async () => {
  console.log('Cron job triggered');
  try {
    await GET();
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});

console.log('Cron job scheduled');
