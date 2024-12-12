import fileServer from '@fastify/static';
import Fastify from 'fastify';

import counter from 'horizontal-counter';
import header from 'horizontal-header';

const app = Fastify({
  logger: true
})

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=UTF-8",
    });
    
    return `<!doctype html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon" />
                <title>Front</title>
                <link rel="stylesheet" href="http://localhost:3000/cdn/styles.css">
                <script src="http://localhost:3000/cdn/navigation.js"></script>
                <script src="http://localhost:3000/cdn/global.js" type="module"></script>
                <script src="http://localhost:3010/static/client.js" id="script" type="module"></script>
              </head>
              <body class="page">
                
                ${header}
                
                <aside class="aside">
                  <ul class="navigation">
                    <li><a href='/a/'>Vertical A</a></li>
                    <li><a href='/b/'>Vertical B</a></li>
                    <li><a href='/'>Home</a></li>
                  </ul>
                  ${counter}
                  <div id="slot-aside" class="slot">
                    <div class="front"></div>
                  </div>
                </aside>

                <main class="main">
                  <div id="slot-main" class="slot">
                    <div class="front" id="content">
                      <h1>Frontpage</h1>
                      <p>This frontpage vertical can be written in boring tech! Server side html, vanilla js and css. You choose!</p>
                    </div>
                  </div>
                </main>

              </body>
            </html>`;
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