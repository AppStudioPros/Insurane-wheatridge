"use strict";(()=>{var e={};e.id=105,e.ids=[105],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},64469:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>h,requestAsyncStorage:()=>g,routeModule:()=>x,serverHooks:()=>m,staticGenerationAsyncStorage:()=>f});var n={};r.r(n),r.d(n,{POST:()=>u,dynamic:()=>l});var o=r(49303),s=r(88716),a=r(60670),i=r(82591),d=r(87070),p=r(76995);let l="force-dynamic",c=new i.R(process.env.RESEND_API_KEY);async function u(e){try{let{name:t,email:r,phone:n,insuranceType:o,message:s,website:a}=await e.json();if(a&&""!==a.trim())return d.NextResponse.json({success:!0},{status:200});if(!t||!r)return d.NextResponse.json({error:"Missing required fields."},{status:400});let{error:i}=await c.emails.send({from:"Insurance Wheatridge <noreply@mail.insurancewheatridge.com>",to:["jubal.terry@insurancewheatridge.com"],replyTo:r,subject:`New Independent Coverage Inquiry — ${t}`,html:`
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
            ${n?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; color: #111827;">${n}</td>
            </tr>`:""}
            ${o?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Coverage Type</td>
              <td style="padding: 10px 0; color: #111827;">${o}</td>
            </tr>`:""}
            ${s?`
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Message</td>
              <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${s}</td>
            </tr>`:""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Jubal Terry — Insurance Wheatridge \xb7 (303) 464-1911</p>
        </div>
      `});if(i)return console.error("Resend error:",i),d.NextResponse.json({error:"Failed to send message."},{status:500});return p.O.from("inquiries").insert({source:"independent",name:t,email:r,phone:n,insurance_type:o,message:s}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),d.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("API error:",e),d.NextResponse.json({error:"Server error."},{status:500})}}let x=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/independent-contact/route",pathname:"/api/independent-contact",filename:"route",bundlePath:"app/api/independent-contact/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/independent-contact/route.js",nextConfigOutput:"",userland:n}),{requestAsyncStorage:g,staticGenerationAsyncStorage:f,serverHooks:m}=x,y="/api/independent-contact/route";function h(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:f})}},76995:(e,t,r)=>{r.d(t,{O:()=>s});var n=r(37857);let o=null,s=new Proxy({},{get:(e,t)=>(...e)=>(o||(o=(0,n.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),o)[t](...e)})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[948,572,591,70],()=>r(64469));module.exports=n})();