import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import {UpdateTaskComponent} from './update-task/update-task.component';
import {EndTaskComponent} from './end-task/end-task.component';
import {AddUserComponent} from './add-user/add-user.component';
import {AddProjectComponent} from './add-project/add-project.component';


const routes: Routes = [
    { path:  '', redirectTo:  'ViewTask', pathMatch:  'full' },
    {
        path:  'ViewTask',
        component:  ViewTaskComponent
    },
    {
        path:  'AddTask',
        component:  CreateTaskComponent
    },
    {
        path:'ViewTask/taskView/:taskName',
        component:UpdateTaskComponent
      },
      {
        path:'ViewTask/taskDelete/:taskName',
        component:EndTaskComponent
      },
      {
        path:  'AddUser',
        component:  AddUserComponent
    },
    {
        path:  'AddProject',
        component:  AddProjectComponent
    }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }