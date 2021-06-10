import { boot } from './core/boot';
import { appModule } from './app/app.module';
import { util } from './tools/util';
import {router} from "./tools/router";

util.delay(1000).then(() => {
  boot(appModule);
});
