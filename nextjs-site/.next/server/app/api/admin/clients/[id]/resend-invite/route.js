"use strict";(()=>{var e={};e.id=8866,e.ids=[8866],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},43281:(e,t,n)=>{n.r(t),n.d(t,{originalPathname:()=>y,patchFetch:()=>b,requestAsyncStorage:()=>h,routeModule:()=>g,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var r={};n.r(r),n.d(r,{POST:()=>f,dynamic:()=>u});var i=n(49303),a=n(88716),o=n(60670),s=n(76995),d=n(82591),l=n(65433),p=n(84770),c=n.n(p);let u="force-dynamic";async function f(e,{params:t}){if((e.headers.get("Authorization")??"").replace("Bearer ","")!==process.env.ADMIN_PASSWORD)return Response.json({error:"Unauthorized"},{status:401});let{id:n}=await t,{data:r,error:i}=await s.O.from("clients").select("*").eq("id",n).single();if(i||!r)return Response.json({error:"Client not found"},{status:404});let a=c().randomUUID();await s.O.from("clients").update({invite_token:a,invite_sent_at:new Date().toISOString(),status:"pending"}).eq("id",n);try{let e=new d.R(process.env.RESEND_API_KEY),t=(0,l.F)(r.first_name,a);await e.emails.send({from:t.from,to:[r.email],subject:t.subject,html:t.html})}catch(e){return console.error("Failed to resend invite:",e),Response.json({error:"Failed to send email"},{status:500})}return Response.json({success:!0})}let g=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/admin/clients/[id]/resend-invite/route",pathname:"/api/admin/clients/[id]/resend-invite",filename:"route",bundlePath:"app/api/admin/clients/[id]/resend-invite/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/admin/clients/[id]/resend-invite/route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:h,staticGenerationAsyncStorage:m,serverHooks:x}=g,y="/api/admin/clients/[id]/resend-invite/route";function b(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},65433:(e,t,n)=>{n.d(t,{F:()=>r});function r(e,t){let n=`https://www.insurancewheatridge.com/portal/setup?token=${t}`;return{from:"Insurance Wheat Ridge <onboarding@resend.dev>",subject:"You're Invited to Your Insurance Portal",html:`<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
<tr><td style="background:linear-gradient(135deg,#0954a5,#073d7a);padding:40px 30px;text-align:center">
<h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700">Insurance Wheat Ridge</h1>
<p style="color:#a3c4e8;margin:8px 0 0;font-size:14px">Your Client Portal</p>
</td></tr>
<tr><td style="padding:40px 30px">
<p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px">Hello ${e},</p>
<p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px">J. Terry at Insurance Wheat Ridge has invited you to your client portal.</p>
<p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 30px">Set up your account to view your policies, access your digital insurance cards, upload documents, and more.</p>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<a href="${n}" style="display:inline-block;background:#0954a5;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:600">Set Up My Account</a>
</td></tr></table>
<p style="color:#888;font-size:13px;margin:30px 0 0;line-height:1.5">If the button doesn't work, copy and paste this link:<br><a href="${n}" style="color:#0954a5;word-break:break-all">${n}</a></p>
</td></tr>
<tr><td style="background:#f9fafb;padding:24px 30px;border-top:1px solid #eee">
<p style="color:#888;font-size:12px;margin:0;text-align:center">Insurance Wheat Ridge — Farmers Insurance<br>4095 Youngfield St, Wheat Ridge, CO 80033<br>(303) 940-1677</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`}}},76995:(e,t,n)=>{n.d(t,{O:()=>a});var r=n(37857);let i=null,a=new Proxy({},{get:(e,t)=>(...e)=>(i||(i=(0,r.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),i)[t](...e)})}};var t=require("../../../../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[8948,7572,2591],()=>n(43281));module.exports=r})();