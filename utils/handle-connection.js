import mongoose from 'mongoose'

const handleConnection = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('DB Arriba!')
    } catch (error) {
        console.log(`Error a la hora de conectarse a la DB: ${error}`)
    }
}

export default handleConnection