import { Component } from '../../core/component';
import { ComponentConfig } from '../../core/componentConfig';
import './app-header.scss';

class NotFound extends Component {
  constructor(private config: ComponentConfig) {
    super(config);
  }
}
export const notFound = new NotFound({
  selector: 'app-not-found',
  template: `<div class="app-not-found">
<h2>страница не найдена</h2>
<a href="#"> перейти на главную</a>
</div>`,
});
