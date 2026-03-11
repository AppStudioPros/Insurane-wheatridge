(()=>{var e={};e.id=7413,e.ids=[7413],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25788:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>T,originalPathname:()=>E,pages:()=>o,routeModule:()=>u,tree:()=>c}),s(32001),s(30738),s(35866);var a=s(23191),r=s(88716),i=s(37922),n=s.n(i),l=s(95231),d={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);s.d(t,d);let c=["",{children:["setup",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,32001)),"/tmp/iw/nextjs-site/app/setup/page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,30738)),"/tmp/iw/nextjs-site/app/layout.js"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"]}],o=["/tmp/iw/nextjs-site/app/setup/page.js"],E="/setup/page",T={require:s,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/setup/page",pathname:"/setup",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},93990:(e,t,s)=>{Promise.resolve().then(s.bind(s,86898))},86898:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var a=s(10326),r=s(17577);let i=`-- Insurance Wheat Ridge - Database Setup
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  password_hash TEXT,
  status TEXT DEFAULT 'pending',
  invite_token TEXT,
  invite_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS policies (
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
);

CREATE TABLE IF NOT EXISTS id_cards (
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
);

CREATE TABLE IF NOT EXISTS documents (
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
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON policies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON id_cards FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON messages FOR ALL USING (true) WITH CHECK (true);`,n=["clients","policies","id_cards","documents","messages"];function l(){let[e,t]=(0,r.useState)(""),[s,l]=(0,r.useState)(!1),[d,c]=(0,r.useState)(!1),[o,E]=(0,r.useState)(!1),[T,u]=(0,r.useState)(null),[p,m]=(0,r.useState)(""),x=async()=>{E(!0),u(null);try{let t=await fetch("/api/setup-db",{headers:{Authorization:"Bearer "+e}}),s=await t.json();t.ok?u(s):m(s.error||"Check failed")}catch{m("Failed to check tables")}E(!1)};return s?a.jsx("div",{className:"min-h-screen bg-gray-50 p-4",children:a.jsx("div",{className:"max-w-4xl mx-auto",children:(0,a.jsxs)("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[(0,a.jsxs)("div",{className:"bg-gradient-to-r from-[#0954a5] to-[#073d7a] px-6 py-6 text-white",children:[a.jsx("h1",{className:"text-xl font-bold",children:"Database Setup"}),a.jsx("p",{className:"text-blue-200 text-sm mt-1",children:"Insurance Wheat Ridge - Supabase Tables"})]}),(0,a.jsxs)("div",{className:"p-6 space-y-6",children:[(0,a.jsxs)("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[a.jsx("h2",{className:"font-semibold text-blue-900 mb-2",children:"Instructions"}),(0,a.jsxs)("ol",{className:"text-sm text-blue-800 space-y-1 list-decimal list-inside",children:[a.jsx("li",{children:"Copy the SQL below"}),(0,a.jsxs)("li",{children:["Go to ",a.jsx("a",{href:"https://supabase.com/dashboard",target:"_blank",rel:"noopener noreferrer",className:"underline font-medium",children:"Supabase Dashboard"})]}),a.jsx("li",{children:"Open your project → SQL Editor"}),a.jsx("li",{children:"Paste the SQL and click “Run”"}),a.jsx("li",{children:"Come back here and click “Check Tables” to verify"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("h3",{className:"font-semibold text-gray-900",children:"SQL Script"}),a.jsx("button",{onClick:()=>{navigator.clipboard.writeText(i),c(!0),setTimeout(()=>c(!1),2e3)},className:`px-4 py-2 rounded-lg font-medium text-sm transition ${d?"bg-green-500 text-white":"bg-[#0954a5] text-white hover:bg-[#073d7a]"}`,children:d?"✓ Copied!":"Copy SQL"})]}),a.jsx("pre",{className:"bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-xs max-h-96 overflow-y-auto",children:i})]}),(0,a.jsxs)("div",{children:[a.jsx("button",{onClick:x,disabled:o,className:"bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60",children:o?"Checking...":"Check Tables"}),p&&a.jsx("p",{className:"text-red-500 text-sm mt-2",children:p}),T&&(0,a.jsxs)("div",{className:"mt-4 space-y-2",children:[n.map(e=>(0,a.jsxs)("div",{className:`flex items-center gap-2 px-4 py-2 rounded-lg ${T[e]?"bg-green-50 text-green-700":"bg-red-50 text-red-700"}`,children:[a.jsx("span",{className:"text-lg",children:T[e]?"✓":"✗"}),a.jsx("span",{className:"font-medium",children:e}),a.jsx("span",{className:"text-sm",children:T[e]?"— exists":"— not found"})]},e)),Object.values(T).every(e=>e)&&a.jsx("p",{className:"text-green-700 font-semibold mt-2",children:"\uD83C\uDF89 All tables are set up!"})]})]})]})]})})}):a.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center p-4",children:(0,a.jsxs)("form",{onSubmit:e=>{e.preventDefault(),l(!0),m("")},className:"bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4",children:[a.jsx("h1",{className:"text-xl font-bold text-gray-900 text-center",children:"Database Setup"}),a.jsx("p",{className:"text-sm text-gray-500 text-center",children:"Enter admin password to continue"}),a.jsx("input",{type:"password",value:e,onChange:e=>t(e.target.value),required:!0,className:"w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900",placeholder:"Admin password"}),a.jsx("button",{type:"submit",className:"w-full bg-[#0954a5] text-white py-3 rounded-lg font-semibold",children:"Continue"})]})})}},32001:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});let a=(0,s(68570).createProxy)(String.raw`/tmp/iw/nextjs-site/app/setup/page.js#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[8948,6180,1465],()=>s(25788));module.exports=a})();