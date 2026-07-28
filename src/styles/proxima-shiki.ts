/* Shiki themes built from the Proxima palette.
 *
 * The stock nova pair (one-light / github-dark-dimmed) paints Dockerfile and
 * shell keywords salmon, which in this system means "broken". Rose is reserved
 * for genuine failure, so it only appears here on `invalid` and on a removed
 * diff line. Everything else comes from the accent and the pale state hues, so
 * a code block introduces no colour the rest of the page does not already use.
 *
 * Hex values are the Proxima tokens: a TextMate theme is data, not CSS, so it
 * cannot reference the custom properties.
 */
import type { ThemeRegistration } from '@shikijs/types'

const dark = {
  ink_hi: '#EFF0F8',
  ink_mid: '#A9ADC7',
  ink_low: '#666B8A',
  accent: '#8D8DF5',
  mint: '#5EDBA6',
  amber: '#F5C951',
  sky: '#6EC6F5',
  rose: '#F8929F',
}

const light = {
  ink_hi: '#1B1D2E',
  ink_mid: '#4E5270',
  ink_low: '#9094B0',
  accent: '#5757D9',
  mint: '#0F8A5C',
  amber: '#8F6400',
  sky: '#1272AE',
  rose: '#C43552',
}

function build(name: string, type: 'dark' | 'light', c: typeof dark): ThemeRegistration {
  return {
    name,
    type,
    colors: {
      'editor.background': '#00000000',
      'editor.foreground': c.ink_mid,
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: { foreground: c.ink_low, fontStyle: 'italic' },
      },
      {
        scope: [
          'keyword',
          'keyword.control',
          'keyword.operator.new',
          'keyword.operator.expression',
          'storage',
          'storage.type',
          'storage.modifier',
          'entity.name.tag',
          'markup.heading',
          'meta.preprocessor',
        ],
        settings: { foreground: c.accent },
      },
      {
        scope: [
          'string',
          'string.quoted',
          'string.template',
          'punctuation.definition.string',
          'markup.inserted',
        ],
        settings: { foreground: c.mint },
      },
      {
        scope: [
          'constant.numeric',
          'constant.language',
          'constant.character',
          'constant.other',
          'support.constant',
        ],
        settings: { foreground: c.amber },
      },
      {
        scope: [
          'entity.name.function',
          'support.function',
          'meta.function-call.generic',
          'entity.other.attribute-name',
          'markup.link',
        ],
        settings: { foreground: c.sky },
      },
      {
        scope: [
          'entity.name.type',
          'entity.name.class',
          'entity.name.namespace',
          'support.type',
          'support.class',
          'variable.other.constant',
          'meta.object-literal.key',
          'support.type.property-name',
        ],
        settings: { foreground: c.ink_hi },
      },
      {
        scope: ['variable', 'variable.other', 'variable.parameter', 'meta.definition.variable'],
        settings: { foreground: c.ink_mid },
      },
      {
        scope: [
          'punctuation',
          'keyword.operator',
          'meta.brace',
          'punctuation.separator',
          'punctuation.terminator',
        ],
        settings: { foreground: c.ink_low },
      },
      /* the only rose in a code block, and it means what rose always means */
      {
        scope: ['invalid', 'invalid.illegal', 'markup.deleted'],
        settings: { foreground: c.rose },
      },
      {
        scope: ['markup.italic'],
        settings: { fontStyle: 'italic' },
      },
      {
        scope: ['markup.bold', 'markup.raw'],
        settings: { foreground: c.ink_hi },
      },
    ],
  }
}

export const proximaShikiDark = build('proxima-dark', 'dark', dark)
export const proximaShikiLight = build('proxima-light', 'light', light)
