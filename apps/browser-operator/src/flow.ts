import { chromium, type Page } from 'playwright';
/** Local fixture runner only. Does not connect to government portals. */
export async function runSupervisedFixture(url:string,onHumanRequired:(page:Page)=>Promise<void>){
 const parsed=new URL(url);
 if(!['localhost','127.0.0.1'].includes(parsed.hostname))throw new Error('Fixture runner refuses non-local destinations');
 const browser=await chromium.launch({headless:true});
 try{const page=await browser.newPage();await page.goto(url);if(await page.getByTestId('human-check').count())await onHumanRequired(page);return {title:await page.title(),status:'FIXTURE_ONLY'};}
 finally{await browser.close()}
}
