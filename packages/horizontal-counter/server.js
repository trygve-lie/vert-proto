import fileServer from '@fastify/static';
import Fastify from 'fastify';

const app = Fastify({
  logger: true
})

app.get('/', async function handler (request, reply) {
    reply.headers({
        "content-type": "text/html;charset=UTF-8",
    });
    
    return `<div id="count" class="counter">Global counter: <span id="counter">1</span></div>`;
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