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
				starlightTags({ onInlineTagsNotFound: 'create' }),
				starlightCodeblockFullscreen(),
				starlightScrollToTop(),
				starlightLinksValidator({
					errorOnRelativeLinks: false,
					exclude: ['/tags/']
				}),
				starlightLlmsTxt(),
				starlightSidebarTopics([
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
			]
			//   sidebar: [
			//     { label: 'Techniques', autogenerate: { directory: 'techniques' } },
			//     { label: 'Tools', autogenerate: { directory: 'tools' } },
			//     { label: 'Templates', autogenerate: { directory: 'templates' } },
			//     { label: 'Refs', autogenerate: { directory: 'refs' } },
			//   ],
		}),
	],
})