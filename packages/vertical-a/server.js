import fileServer from '@fastify/static';
import Fastify from 'fastify';

import counter from 'horizontal-counter';
import header from 'horizontal-header';

const app = Fastify({
  logger: true
})

app.get('/a/', async function handler (request, reply) {
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
                <title>Vertical A</title>
                <link rel="stylesheet" href="http://localhost:3000/cdn/styles.css">
                <script src="http://localhost:3000/cdn/navigation.js"></script>
                <script src="http://localhost:3000/cdn/global.js" type="module"></script>
                <script src="http://localhost:3011/a/static/client.js" id="script" type="module"></script>
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

                    <form class="vertical-a" id="selector">
                      <fieldset>
                        <legend>Select title color:</legend>
                        <div class="field">
                          <input type="radio" id="black" name="color" value="black" checked />
                          <label for="black">Black</label>
                        </div>
                        <div class="field">
                          <input type="radio" id="orange" name="color" value="orange" />
                          <label for="orange">Orange</label>
                        </div>
                        <div class="field">
                          <input type="radio" id="blue" name="color" value="blue" />
                          <label for="blue">Blue</label>
                        </div>
                      </fieldset>
                    </form>

                  </div>
                </aside>

                <main class="main">
                  <div id="slot-main" class="slot">

                    <div class="vertical-a black" id="content">
                      <h1>Vertical A</h1>
                      <p>This vertical can be written in ex Vue.js if that is of interest.</p>
                    </div>
                    
                  </div>
                </main>

              </body>

            </html>`;
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