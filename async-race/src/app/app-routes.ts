import { homePageComponent } from './pages/home-page';
import { tabsPageComponent } from './pages/tabs-page';
import { notFound } from './common/not-found';

export const appRoutes = [
  {
    path: '',
    component: homePageComponent,
  },
  {
    path: 'tabs',
    component: tabsPageComponent,
  },
  {
    path: '**',
    component: notFound,

  },
];
