import { BaseComponent } from '../base-component';
import appState from '../appState/appState';
import './settings.scss';

export class Settings extends BaseComponent {
  private sizeSelect:HTMLSelectElement;

  private categorySelect:HTMLSelectElement;

  constructor() {
    super('div', ['settings']);
    this.sizeSelect = document.createElement('select');
    this.categorySelect = document.createElement('select');
    this.sizeSelect.classList.add('select');
    this.categorySelect.classList.add('select');

    this.sizeSelect.addEventListener('change', () => {
      appState.sizeSetting = +this.sizeSelect.value;
    });
    this.categorySelect.addEventListener('change', () => {
      appState.category = this.categorySelect.value;
    });
    this.element.append(this.sizeSelect);
    this.element.append(this.categorySelect);
    this.sizeSelect.innerHTML = '<option value="8"> 4X4 </option><option value="18"> 6X6 </option><option value="32"> 8X8 </option>';
    this.categorySelect.innerHTML = '<option value="animal"> Animal </option><option value="socials"> socials </option>';
  }
}
