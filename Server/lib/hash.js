import bcrypt from "bcrypt"


export async function createHash(password) {

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return(hash)
}

export async function checkPassword(password,hashedPass) {
    return(bcrypt.compare(password,hashedPass))
}