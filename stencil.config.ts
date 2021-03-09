import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';

// https://stenciljs.com/docs/config

export const config: Config = {
    namespace: 'image-recursive',
    globalStyle: 'src/global/app.scss',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    excludeUnusedDependencies: true,
    plugins: [
        sass(),
        postcss({
            plugins: [ autoprefixer() ]
        })
    ],
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
            /* copy: [
                { src: 'fonts/*.woff2', dest: 'static/fonts', warn: true }
            ] */
        },
        {
            type: 'dist-custom-elements-bundle',
        },
        {
            type: 'docs-readme'
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
            baseUrl: 'https://myapp.local/',
            /* copy: [
                { src: 'fonts/*.woff2', dest: 'static/fonts', warn: true }
            ] */
        }
    ]
};
