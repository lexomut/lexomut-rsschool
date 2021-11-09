import { BaseComponent } from '../base-component';
import './timer.css';
import appState from '../appState/appState';

export class Timer extends BaseComponent {
  private startTime = 0;

  private timerId = 0;

  private differentTime = '00:00';

  second:number;

  constructor() {
    super('div', ['timer']);
    this.element.innerText = this.differentTime;
    this.second = 0;
  }

  startTimer() :void {
    this.startTime = Date.now();
    this.timerId = window.setInterval(() => {
      const different: number = Date.now() - this.startTime;
      let seconds: string | number = parseInt(String((different / 1000) % 60), 10);
      let minutes: string | number = parseInt(String((different / (1000 * 60)) % 60), 10);

      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      seconds = (seconds < 10) ? `0${seconds}` : seconds;
      this.differentTime = `${minutes}:${seconds}`;
      this.element.innerText = this.differentTime;
      this.second = different / 1000;

      if (appState.stopGame) this.stopTimer();
    }, 1000);
  }

  stopTimer() {
    window.clearInterval(this.timerId);

    return this.differentTime;
  }
}
