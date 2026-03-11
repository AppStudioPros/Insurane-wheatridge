"use strict";(()=>{var e={};e.id=8582,e.ids=[8582],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},47387:(e,t,r)=>{let o;r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>f,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>x});var a={};r.r(a),r.d(a,{POST:()=>u,dynamic:()=>l});var s=r(49303),d=r(88716),n=r(60670),i=r(82591),p=r(76995);let l="force-dynamic";async function u(e){try{let{firstName:t,email:r,phone:a,website:s}=await e.json();if(s)return Response.json({success:!0});if(!t||!r)return Response.json({error:"Name and email are required."},{status:400});return await (o||(o=new i.R(process.env.RESEND_API_KEY)),o).emails.send({from:"Insurance Wheatridge <noreply@mail.insurancewheatridge.com>",to:["jubal.terry@insurancewheatridge.com"],subject:`🎯 New Lead: ${t} is interested in a quote`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Lead Captured 🎯</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Someone wants a free quote</p>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${t}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">
                  <a href="mailto:${r}" style="color: #1e3a5f;">${r}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">
                  ${a?`<a href="tel:${a}" style="color: #1e3a5f;">${a}</a>`:'<span style="color: #9ca3af;">Not provided</span>'}
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
      `}),p.O.from("leads").insert({first_name:t,email:r,phone:a}).then(({error:e})=>{e&&console.error("Supabase log error:",e)}),Response.json({success:!0})}catch(e){return console.error("Lead capture error:",e),Response.json({error:"Something went wrong."},{status:500})}}let c=new s.AppRouteRouteModule({definition:{kind:d.x.APP_ROUTE,page:"/api/lead-capture/route",pathname:"/api/lead-capture",filename:"route",bundlePath:"app/api/lead-capture/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/lead-capture/route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:f,staticGenerationAsyncStorage:x,serverHooks:m}=c,g="/api/lead-capture/route";function h(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:x})}},76995:(e,t,r)=>{r.d(t,{O:()=>s});var o=r(37857);let a=null,s=new Proxy({},{get:(e,t)=>(...e)=>(a||(a=(0,o.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),a)[t](...e)})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,7572,2591],()=>r(47387));module.exports=o})();