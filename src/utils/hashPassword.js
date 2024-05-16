import CryptoJS from 'crypto-js';

export default async function hashPassword (password) {
    return CryptoJS.SHA256(password).toString();
}