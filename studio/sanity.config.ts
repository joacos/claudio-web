import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Claudio Gallardo Arq (MODS ACTIVE)',
  projectId: 'vsc3ma0t',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'project',
              S,
              context,
              title: 'Reorder Projects'
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'project'
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
