import { Module } from '../core/module';
import { appComponent } from './app.component';
import { ModuleConfig } from '../core/componentConfig';
import { appHeader } from './common/app-header';
import { appRoutes } from './app-routes';

class AppModule extends Module {
  constructor(private config:ModuleConfig) {
    super(config);
  }
}
export const appModule = new AppModule({
  components: [appHeader,
  ],
  boot: appComponent,
  routes: appRoutes,
});
