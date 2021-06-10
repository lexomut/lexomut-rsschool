import { Component } from '../../core/component';
import { ComponentConfig, ComponentInt } from '../../core/componentConfig';

class HomePageComponent extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }
}
export const homePageComponent:ComponentInt = new HomePageComponent({
  selector: 'app-home-page',
  template: '<h2>home page</h2>',
});
