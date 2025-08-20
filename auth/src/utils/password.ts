import crypto from 'crypto';

export function generateSalt():string{
    return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(password:string,salt:string):string{
    return crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
}

export function verifyPassword(inputPassword:string,salt:string,storedHash:string):boolean{
    return hashPassword(inputPassword,salt)===storedHash;
}