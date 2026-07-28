import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ url, locals }) => {
    if (url.pathname.startsWith('/tags')) {
        // @ts-ignore
        locals.starlightRoute.hasSidebar = false;
        // A tag page has a single heading, so the table of contents lists one
        // "Overview" entry and leaves a dead column beside the content.
        // Dropping it lets the wider no-sidebar layout centre itself.
        // @ts-ignore
        locals.starlightRoute.toc = undefined;
    }
});
