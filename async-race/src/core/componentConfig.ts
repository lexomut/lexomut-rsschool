export interface ComponentConfig {
  template: string,
  selector: string,

}
export interface ModuleConfig {
  components:{ render:()=>void }[],
  boot: { render:()=>void },
  routes: { path: string, component: ComponentInt } [],
}
export interface ComponentInt {
  template: string,
  selector: string,
  render: () => void;

}
