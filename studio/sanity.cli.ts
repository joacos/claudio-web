import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vsc3ma0t',
    dataset: 'production'
  },
  vite: (config) => {
    return {
      ...config,
      base: '/studio/'
    }
  }
})
