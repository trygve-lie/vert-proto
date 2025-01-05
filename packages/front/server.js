import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

import document from 'module-application/document';
import frame from 'module-application/frame';

const app = Fastify({
  logger: true
});

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });
    
    const page = html`
      <app-frame>
        <main slot="main">
          <h2>Frontpage</h2>
        </main>
        <div slot="search">
          <h3>Global search:</h3>
          <form method="get" action="/horizontal/search/">
              <input type="search" name="q" value="${request.query?.q}" placeholder="Search..">
              <input type="submit" value="search">
          </form>
        </div>
      </app-frame>
    `;

    return new RenderResultReadable(render(document(page), {
      deferHydration: false
    }));
});

app.get('/horizontal/search/', async function handler (request, reply) {
  reply.headers({
      "content-type": "text/html;charset=utf-8",
  });
  
  const page = html`
    <app-frame>
      <main slot="main">
        <h2>Global search: ${request.query?.q}</h2>
        <ul class="search-result">
          <li>Item foo</li>
          <li>Item bar</li>
          <li>Item xyz</li>
          <li><a href="/a/search/?q=${request.query?.q}">More in vertical A</a></li>
        </ul>
        <ul class="search-result">
          <li>Item bar</li>  
          <li>Item xyz</li>
          <li>Item foo</li>
          <li><a href="/b/search/?q=${request.query?.q}">More in vertical B</a></li>
        </ul>
      </main>
      <div slot="search">
        <h3>Global search:</h3>          
        <form method="get" action="/horizontal/search/">
          <input type="search" name="q" value="${request.query?.q}" placeholder="Search..">
          <input type="submit" value="search">
        </form>
      </div>
    </app-frame>
  `;

  return new RenderResultReadable(render(document(page), {
    deferHydration: false
  }));
});

app.register(fileServer, {
  root: new URL('./static', import.meta.url),
  prefix: '/static/',
});

try {
  await app.listen({ port: 3010 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}