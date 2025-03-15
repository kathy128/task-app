import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main-task/main-task.module').then((m) => m.MainTaskModule),
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
