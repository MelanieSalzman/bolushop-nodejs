import config from './config.js'
import './database.js'
import createServer from './server/app.js'

const app = createServer()

    //El servidor se pone a escuchar en el puerto 3000
   const server = app.listen(config.port, error => {
       
        if(error) throw new Error('Error en servidor:', error)
   
        console.log(`listening on port ${server.address().port}`)
    });
    
