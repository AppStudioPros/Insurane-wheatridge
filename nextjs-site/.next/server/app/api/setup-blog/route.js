"use strict";(()=>{var e={};e.id=4278,e.ids=[4278],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},59415:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>g,patchFetch:()=>m,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>E,staticGenerationAsyncStorage:()=>c});var r={};s.r(r),s.d(r,{POST:()=>p,dynamic:()=>u});var a=s(49303),o=s(88716),n=s(60670),i=s(76995);let u="force-dynamic";async function p(e){if(e.headers.get("Authorization")?.replace("Bearer ","")!==process.env.ADMIN_PASSWORD)return Response.json({error:"Unauthorized"},{status:401});let t=(0,i.S)(),{error:s}=await t.from("blog_posts").select("id").limit(1);if(s&&"42P01"===s.code){let e=`
      CREATE TABLE IF NOT EXISTS public.blog_posts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        slug text UNIQUE NOT NULL,
        excerpt text,
        content text DEFAULT '',
        featured_image text,
        category text DEFAULT 'general',
        tags text[] DEFAULT ARRAY[]::text[],
        status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        author text DEFAULT 'Jubal Terry',
        meta_title text,
        meta_description text,
        template text DEFAULT 'standard',
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now(),
        published_at timestamptz
      );
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
    `,t=process.env.SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1];return Response.json({needsManualSetup:!0,sql:e.trim(),message:"Table does not exist. Run the SQL in Supabase Dashboard > SQL Editor.",projectRef:t})}return s?Response.json({error:s.message,code:s.code}):Response.json({success:!0,message:"blog_posts table already exists!"})}let l=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/setup-blog/route",pathname:"/api/setup-blog",filename:"route",bundlePath:"app/api/setup-blog/route"},resolvedPagePath:"/tmp/iw/nextjs-site/app/api/setup-blog/route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:c,serverHooks:E}=l,g="/api/setup-blog/route";function m(){return(0,n.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:c})}},76995:(e,t,s)=>{s.d(t,{O:()=>n,S:()=>o});var r=s(37857);let a=null;function o(){return a||(a=(0,r.eI)(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)),a}let n=new Proxy({},{get:(e,t)=>(...e)=>o()[t](...e)})}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[8948,7572],()=>s(59415));module.exports=r})();