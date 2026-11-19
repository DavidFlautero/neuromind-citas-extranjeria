export async function sendTelegramAlert(message:string,token:string,chatId:string){
 if(!token||!chatId)throw new Error('Telegram not configured');
 const r=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chat_id:chatId,text:message})});
 if(!r.ok)throw new Error(`Telegram returned HTTP ${r.status}`);
 return true;
}
