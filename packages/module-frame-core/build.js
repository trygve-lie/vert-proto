import { createRequire } from 'node:module';
import { join } from 'node:path';

import * as esbuild from 'esbuild'

const require = createRequire(import.meta.url);
const root = join(import.meta.dirname, '../../../../');

const depname = '@lit-labs/ssr-client/lit-element-hydrate-support.js';
const filePath = require.resolve(depname);

await esbuild.build({
    resolveExtensions: ['.js', '.ts'],
    legalComments: 'none',
    entryPoints: ['./src/frame.js'],
    charset: 'utf8',
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    // plugins: [importMap.plugin()],
    outdir: './static/',
    treeShaking: false,
    minify: false,
    // write: false,

    
    bundle: true,
    // outfile: './static/frame.js',
})