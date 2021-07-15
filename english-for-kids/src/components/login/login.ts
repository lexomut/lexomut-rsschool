import { BaseComponent } from '../base-component';
import { BaseInputComponent } from '../Base-Input-Component';
import { CardFooterBtn, CardFooterBtnInterface } from './card-footer-btn';

export class Login extends BaseComponent {
  private fade: HTMLElement;

  private rootElement: HTMLElement;

  private username: BaseInputComponent;

  private password: BaseInputComponent;

  private footer: CardFooterBtn;

  constructor(rootElement:HTMLElement) {
    super('div', ['login-form']);
    console.log('login');
    this.fade = new BaseComponent('div', ['login-form__fade']).element;
    this.rootElement = rootElement;
    this.fade.append(this.element);
    this.element.innerText = 'Login';
    this.username = new BaseInputComponent('User name', ['login-input']);
    this.password = new BaseInputComponent('Password', ['login-input'], 'password');
    this.element.append(this.username.element);
    this.element.append(this.password.element);
    const loginFooterConfig:CardFooterBtnInterface = {
      styles: 'login__footer',
      btnNames: ['Cancel', 'Login'],
      btnFuncs: [this.cancelClick, this.loginClick],
    };
    this.footer = new CardFooterBtn(loginFooterConfig);
    this.element.append(this.footer.element);
  }

  loginClick = ():void => {
    this.rootElement.removeChild(this.fade);

    this.element.dispatchEvent(new Event('ok'));
  };

  cancelClick = ():void => {
    this.rootElement.removeChild(this.fade);

    this.element.dispatchEvent(new Event('cancel'));
  };

  authorization() {
    return new Promise(((resolve, reject) => {
      this.rootElement.append(this.fade);
      this.element.addEventListener('cancel', reject);
      this.element.addEventListener('ok', resolve);
    }));
  }
}
