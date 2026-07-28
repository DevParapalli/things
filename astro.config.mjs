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
import { proximaShikiDark, proximaShikiLight } from './src/styles/proxima-shiki'

// Nova installs its own Shiki themes from an integration it adds during its
// own setup. Registering ours from a Starlight plugin listed after Nova puts
// our integration later in the queue, so these themes are the ones that stick.
const starlightProximaCode = () => ({
	name: 'proxima-code-themes',
	hooks: {
		setup: ({ addIntegration }) => {
			addIntegration({
				name: 'proxima-code-themes-integration',
				hooks: {
					'astro:config:setup': ({ updateConfig }) => {
						updateConfig({
							markdown: {
								shikiConfig: {
									themes: { light: proximaShikiLight, dark: proximaShikiDark },
								},
							},
						})
					},
				},
			})
		},
	},
})

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
				starlightProximaCode(),
			],
			customCss: ['./src/styles/global.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/DevParapalli' }
			],
			components: {
				PageTitle: './src/components/overrides/PageTitle.astro',
			},
			routeMiddleware: ['./src/middleware/tags-splash.ts']
		}),
	],
})