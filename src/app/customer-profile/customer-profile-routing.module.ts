import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:"",component:MainPageComponent,children:[
    {path:"",component:GeneralInformationComponent}
  ]},
  {path:"**",component:NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProfileRoutingModule { }
