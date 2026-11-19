import {randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
import {SignJWT,jwtVerify} from 'jose';
import {cookies} from 'next/headers';
export const hashPassword=(password:string)=>{const salt=randomBytes(16).toString('hex');return `${salt}:${scryptSync(password,salt,64).toString('hex')}`};
export function verifyPassword(password:string,stored:string){const [salt,hex]=stored.split(':');if(!salt||!/^[a-f0-9]{128}$/i.test(hex||''))return false;return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(hex,'hex'))}
function secret(){const value=process.env.AUTH_SECRET;if(!value||!/^[a-f0-9]{64}$/i.test(value))throw Error('AUTH_SECRET must be 32 bytes in hex');return Buffer.from(value,'hex')}
export async function signSession(email:string){return new SignJWT({email}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setIssuer('neuromind-citas').setAudience('neuromind-citas-web').setExpirationTime('8h').sign(secret())}
export async function getSession(){try{const token=(await cookies()).get('nm_session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,secret(),{issuer:'neuromind-citas',audience:'neuromind-citas-web',algorithms:['HS256']});return typeof payload.email==='string'?payload.email:null}catch{return null}}
