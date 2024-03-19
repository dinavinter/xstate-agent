import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { jsx } from 'https://deno.land/x/hono/middleware.ts'

const app = new Hono();

import Template from "https://deno.land/x/template@v0.1.0/mod.ts";
const tpl = new Template({
  open: "<%",
  close: "%>",
});



const html = await fetch("https://raw.githubusercontent.com/sap-cdc-starters/custom-screen-set/main/src/index.html").then(e=>e.text());
const template = tpl.compile(html);
const componnet = await fetch("https://raw.githubusercontent.com/sap-cdc-starters/custom-screen-set/main/src/screen-set.js").then(e=>e.text());

const kv = await Deno.openKv();


app.get("/screen-set.js", (c) => {
  c.header('Content-Type', 'application/javascript')
  return c.body(componnet)
});



app.get("/screens/:name", (c) => {
  const name = c.req.param('name')

  return c.html(tpl.renderCompiled(template, {apikey: "4_qfguwzMx5jiJuBcKrSZe4w", name}))
})



app.post("/screens/:name", async (c)=>{
  console.log('setting screen')
  const name = c.req.param('name')
  const {css, screens, js} = await c.req.json()

  await kv.set(["screens", name, "html"], screens)
  await kv.set(["screens", name, "css"], css)
  await kv.set(["screens", name, "js"], js)
  c.status(201)


  c.header('Location', `https://custom-screen-set.deno.dev/screens/${name}`)
  return c.json({
    links: {
      self: `https://custom-screen-set.deno.dev/screens/${name}`
    }
  })
})


app.get("/screens/:name/index.html", async (c)=> {
  const name = c.req.param('name')
  console.log(await await kv.get(["screens", name, "html"]))
  console.log("get screen html", name)
  return c.html(await kv.get(["screens", name, "html"]).then(e=>e?.value?.join('\n') || '<></>'))
});

app.get("/screens/:name/index.css", async (c)=> {
  const name = c.req.param('name')
  c.header('Content-Type', 'text/css')
  return c.body(await kv.get(["screens", name, "css"]).then(e=>e?.value || ''))
})

app.get("/screens/:name/index.js", async (c)=> {
  const name = c.req.param('name')
  c.header('Content-Type', 'application/javascript')
  return c.body(await kv.get(["screens", name, "js"]).then(e=>e?.value || ''))
})


Deno.serve(app.fetch);