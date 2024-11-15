import bcrypt from "bcrypt"
export const passworHash=async(password)=>{

    return await bcrypt.hash(password, 10);
}