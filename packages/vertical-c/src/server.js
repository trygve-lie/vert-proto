// server/index.js

import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import { render, html } from '@lit-labs/ssr';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import fileServer from '@fastify/static';
import Fastify from 'fastify';

// import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './App.js';
import Search from './Search.js';

import document from 'module-application/document';
import frame from 'module-application/frame';

const server = Fastify({
  logger: true,
});

server.get('/c/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=utf-8",
    });

    const search = ReactDOMServer.renderToString(<Search />);
    const main = ReactDOMServer.renderToString(<App />);
    
    const page = html`
      <app-frame>
          <main slot="main" id="root">${unsafeHTML(main)}</main>
				  <div slot="search">${unsafeHTML(search)}</div>
      </app-frame>
      <script type="module" src="/c/static/index.js"></script>
    `;

    return new RenderResultReadable(render(document(page), {
      deferHydration: false
    }));
});

server.register(fileServer, {
  root: new URL('./', import.meta.url),
  prefix: '/c/static/',
});

try {
  await server.listen({ port: 3013 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
