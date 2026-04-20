import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'claudio-web',
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
              title: 'Reorder Projects',
              id: 'reorder-projects'
            }),
            S.divider(),
            // Filter out the 'project' document type from the default list
            ...S.documentTypeListItems().filter(
              (item) => item.getSchemaType()?.name !== 'project' && item.getId() !== 'project'
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
