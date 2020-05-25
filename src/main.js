import app from './server/app.js'
import './database.js'

async function init(){
    await app.listen(3000);
    console.log('Server on port 3000');
}

init();