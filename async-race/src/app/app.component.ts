import { Component } from '../core/component';
import { ComponentConfig } from '../core/componentConfig';

export class AppComponent extends Component {
  constructor(private config:ComponentConfig) {
    super(config);
  }
}
export const appComponent = new AppComponent({
  selector: 'body',
  template: '<app-header></app-header>',
});

