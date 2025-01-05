import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

import messaging from 'horizontal-messaging/component';

import document from 'module-application/document';
import frame from 'module-application/frame';

const app = Fastify({
  logger: true,
});

app.get('/b/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });

    const page = html`
      <app-frame>
        <main slot="main">
          <h2>Vertical B</h2>
          <messaging-button></messaging-button>
        </main>
        <div slot="search">
          <h3>Vertical B search:</h3>
          <form method="get" action="/b/search/">
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

app.get('/b/search/', async function handler (request, reply) {
  reply.headers({
      "content-type": "text/html;charset=utf-8",
  });
  
  const page = html`
    <app-frame>
      <main slot="main">
        <h2>Vertical B search: ${request.query.q}</h2>
        <ul class="search-result">
          <li>Item bar</li>
          <li>Item xyz</li>
          <li>Item foo</li>
          <li>Item foo</li>
          <li>Item bar</li>
          <li>Item xyz</li>
        </ul>
      </main>
      <div slot="search">
        <h3>Vertical B search:</h3>
        <form method="get" action="/b/search/">
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
  prefix: '/b/static/',
});

try {
  await app.listen({ port: 3012 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}