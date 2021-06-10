import { Component, Events } from '../../core/component';
import { ComponentConfig, ComponentInt } from '../../core/componentConfig';

class HomePageComponent extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }

  events = ():Events => ({ 'click .button': 'onTabClick', 'click .button1': 'onTabClick1' });

  onTabClick = () => {
    console.log('кнопка нажата');
  };

  onTabClick1 = () => {
    console.log('кнопка 2');
  };
}
export const homePageComponent:ComponentInt = new HomePageComponent({
  selector: 'app-home-page',
  template: '<h2 >home page</h2> <button class="button"> car</button> <button class="button1"> car1</button>',
});
