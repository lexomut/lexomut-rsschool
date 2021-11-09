import { Component } from '../../core/component';
import { ComponentConfig } from '../../core/componentConfig';
import './app-header.scss';

class AppHeader extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }
}
export const appHeader = new AppHeader({
  selector: 'app-header',
  template: `<div class="header">
<a href="#"><button class="header__button" id="to-garage">to garage</button></a>
<a href="#tabs"><button class="header__button" id="to-winners" >to winners"</button></a>
</div>`,
});
