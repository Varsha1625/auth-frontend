import vercel from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';

const config = {
    preprocess: sveltePreprocess(),

    kit: {
        adapter: vercel()
    }
};

export default config;
