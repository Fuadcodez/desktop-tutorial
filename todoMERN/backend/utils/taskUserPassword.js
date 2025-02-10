import crypto from 'crypto';


const hashThePassword =  (password, salt)=>{
    const hashed = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
    return hashed.toString('hex');
}
const createHash = async (password) =>{
    const salt = crypto.randomBytes(16).toString('hex');
    const hashPassword =  hashThePassword(password, salt);
    return { hashPassword, salt}
}
const confirmPassword = async (hashpassword, salt, password) =>{
    const hash = hashThePassword(password, salt);
    return hashpassword === hash
}

export { createHash, confirmPassword}