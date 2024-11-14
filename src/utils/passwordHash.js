import bcrypt from "bcrypt"
export const passworHash=async()=>{

    return await bcrypt.hash(password, 10);
}