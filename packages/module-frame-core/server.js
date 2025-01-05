import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

import document from 'module-application/document';
import 'module-application/frame';

const app = Fastify({
  logger: true
});

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });

    const page = html`
      <app-frame>
        <div slot="main">Slot: main - <a href="/a/">next</a></div>
        <div slot="search">Slot: search</div>
      </app-frame>
    `;

    return new RenderResultReadable(render(document(page), {
      deferHydration: false
    }));
});

app.get('/a/', async function handler (request, reply) {
  reply.headers({
      "content-type": "text/html;charset=utf-8",
  });

  const page = html`
    <app-frame>
      <div slot="main">Slot: main A - <a href="/">back</a></div>
      <div slot="search">Slot: search</div>
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
  await app.listen({ port: 3005 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}