// Import main css
import '@/assets/style/index.scss'

// Import default layout so we don't need to import it to every page
import DefaultLayout from '@/layouts/Default.vue'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faGithub, faTwitter, faGitlab } from '@fortawesome/free-brands-svg-icons'

// Import FontAwesome here to make it available on every page
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false
library.add(faGithub, faTwitter, faGitlab)

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome', FontAwesomeIcon)
}
