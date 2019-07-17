import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';
import { APIService } from  '../api.service';
import { Task } from '../task';
import { User } from '../user'; 
import { Project } from '../project';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  create_task_form: FormGroup;

  private  tasks:  Array<Task> = [];
  vaildMessage : string = "";
  private  users:  Array<User> = [];
  private projects: Array<Project>=[];

  constructor(private  apiService:  APIService, formBuilder: FormBuilder) { 
   
    this.create_task_form = formBuilder.group({
      taskName: ["", Validators.required],
      priority: ["", Validators.required],
      parent_task_id: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date:["", Validators.required],
      project_id:["", Validators.required],
      userId:["", Validators.required],
      searchUserName: "",
      searchProjectName: ""
    });
  }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
  }

  createTask(){
 console.log(this.create_task_form.value);
    // send data to server
    this.vaildMessage = "Task has been created successfully";
    this.apiService.createTask(this.create_task_form.value)
        .subscribe(
             task => {
                // show an alert to tell the user if product was created or not
                console.log(task);

                // go back to list of products
                this.getTasks();
             },
             error => console.log(error)
         );
}

public getTasks(){
  this.apiService.getTasks().subscribe((data:  Array<Task>) => {
    this.tasks  =  data;
    alert("Data "+data);
    console.log(data);
});
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
 console.log(this.create_task_form.value);
 this.create_task_form.patchValue({
        userId: userId
});
//this.closeModel();
//$("#myModal").modal('hide'); 
$("#myModal .close").click();
}

populateProjectId(project_id){
  alert("in view populateProjectId"+project_id);
 console.log(this.create_task_form.value);
 this.create_task_form.patchValue({
  project_id: project_id
});
//this.closeModel();
//$("#myModal1").modal('hide'); 
$("#myModal1 .close").click();
}

}
