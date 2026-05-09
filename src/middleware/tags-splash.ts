import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ url, locals }) => {
    // const url = new URL(locals.url);
    if (url.pathname.startsWith('/tags')) {
    // @ts-ignore
    locals.starlightRoute.hasSidebar = false; 
    }
});