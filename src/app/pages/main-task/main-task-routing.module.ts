import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainTaskComponent} from './main-task.component';


const routes: Routes = [
  {
    path:'',
    component: MainTaskComponent,
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainTaskRoutingModule { }
