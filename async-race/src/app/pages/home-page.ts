import { Component, Events } from '../../core/component';
import { ComponentConfig, ComponentInt } from '../../core/componentConfig';
import appState from '../app-state';
import { garage } from '../cars/garage';

class HomePageComponent extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
    console.log('7');
  }

  events = ():Events => ({ 'click .start-id1': 'onTabClick', 'click .button1': 'onTabClick1' });

  onTabClick = () => {
    console.log('кнопка нажата');
    garage.getCoutOfCars();
  };

  // onTabClick1 = () => {
  //   console.log('кнопка 2');
  //   this.car.startEngine();
  // };
}

export const homePageComponent: ComponentInt = new HomePageComponent({
  selector: 'app-home-page',
  template: '<h2 >home page</h2> <button class="button"> car</button> <button class="button1"> car1</button>',
});
