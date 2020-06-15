import crearServidor from './server/app.js'

const app = crearServidor()

const PORT = 4000

const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${server.address().port}`)
})