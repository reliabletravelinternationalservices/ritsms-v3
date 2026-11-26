import '../css/app.css';
import 'vue-sonner/style.css';

import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createSSRApp, h, type App as VueApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { Config } from 'ziggy-js';
import { route as ziggyRoute, ZiggyVue } from '../../vendor/tightenco/ziggy';
import DeleteDialog from '@/components/ui/DeleteDialog.vue';
import ShareModal from '@/components/ShareModal.vue';
import { Toaster } from '@/components/ui/sonner';
import { appModal } from '@/lib/app-modal';
import { imageViewer } from '@/lib/imageViewer';

const appName = import.meta.env.VITE_APP_NAME || 'Reliable International Travel Services';

createServer(async (page) => {
    const ziggy = (page.props as { ziggy?: Config }).ziggy;
    let app: VueApp | undefined;
    let head: string[] = [];

    if (ziggy) {
        const ssrGlobal = globalThis as typeof globalThis & {
            Ziggy: Config;
            route: typeof ziggyRoute;
        };

        ssrGlobal.Ziggy = ziggy;
        ssrGlobal.route = (
            name?: string,
            params?: Parameters<typeof ziggyRoute>[1],
            absolute?: boolean,
        ) => ziggyRoute(name, params, absolute, ziggy);
    }

    const response = await createInertiaApp({
        page,
        render: async (targetApp) => {
            if (targetApp === app) {
                return '';
            }

            return renderToString(targetApp);
        },
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.vue`,
                import.meta.glob<DefineComponent>('./pages/**/*.vue'),
            ),
        setup({ App, props, plugin }) {
            app = createSSRApp({
                render: () => [
                    h(App, {
                        ...props,
                        onHeadUpdate: (elements: string[]) => {
                            head = elements;
                            props.onHeadUpdate?.(elements);
                        },
                    }),
                    h(Toaster, {
                        richColors: true,
                        position: 'top-right',
                    }),
                    h(DeleteDialog),
                    h(ShareModal),
                ],
            })
                .use(imageViewer)
                .use(appModal)
                .use(plugin)
                .use(ZiggyVue, props.ziggy);
        },
    });

    if (!app) {
        throw new Error('Inertia SSR app was not initialized.');
    }

    const renderedApp = await renderToString(app);
    const rootClosingTag = response.body.lastIndexOf('</div>');

    if (rootClosingTag === -1) {
        throw new Error('Inertia SSR root element was not found.');
    }

    return {
        head,
        body: `${response.body.slice(0, rootClosingTag)}${renderedApp}${response.body.slice(rootClosingTag)}`,
    };
});
