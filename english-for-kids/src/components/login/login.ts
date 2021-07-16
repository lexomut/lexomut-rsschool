import { BaseComponent } from '../base-component';
import { BaseInputComponent } from '../Base-Input-Component';
import { CardFooterBtn, CardFooterBtnInterface } from './card-footer-btn';
import loginHash from '../../data/loginHash';
import { sendLogin } from '../../module/request';
import { dispatchMouseClickOnMenu } from '../../store/actions';

export class Login extends BaseComponent {
  private fade: HTMLElement;

  private rootElement: HTMLElement;

  private username: BaseInputComponent;

  private password: BaseInputComponent;

  private footer: CardFooterBtn;

  constructor(rootElement: HTMLElement) {
    super('div', ['login-form']);
    console.log('login');
    this.fade = new BaseComponent('div', ['login-form__fade']).element;
    this.rootElement = rootElement;
    this.fade.append(this.element);
    this.element.innerText = 'Login';
    this.username = new BaseInputComponent('User name', ['login-input']);
    this.password = new BaseInputComponent('Password', ['login-input'], 'password');
    this.username.input.placeholder = 'admin';
    this.password.input.placeholder = 'admin';
    this.element.append(this.username.element);
    this.element.append(this.password.element);
    this.username.input.onkeypress = (e) => { if (e.keyCode === 13)e.preventDefault(); };
    this.password.input.onkeypress = (e) => { if (e.keyCode === 13)e.preventDefault(); };
    const loginFooterConfig: CardFooterBtnInterface = {
      styles: 'login__footer',
      btnNames: ['Cancel', 'Login'],
      btnFuncs: [this.cancelClick, this.loginClick],
    };
    this.footer = new CardFooterBtn(loginFooterConfig);
    this.element.append(this.footer.element);
  }

  loginClick = (): void => {
    this.rootElement.removeChild(this.fade);

    this.element.dispatchEvent(new Event('ok'));
  };

  cancelClick = (): void => {
    this.rootElement.removeChild(this.fade);

    this.element.dispatchEvent(new Event('cancel'));
  };

  authorization() {
    return new Promise(((resolve, reject) => {
      this.rootElement.append(this.fade);
      this.element.addEventListener('cancel', reject);
      this.element.addEventListener('ok', async () => {
        this.send().then(() => { resolve(''); }, (e) => {
          alert(e);
          dispatchMouseClickOnMenu('Home');
          reject();
        });
      });
    }));
  }

  send() {
    return sendLogin(this.username.input.value, this.username.input.value).then((hash) => {
      localStorage.setItem('hash', hash);
    });
  }
}
