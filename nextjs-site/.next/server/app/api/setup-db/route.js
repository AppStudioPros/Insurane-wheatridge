"use strict";(()=>{var e={};e.id=3905,e.ids=[3905],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},99033:(e,E,t)=>{t.r(E),t.d(E,{originalPathname:()=>c,patchFetch:()=>l,requestAsyncStorage:()=>u,routeModule:()=>o,serverHooks:()=>A,staticGenerationAsyncStorage:()=>p});var T={};t.r(T),t.d(T,{POST:()=>d,dynamic:()=>n});var a=t(49303),r=t(88716),i=t(60670),s=t(76995);let n="force-dynamic";async function d(e){if((e.headers.get("Authorization")??"").replace("Bearer ","")!==process.env.ADMIN_PASSWORD)return Response.json({error:"Unauthorized"},{status:401});let E=[`CREATE TABLE IF NOT EXISTS clients (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,`CREATE TABLE IF NOT EXISTS policies (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_number TEXT NOT NULL,
      policy_type TEXT NOT NULL,
      carrier TEXT DEFAULT 'Farmers Insurance',
      status TEXT DEFAULT 'active',
      start_date DATE,
      end_date DATE,
      premium_amount DECIMAL,
      coverage_summary TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,`CREATE TABLE IF NOT EXISTS id_cards (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
      card_type TEXT NOT NULL,
      insured_name TEXT NOT NULL,
      policy_number TEXT NOT NULL,
      effective_date DATE,
      expiration_date DATE,
      vehicle_info TEXT,
      coverage_details JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,`CREATE TABLE IF NOT EXISTS documents (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_id UUID REFERENCES policies(id),
      file_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT,
      category TEXT,
      uploaded_by TEXT DEFAULT 'client',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,`CREATE TABLE IF NOT EXISTS messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      sender TEXT NOT NULL,
      subject TEXT,
      body TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`],t=[];for(let e of E){let{error:E}=await s.O.rpc("exec_sql",{query:e}).catch(()=>({}));if(E){let E=await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`,{method:"POST",headers:{"Content-Type":"application/json",apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`},body:JSON.stringify({query:e})});t.push({sql:e.substring(0,40),status:E.ok?"ok":"failed"})}else t.push({sql:e.substring(0,40),status:"ok"})}return Response.json({message:"Database setup attempted. If exec_sql RPC is not available, run the SQL manually in Supabase dashboard.",results:t,manual_sql:E.join(";\n\n")+";"})}let o=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/setup-db/route",pathname:"/api/setup-db",filename:"route",bundlePath:"app/api/setup-db/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/setup-db/route.js",nextConfigOutput:"",userland:T}),{requestAsyncStorage:u,staticGenerationAsyncStorage:p,serverHooks:A}=o,c="/api/setup-db/route";function l(){return(0,i.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:p})}},76995:(e,E,t)=>{t.d(E,{O:()=>r});var T=t(37857);let a=null,r=new Proxy({},{get:(e,E)=>(...e)=>(a||(a=(0,T.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),a)[E](...e)})}};var E=require("../../../webpack-runtime.js");E.C(e);var t=e=>E(E.s=e),T=E.X(0,[8948,7572],()=>t(99033));module.exports=T})();