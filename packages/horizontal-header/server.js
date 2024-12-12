import fileServer from '@fastify/static';
import Fastify from 'fastify';

const app = Fastify({
  logger: true
})

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=UTF-8",
    });
    
    return `<header id="header" class="header">
              <h1>Live Header</h1>
            </header>`;
});

app.register(fileServer, {
  root: new URL('./static', import.meta.url),
  prefix: '/static/',
});

try {
  await app.listen({ port: 3001 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}