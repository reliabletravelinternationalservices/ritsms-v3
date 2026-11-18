
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';

import {route,  ZiggyVue } from '../../vendor/tightenco/ziggy';
import { Ziggy } from './ziggy';
import { Toaster } from '@/components/ui/sonner';
import DeleteDialog from '@/components/ui/DeleteDialog.vue';
import ShareModal from './components/ShareModal.vue';

const appName =
    import.meta.env.VITE_APP_NAME || 'Reliable International Travel Services';

(globalThis as any).route = (
    name: string,
    params?: any,
    absolute?: boolean,
    config?: any,
) => route(name, params, absolute, config ?? Ziggy);


createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.vue`,
                import.meta.glob<DefineComponent>('./pages/**/*.vue'),
            ),
        setup({ App, props, plugin }) {
            return createSSRApp({
                render: () => [
                    h(App, props),
                    h(Toaster, { richColors: true, position: 'top-right' }),
                    h(DeleteDialog),
                    h(ShareModal),
                ],
            })
                .use(plugin)
                .use(ZiggyVue, Ziggy);
        },
    }),
);
