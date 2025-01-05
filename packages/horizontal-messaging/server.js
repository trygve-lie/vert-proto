import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

import document from 'module-application/document';
import frame from 'module-application/frame';

const app = Fastify({
  logger: true,
});

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });

    // Production mode
    if (request.headers['x-podium-proxy'] === 'true') {
      const fragment = html`<div id="count" class="counter">
        <h3>Messages:</h3>
        <p>Unread messages: <span id="counter">1</span></p>
        
        <h4>Message to:</h4> 
        <p id="newMsg"></p>
      </div>`;
      
      return new RenderResultReadable(render(fragment, {
        deferHydration: false
      }));
    }

    // Development mode
    const page = html`
      <app-frame>
        <div slot="messaging" id="count" class="counter">
          <h3>Messages:</h3>
          <p>Unread messages: <span id="counter">1</span></p>
          
          <h4>Message to:</h4> 
          <p id="newMsg"></p>
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
  await app.listen({ port: 3002 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}