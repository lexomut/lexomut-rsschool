import { CarInterface } from './car';
import { api } from '../../tools/api-utils';

export class Garage {
  private cars: CarInterface[];

  private coutOfCars: number;

  constructor() {
    this.cars = [];
    this.coutOfCars = 0;
  }

  getCoutOfCars = async () => {
    const res = api.getApi({ path: 'garage', options: [{ '': '' }] });
    await res.then((data) => {
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
  };
}
