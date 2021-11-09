import { Component } from '../../core/component';
import { ComponentConfig } from '../../core/componentConfig';

class TabsPageComponent extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }
}
export const tabsPageComponent = new TabsPageComponent({
  selector: 'app-tabs-page',
  template: '<h2>tabs page</h2>',
});
