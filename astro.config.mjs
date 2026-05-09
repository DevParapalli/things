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
						label: 'Blog',
						link: '/blog/',
						icon: 'seti:notebook',
						items: [{ label: 'formats', autogenerate: { directory: 'formats' } }],
					},
					{
						label: 'Formats',
						link: '/formats/',
						icon: 'document',
						items: [{ label: 'formats', autogenerate: { directory: 'formats' } }],
					},
					{
						label: 'Refs',
						link: '/refs/',
						icon: 'information',
						items: [{ label: 'refs', autogenerate: { directory: 'refs' } }],
					},
					{
						label: 'Snippets',
						link: '/snippets/',
						icon: 'open-book',
						items: [{ label: 'tools', autogenerate: { directory: 'snippets' } }],
					},
					{
						label: 'Techniques',
						link: '/techniques/',
						icon: 'rocket',
						items: [{ label: 'techniques', autogenerate: { directory: 'techniques' } }],
					},
					{
						label: 'Tools',
						link: '/tools/',
						icon: 'setting',
						items: [{ label: 'tools', autogenerate: { directory: 'tools' } }],
					},

				], {

					exclude: ['/tags', "/tags/**"]
				}),
				starlightThemeNova({
					nav: [
						{ label: 'WebLog', href: '/blog/' },
						{ label: 'Formats', href: '/formats/' },
						{ label: 'Refs', href: '/refs/' },
						{ label: 'Snippets', href: '/snippets/' },
						{ label: 'Techniques', href: '/techniques/' },
						{ label: 'Tools', href: '/tools/' },
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