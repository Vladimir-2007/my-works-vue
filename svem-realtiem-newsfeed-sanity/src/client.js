import {createClient} from '@sanity/client'

const sanity = createClient({
   projectId: '',
   dataset: '',
   useCdn: false,
   apiVersion: '',
})

export default sanity