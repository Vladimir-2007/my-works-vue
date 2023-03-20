import {createClient} from '@sanity/client'

const sanity = createClient({
   projectId: '633pnnp7',
   dataset: 'production',
   useCdn: false,
   apiVersion: '2022-01-12',
})

export default sanity