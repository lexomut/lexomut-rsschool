import { CarInterface } from './car';
import { api } from '../../tools/api-utils';
 class Garage {
   cars: CarInterface[];

  private coutOfCars: number;

  constructor() {
    this.cars = [];
    this.coutOfCars = 0;

  }

  getCoutOfCars = async () => {
    const res = api.getApi({ method: 'GET', path: 'garage', options: [{ '': '' }] });
    await res.then((data:[]) => {
      console.log('успешно', data);
      this.cars = data;
    }, (status) => {
      console.log('не успешно', status);
    });
return this.cars;
  };

  carBuiding() {



  }
}

export const garage = new Garage()
