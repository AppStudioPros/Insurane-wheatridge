"use strict";(()=>{var e={};e.id=9105,e.ids=[9105],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},64469:(e,t,r)=>{let n;r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>h,requestAsyncStorage:()=>g,routeModule:()=>x,serverHooks:()=>m,staticGenerationAsyncStorage:()=>f});var o={};r.r(o),r.d(o,{POST:()=>u,dynamic:()=>c});var s=r(49303),a=r(88716),i=r(60670),d=r(82591),p=r(87070),l=r(76995);let c="force-dynamic";async function u(e){try{let{name:t,email:r,phone:o,insuranceType:s,message:a,website:i}=await e.json();if(i&&""!==i.trim())return p.NextResponse.json({success:!0},{status:200});if(!t||!r)return p.NextResponse.json({error:"Missing required fields."},{status:400});let{error:c}=await (n||(n=new d.R(process.env.RESEND_API_KEY)),n).emails.send({from:"Insurance Wheatridge <noreply@mail.insurancewheatridge.com>",to:["jubal.terry@insurancewheatridge.com"],replyTo:r,subject:`New Independent Coverage Inquiry — ${t}`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div style="background: #1e3a5f; padding: 20px 24px; border-radius: 6px; margin-bottom: 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Independent Coverage Inquiry</h2>
            <p style="color: #93c5fd; margin: 4px 0 0; font-size: 14px;">insurancewheatridge.com</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 160px; vertical-align: top; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${t}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${r}" style="color: #1d4ed8;">${r}</a></td>
            </tr>
            ${o?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; color: #111827;">${o}</td>
            </tr>`:""}
            ${s?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Coverage Type</td>
              <td style="padding: 10px 0; color: #111827;">${s}</td>
            </tr>`:""}
            ${a?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Message</td>
              <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${a}</td>
            </tr>`:""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Jubal Terry — Insurance Wheatridge \xb7 (303) 464-1911</p>
        </div>
      `});if(c)return console.error("Resend error:",c),p.NextResponse.json({error:"Failed to send message."},{status:500});return l.O.from("inquiries").insert({source:"independent",name:t,email:r,phone:o,insurance_type:s,message:a}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),p.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("API error:",e),p.NextResponse.json({error:"Server error."},{status:500})}}let x=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/independent-contact/route",pathname:"/api/independent-contact",filename:"route",bundlePath:"app/api/independent-contact/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/independent-contact/route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:g,staticGenerationAsyncStorage:f,serverHooks:m}=x,y="/api/independent-contact/route";function h(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:f})}},76995:(e,t,r)=>{r.d(t,{O:()=>s});var n=r(37857);let o=null,s=new Proxy({},{get:(e,t)=>(...e)=>(o||(o=(0,n.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),o)[t](...e)})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,7572,2591,6328],()=>r(64469));module.exports=n})();