import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  mongoDB: {
    connection: process.env.MONGO_CONNECTION,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    dbName: process.env.MONGO_DB_NAME,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expirationTime: process.env.JWT_EXPIRATION_TIME,
    },
  },
}))
