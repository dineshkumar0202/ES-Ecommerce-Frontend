
import axios from 'axios';

async function checkTime() {
    try {
        console.log('System Time:', new Date().toISOString());

        // Fetch time from a reliable server (e.g., worldtimeapi or just google header)
        // Using worldtimeapi for clear JSON
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const worldTime = response.data.datetime;

        console.log('World Time :', worldTime);

        const systemTime = new Date().getTime();
        const serverTime = new Date(worldTime).getTime();
        const diff = Math.abs(systemTime - serverTime);

        console.log(`Difference (ms): ${diff}`);
        console.log(`Difference (hours): ${diff / (1000 * 60 * 60)}`);

        if (diff > 15 * 60 * 1000) { // 15 minutes
            console.log('WARNING: System time is significantly different from World Time!');
        } else {
            console.log('System time matches World Time.');
        }

    } catch (error: any) {
        console.error('Error fetching world time:', error.message);
    }
}

checkTime();
