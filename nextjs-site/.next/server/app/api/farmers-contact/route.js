"use strict";(()=>{var e={};e.id=541,e.ids=[541],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},12973:(e,r,t)=>{let o;t.r(r),t.d(r,{originalPathname:()=>y,patchFetch:()=>h,requestAsyncStorage:()=>f,routeModule:()=>x,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g});var s={};t.r(s),t.d(s,{POST:()=>u,dynamic:()=>c});var a=t(49303),n=t(88716),i=t(60670),p=t(82591),d=t(87070),l=t(76995);let c="force-dynamic";async function u(e){try{let{name:r,email:t,phone:s,insuranceType:a,message:n,website:i}=await e.json();if(i&&""!==i.trim())return l.O.from("inquiries").insert({source:"farmers",name:r,email:t,phone:s,insurance_type:a,message:n}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),d.NextResponse.json({success:!0},{status:200});if(!r||!t)return d.NextResponse.json({error:"Missing required fields."},{status:400});let{error:c}=await (o||(o=new p.R(process.env.RESEND_API_KEY)),o).emails.send({from:"Insurance Wheatridge <noreply@mail.insurancewheatridge.com>",to:["jterry1@farmersagent.com"],replyTo:t,subject:`New Farmers Quote Request — ${r}`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div style="background: #cc0000; padding: 20px 24px; border-radius: 6px; margin-bottom: 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Farmers Insurance Quote Request</h2>
            <p style="color: #fca5a5; margin: 4px 0 0; font-size: 14px;">insurancewheatridge.com — Contact Page</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 160px; vertical-align: top; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${r}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${t}" style="color: #1d4ed8;">${t}</a></td>
            </tr>
            ${s?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; color: #111827;">${s}</td>
            </tr>`:""}
            ${a?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Coverage Type</td>
              <td style="padding: 10px 0; color: #111827;">${a}</td>
            </tr>`:""}
            ${n?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Message</td>
              <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${n}</td>
            </tr>`:""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Jubal Terry — Insurance Wheatridge \xb7 (303) 464-1911</p>
        </div>
      `});if(c)return console.error("Resend error:",c),d.NextResponse.json({error:"Failed to send message."},{status:500});return l.O.from("inquiries").insert({source:"farmers",name:r,email:t,phone:s,insurance_type:a,message:n}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),d.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("API error:",e),d.NextResponse.json({error:"Server error."},{status:500})}}let x=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/farmers-contact/route",pathname:"/api/farmers-contact",filename:"route",bundlePath:"app/api/farmers-contact/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/farmers-contact/route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:f,staticGenerationAsyncStorage:g,serverHooks:m}=x,y="/api/farmers-contact/route";function h(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}},76995:(e,r,t)=>{t.d(r,{O:()=>a});var o=t(37857);let s=null,a=new Proxy({},{get:(e,r)=>(...e)=>(s||(s=(0,o.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),s)[r](...e)})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[948,572,591,70],()=>t(12973));module.exports=o})();