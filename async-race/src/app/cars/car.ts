import { api } from '../../tools/api-utils';

export interface CarInterface {
  name: string,
  color: string,
  id: number,

}

export class Car {
  private color: string;

  private name: string;

  private id: number;

  private status: string;

  constructor(config: CarInterface) {
    this.color = config.color;
    this.name = config.name;
    this.id = config.id;
    this.status = 'stopped';
  }

  async startEngine() {
    if (this.status === 'started' || this.status === 'drive') return;
    const res = api.getApi({ path: 'engine', options: [{ id: '8' }, { status: 'started' }] });
    await res.then((data) => {
      this.status = 'started';
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
    console.log(this.status);
  }

  stopEngine() {
    if (this.status === 'stopped' || this.status === 'drive') return;
    this.status = 'stopped';
  }

  driveCar() {
    if (this.status === 'stopped' || this.status === 'drive') return;
    this.status = 'drive';
  }
}
