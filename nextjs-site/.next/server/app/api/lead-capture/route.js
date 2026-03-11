"use strict";(()=>{var e={};e.id=582,e.ids=[582],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},47387:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>f,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>x});var o={};t.r(o),t.d(o,{POST:()=>u,dynamic:()=>p});var a=t(49303),s=t(88716),d=t(60670),n=t(82591),i=t(76995);let p="force-dynamic",l=new n.R(process.env.RESEND_API_KEY);async function u(e){try{let{firstName:r,email:t,phone:o,website:a}=await e.json();if(a)return Response.json({success:!0});if(!r||!t)return Response.json({error:"Name and email are required."},{status:400});return await l.emails.send({from:"Insurance Wheatridge <noreply@mail.insurancewheatridge.com>",to:["jubal.terry@insurancewheatridge.com"],subject:`🎯 New Lead: ${r} is interested in a quote`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Lead Captured 🎯</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Someone wants a free quote</p>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${r}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">
                  <a href="mailto:${t}" style="color: #1e3a5f;">${t}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">
                  ${o?`<a href="tel:${o}" style="color: #1e3a5f;">${o}</a>`:'<span style="color: #9ca3af;">Not provided</span>'}
                </td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #1e3a5f;">
              <p style="margin: 0; color: #1e3a5f; font-size: 14px;">
                <strong>Heads up:</strong> This lead came from the quote popup on the website. They expressed interest but haven't filled out the full form yet — worth a quick follow-up!
              </p>
            </div>
          </div>
        </div>
      `}),i.O.from("leads").insert({first_name:r,email:t,phone:o}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),Response.json({success:!0})}catch(e){return console.error("Lead capture error:",e),Response.json({error:"Something went wrong."},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/lead-capture/route",pathname:"/api/lead-capture",filename:"route",bundlePath:"app/api/lead-capture/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/lead-capture/route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:f,staticGenerationAsyncStorage:x,serverHooks:m}=c,g="/api/lead-capture/route";function h(){return(0,d.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:x})}},76995:(e,r,t)=>{t.d(r,{O:()=>s});var o=t(37857);let a=null,s=new Proxy({},{get:(e,r)=>(...e)=>(a||(a=(0,o.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),a)[r](...e)})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[948,572,591],()=>t(47387));module.exports=o})();