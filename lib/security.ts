import {randomBytes,scryptSync,timingSafeEqual,createCipheriv,createDecipheriv} from 'node:crypto';
import {SignJWT,jwtVerify} from 'jose';
import {cookies} from 'next/headers';
export const hashPassword=(s:string)=>{const salt=randomBytes(16).toString('hex');return `${salt}:${scryptSync(s,salt,64).toString('hex')}`};
export function verifyPassword(s:string,stored:string){const [salt,hex]=stored.split(':');if(!salt||!hex||hex.length!==128)return false;return timingSafeEqual(scryptSync(s,salt,64),Buffer.from(hex,'hex'))}
function secret(){const s=process.env.AUTH_SECRET;if(!s||!/^[a-f0-9]{64}$/i.test(s))throw Error('AUTH_SECRET must be 64 hex chars');return Buffer.from(s,'hex')}
export async function signSession(email:string){return new SignJWT({email}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(secret())}
export async function getSession(){try{const token=(await cookies()).get('nm_session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,secret());return typeof payload.email==='string'?payload.email:null}catch{return null}}
export function encrypt(s:string){const iv=randomBytes(12);const cipher=createCipheriv('aes-256-gcm',secret(),iv);const data=Buffer.concat([cipher.update(s,'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),data]).toString('base64')}
export function decrypt(s:string){const raw=Buffer.from(s,'base64');const decipher=createDecipheriv('aes-256-gcm',secret(),raw.subarray(0,12));decipher.setAuthTag(raw.subarray(12,28));return Buffer.concat([decipher.update(raw.subarray(28)),decipher.final()]).toString('utf8')}
