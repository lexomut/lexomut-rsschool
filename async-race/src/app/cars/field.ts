import { Car, CarInterface } from './car';
import { garage } from './garage';
import appState from '../app-state';
import { homePageComponent } from '../pages/home-page';

async function garageRender() {
  console.log('1')
  await garage.getCoutOfCars();
  const { cars } = garage;
  const field = cars.map((carConf) => new Car(carConf).render()).join('');
  homePageComponent.template = field;

return field;
}

export default garageRender;
