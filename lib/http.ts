import {NextResponse} from 'next/server';import {getSession} from './security';
export async function requireAuth(){return Boolean(await getSession())}
export const unauthorized=()=>NextResponse.json({error:'No autorizado'},{status:401});
export function sameOrigin(req:Request){const origin=req.headers.get('origin');if(!origin)return false;try{return new URL(origin).host===req.headers.get('host')}catch{return false}}
