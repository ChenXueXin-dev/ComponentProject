import { createPinia } from 'pinia'
 

const pinia = createPinia()

import { useMenuStore } from './modules/menuStore'
export { pinia, useMenuStore }
