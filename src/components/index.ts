import type { App, Component } from "vue";

const globalComponents = import.meta.glob("./Pu*/index.vue", {
  eager: true,
}) as Record<string, { default: Component }>;

const globalModel = import.meta.glob("./PuModelComponent/M*/index.vue", {
  eager: true,
}) as Record<string, { default: Component }>;
export default function registerGlobalComponents(app: App) {
  Object.entries(globalComponents).forEach(([path, module]) => {
    const component = module.default;
    if (component.name) {
      app.component(component.name, component);
    } else {
      console.warn(`[Pu Component] ${path} is missing name property`);
    }
  });
  Object.entries(globalModel).forEach(([path, module]) => {
    const directive = module.default;
    if (directive.name) {
      app.component(directive.name, directive);
    } else {
      console.warn(`[Pu Model Component] ${path} is missing name property`);
    }
  });
}
