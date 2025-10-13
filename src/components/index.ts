import type { App, Component }  from 'vue'

const globalComponents = import.meta.glob('./Pu*/index.vue', { eager: true }) as Record<string, { default: Component }>

export default function registerGlobalComponents(app: App) {
    Object.entries(globalComponents).forEach(([path, module]) => {
        const component = module.default

        if (component.name) {
            app.component(component.name, component)
        } else {
            console.warn(`[Pu Component] ${path} is missing name property`)
        }
    })
}
