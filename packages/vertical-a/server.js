import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

import document from 'module-application/document';
import frame from 'module-application/frame';

const app = Fastify({
  logger: true
});

app.get('/a/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });
    
    const page = html`
      <app-frame>
        <main slot="main">
          <h2>Vertical A</h2>
        </main>
        <div slot="search">
          <h3>Vertical A search:</h3>
          <form method="get" action="/a/search/">
            <input type="search" name="q" value="${request.query?.q}" placeholder="Search..">
            <fieldset>
              <legend>Select type:</legend>
              <div class="field">
                <input type="radio" id="black" name="type" value="black" ?checked="${(request.query?.type === 'black')}">
                <label for="black">Type A</label>
              </div>
              <div class="field">
                <input type="radio" id="orange" name="type" value="orange" ?checked="${(request.query?.type === 'orange')}">
                <label for="orange">Type B</label>
              </div>
              <div class="field">
                <input type="radio" id="blue" name="type" value="blue" ?checked="${(request.query?.type === 'blue')}">
                <label for="blue">Type C</label>
              </div>
            </fieldset>
            <input type="submit" value="search">
          </form>
        </div>
      </app-frame>
    `;

    return new RenderResultReadable(render(document(page), {
      deferHydration: true
    }));
});

app.get('/a/search/', async function handler (request, reply) {
  reply.headers({
      "content-type": "text/html;charset=utf-8",
  });
  
  const page = html`
    <app-frame>
      <main slot="main">
        <h2>Vertical A search: ${request.query.q}</h2>
        <ul class="search-result">
          <li class="${request.query?.type}">Item foo</li>
          <li class="${request.query?.type}">Item bar</li>
          <li class="${request.query?.type}">Item xyz</li>
          <li class="${request.query?.type}">Item foo</li>
          <li class="${request.query?.type}">Item bar</li>
          <li class="${request.query?.type}">Item xyz</li>
        </ul>
      </main>
      <div slot="search">
        <h3>Vertical A search:</h3>
        <form method="get" action="/a/search/">
          <input type="search" name="q" value="${request.query?.q}" placeholder="Search..">
          <fieldset>
            <legend>Select type:</legend>
            <div class="field">
              <input type="radio" id="black" name="type" value="black" ?checked="${(request.query?.type === 'black')}">
              <label for="black">Type A</label>
            </div>
            <div class="field">
              <input type="radio" id="orange" name="type" value="orange" ?checked="${(request.query?.type === 'orange')}">
              <label for="orange">Type B</label>
            </div>
            <div class="field">
              <input type="radio" id="blue" name="type" value="blue" ?checked="${(request.query?.type === 'blue')}">
              <label for="blue">Type C</label>
            </div>
          </fieldset>
          <input type="submit" value="search">
        </form>
      </div>
    </app-frame>
  `;

  return new RenderResultReadable(render(document(page), {
    deferHydration: true
  }));
});

app.register(fileServer, {
  root: new URL('./static', import.meta.url),
  prefix: '/a/static/',
});

try {
  await app.listen({ port: 3011 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}