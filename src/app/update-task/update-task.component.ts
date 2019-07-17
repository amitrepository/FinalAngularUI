import { Component, OnInit,Input, Output, EventEmitter ,OnChanges  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { APIService } from  '../api.service';
import { Task } from '../task';
import { User } from '../user'; 
import { Project } from '../project';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnChanges  {

  update_task_form: FormGroup;
  //@Input() taskName;
  vaildMessage : string = "";
  private  users:  Array<User> = [];
  private projects: Array<Project>=[];



  constructor(private  apiService:  APIService, formBuilder: FormBuilder,private route:ActivatedRoute) {
    this.update_task_form = formBuilder.group({
      taskName: ["", Validators.required],
      priority: ["", Validators.required],
      parent_task_id: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date:["", Validators.required],
      project_id:["", Validators.required],
      userId:["", Validators.required],
      searchProjectName:"",
      searchUserName:""
    });
   }

  updateTask(){
    console.log(this.update_task_form.value);
   // this.update_task_form.value.taskName = this.taskName;
       // send data to server
       this.vaildMessage = "Task has been updated successfully";
       this.apiService.updateTask(this.update_task_form.value)
           .subscribe(
                task => {
                   // show an alert to tell the user if product was created or not
                   console.log(task);
   
                   // go back to list of products
                  // this.getTasks();
                },
                error => console.log(error)
            );
   }

  ngOnInit() {
    this.viewTask(this.route.snapshot.params.taskName);
    this.getUsers();
    this.getProjects();
  }

  viewTask(taskName:string)
{
  this.apiService.readOneTask(taskName)
  .subscribe((task : Task) => {
   console.log(task.taskName);
      // put values in the form
      this.update_task_form.patchValue({
        taskName: task.taskName,
        priority: task.priority,
        parent_task_id: task.parent_task_id,
        start_date: task.start_date,
        end_date: task.end_date,
        project_id:task.project_id,
        userId: task.userId
      });
  });


}  ngOnChanges(){
 
    // read one product record
    

}

public getUsers(){
  this.apiService.getUsers().subscribe((data:  Array<User>) => {
    this.users  =  data;
  //  this.headers=Object.keys(data[0] );
   // alert("Data "+data);
    console.log(data);
   // console.log(this.headers);
});
}
public getProjects(){
  this.apiService.getProjects().subscribe((data:  Array<Project>) => {
    this.projects  =  data;
  //  this.headers=Object.keys(data[0] );
   // alert("Data "+data);
    console.log(data);
   // console.log(this.headers);
});
}

populateTaskOwnerId(userId){
  alert("in view populateTaskOwnerId"+userId);
 console.log(this.update_task_form.value);
 this.update_task_form.patchValue({
        userId: userId
});
//this.closeModel();
$("#myModal .close").click();
}

populateProjectId(project_id){
  alert("in view populateProjectId"+project_id);
 console.log(this.update_task_form.value);
 this.update_task_form.patchValue({
  project_id: project_id
});
//this.closeModel();
$("#myModal1 .close").click();
}
}