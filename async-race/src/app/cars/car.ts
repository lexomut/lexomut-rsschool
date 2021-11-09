import { api } from '../../tools/api-utils';
import { carImg } from './svg';
import { Component } from '../../core/component';

export interface CarInterface {
  name: string,
  color: string,
  id: number,

}

export class Car {
  position: number;

  template: string;

  private color: string;

  private name: string;

  private id: number;

  private status: string;

  constructor(config: CarInterface) {
    this.color = config.color;
    this.name = config.name;
    this.id = config.id;
    this.status = 'stopped';
    this.position = 0;
    this.template = `<div>
<div>
    <button class=" select select-id${this.id}">select</button>
    <button class=" remove remove-id${this.id}">remove</button>
    <div class=" name name-id${this.id}">${this.name}</div>
  </div>
  <div
    <button class=" engine engine-id${this.id}">engine</button>
    <button class=" start start-id${this.id}">start</button>
  </div>
  <div
    <button class=" engine engine-id${this.id}">engine</button>
    <button class=" start start-id${this.id}">start</button>
  </div>
  <div>
  <div>
    <div class="car-${this.id}">${carImg}</div>  
     <div class="flag">🏁</div>  
  </div>
  <div class="track"></div>
</div>
</div>
    `;
  }

  render() {
    return this.template;
  }

  async startEngine() {
    if (this.status === 'started' || this.status === 'drive') return;
    const res = api.getApi({ method: 'GET', path: 'engine', options: [{ id: this.id }, { status: 'started' }] });
    await res.then((data) => {
      this.status = 'started';
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
    console.log(this.status);
  }

  async stopEngine() {
    if (this.status === 'stopped' || this.status === 'drive') return;
    const res = api.getApi({ method: 'GET', path: 'engine', options: [{ id: this.id }, { status: 'stopped' }] });
    await res.then((data) => {
      this.status = 'started';
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
    this.status = 'stopped';
    console.log(this.status);
  }

  async driveCar() {
    if (this.status === 'stopped' || this.status === 'drive') return;
    const res = api.getApi({ method: 'GET', path: 'engine', options: [{ id: this.id }, { status: 'drive' }] });
    await res.then((data) => {
      this.status = 'drive';
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
    console.log(this.status);
  }

  async deleteCar() {
    if (this.status === 'started' || this.status === 'stopped' || this.status === 'drive') return;
    const res = api.getApi({ method: 'DELETE', path: 'garage', options: [{ id: this.id }] });
    await res.then((data) => {
      this.status = 'DELETE';
      console.log('успешно', data);
    }, (status) => {
      console.log('не успешно', status);
    });
    console.log(this.status);
  }
}
