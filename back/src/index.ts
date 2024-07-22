import server from './server/server'
import { PORT, PROTO, HOST } from './config/envs'
import "reflect-metadata"
import { AppDataSource } from './config/data-source'
import { preloadAppointmentData, preloadServiceData, preloadUserData } from './helpers/preloadData'

const initializeApp = async () => {
    await AppDataSource.initialize()
    await preloadServiceData()
    // await preloadCredentialData()
    await preloadUserData()
    await preloadAppointmentData()
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PROTO}://${HOST}:${PORT}`);
    });
}

initializeApp()



