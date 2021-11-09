import { BaseComponent } from '../base-component';

export class FileLoadComponent extends BaseComponent {
  input: HTMLInputElement;

  file: File|undefined;

  filename: string;

  private name: string;

  private label: HTMLLabelElement;

  constructor(name:string) {
    super('div', ['file-load']);
    this.name = name;

    this.input = document.createElement('input');
    this.label = document.createElement('label');
    this.label.innerText = name;
    this.input.type = 'file';
    this.input.addEventListener('change', (e) => this.readFile(e));
    this.filename = '';
    this.element.append(this.label);
    this.label.append(this.input);
  }

  readFile(e:Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.file = file;
    this.filename = file.name;
    this.label.innerText = `${this.name} : ${this.filename}`;
  }
}
