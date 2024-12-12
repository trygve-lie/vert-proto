import fileServer from '@fastify/static';
import Fastify from 'fastify';

const app = Fastify({
  logger: true
})

app.register(fileServer, {
  root: new URL('./static', import.meta.url),
  prefix: '/cdn/',
});

try {
  await app.listen({ port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}