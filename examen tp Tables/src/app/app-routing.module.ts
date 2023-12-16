import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableInformationComponent } from './table-information/table-information.component';

const routes: Routes = [
  {path:'', component: TableInformationComponent},
  {path:'student-info', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
