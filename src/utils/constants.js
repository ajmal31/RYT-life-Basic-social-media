import dotenv from "dotenv"
dotenv.config()

export default{

    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY
}