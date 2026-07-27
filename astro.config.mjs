// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightThemeNova from 'starlight-theme-nova'
import tailwindcss from '@tailwindcss/vite'
import starlightImageZoom from 'starlight-image-zoom'
import starlightHeadingBadges from 'starlight-heading-badges'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightGithubAlerts from 'starlight-github-alerts'
import starlightTags from 'starlight-tags'
import starlightCodeblockFullscreen from 'starlight-codeblock-fullscreen'
import starlightScrollToTop from 'starlight-scroll-to-top'
import starlightLinksValidator from 'starlight-links-validator'
import starlightLlmsTxt from 'starlight-llms-txt'

export default defineConfig({
	site: "https://things.parapalli.dev",
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: 'things',
			plugins: [
				starlightImageZoom(),
				starlightHeadingBadges(),
				starlightGithubAlerts(),
				starlightTags({ onInlineTagsNotFound: 'create', sidebar: {
					enabled: false
				}, tagsPagesPrefix: 'tags', tagsIndexSlug: 'tags'}),
				starlightCodeblockFullscreen(),
				starlightScrollToTop(),
				starlightLinksValidator({
					errorOnRelativeLinks: true,
					exclude: ['/tags/']
				}),
				starlightLlmsTxt(),
				starlightSidebarTopics([
					{
						label: 'Log',
						link: '/log/',
						icon: 'seti:notebook',
						items: [{ label: 'log', autogenerate: { directory: 'log' } }],
					},
					{
						label: 'Notes',
						link: '/notes/',
						icon: 'open-book',
						items: [{ label: 'notes', autogenerate: { directory: 'notes' } }],
					},
					{
						label: 'Refs',
						link: '/refs/',
						icon: 'information',
						items: [{ label: 'refs', autogenerate: { directory: 'refs' } }],
					},
					{
						label: 'Studies',
						link: '/studies/',
						icon: 'document',
						items: [{ label: 'studies', autogenerate: { directory: 'studies' } }],
					},
				], {

					exclude: ['/tags', "/tags/**"]
				}),
				starlightThemeNova({
					nav: [
						{ label: 'Log', href: '/log/' },
						{ label: 'Notes', href: '/notes/' },
						{ label: 'Refs', href: '/refs/' },
						{ label: 'Studies', href: '/studies/' },
					],
				}),
			],
			customCss: ['./src/styles/global.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/DevParapalli' }
			],
			// components: {
			// 	Sidebar: './src/components/overrides/Sidebar.astro'
			// }
			routeMiddleware: ['./src/middleware/tags-splash.ts']
		}),
	],
})