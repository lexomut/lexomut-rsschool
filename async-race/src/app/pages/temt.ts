import { Component, Events } from '../../core/component';
import { ComponentConfig, ComponentInt } from '../../core/componentConfig';

class Span extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }
}
export const span:ComponentInt = new Span({
  selector: 'span',
  template: '<span>dfsfsdf</span>',
});
