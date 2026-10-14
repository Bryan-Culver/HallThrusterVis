import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';

// the legacy source uses JSX inside .js files; Vite 8 (oxc) only parses JSX in .jsx/.tsx, so compile those first
const jsxInJs = () => ({
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
        if (!/\/src\/.*\.js$/.test(id)) return null;
        return transformWithOxc(code, id, { lang: 'jsx' });
    },
});

export default defineConfig({
    // relative base so the build works on any static host / sub-path (e.g. GitHub Pages project sites)
    base: './',
    plugins: [jsxInJs(), react()],
    optimizeDeps: { rolldownOptions: { moduleTypes: { '.js': 'jsx' } } },
});
