import { Component, OnInit, ViewChild,ElementRef,Input} from '@angular/core';
import { APIService } from  '../api.service';
import { Project } from '../project';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user'; 
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  private  projects:  Array<Project> = [];
  create_project_form: FormGroup;
  vaildMessage : string = "";
  addOrUpdate : string="Add";
  showRowTextBox : boolean =true;
  private  users:  Array<User> = [];
  @ViewChild('myModal') myModal:any;
  display='none';
  @Input ('show-modal') showModal: boolean;


  constructor(private  apiService:  APIService, formBuilder: FormBuilder) {
    this.create_project_form = formBuilder.group({
      projectName: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      priority: ["", Validators.required],
      userId: ["", Validators.required],
      project_id:"",
      showDate:"",
      searchProjectName:""
    });

   }

   openModel() {
    this.myModal.className = 'modal fade show';
  }
  closeModel() {
    // this.myModal.className = 'modal hide';
    $("#myModal .close").click();
   this.display='none';
   this.showModal = false;
  }
 

clearForm(){
  this.create_project_form.patchValue({
    project_id: "",
    projectName: "",
    start_date: "",
    end_date: "",
    priority:"",
    userId: ""
});
}


sortTable(parm) {
  alert(parm);
  // you can use one of this solutions, but I recomend localeCompare
  // this.datas.sort((a, b)=>a[parm] > b[parm]);
  if(parm=='start_date' || parm=='end_date'){
    this.projects.sort(function(a,b){
    return new Date(a[parm]).getTime() - new Date(b[parm]).getTime() 
    });
  
  }
  else if (parm=="priority" || parm=="noOfCompTasks")
  {
    this.projects.sort(function (a,b){ return a[parm]-b[parm];});
  }
  else{
    this.projects.sort((a, b)=> a[parm].localeCompare(b[parm]) );
  }
  
}
  ngOnInit() {
    this.getProjects();
    this.getUsers();
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

populateManagerId(userId){
  alert("in view populateManagerId"+userId);
  this.create_project_form.patchValue({
        userId: userId
});
this.closeModel();
//event.preventDefault();
}

  viewProject(project){
    alert("in view viewProject"+project.projectName);
      this.create_project_form.patchValue({
        project_id: project.project_id,
        projectName: project.projectName,
        start_date: project.start_date,
        end_date: project.end_date,
        priority:project.priority,
        userId: project.userId
    });

    this.addOrUpdate="Update";
  }

  createProject(){
    alert("in create projects");
    console.log(this.create_project_form.value);
       // send data to server
       this.vaildMessage = "Project has been created successfully";
       this.apiService.createProject(this.create_project_form.value)
           .subscribe(
                project => {
                   // show an alert to tell the user if product was created or not
                   console.log(project);
   
                   // go back to list of products
                   this.getProjects();
                },
                error => console.log(error)
            );
   }
   

suspendProject(project_id){
  this.vaildMessage = "Project has been suspended successfully";
  this.apiService.suspendProject(project_id)
  .subscribe((project : Project) => {
   console.log(project.projectName);
      // put values in the form
      
  });

}

   updateProject(){
    alert("in Update project");
    console.log(this.create_project_form.value);
       // send data to server
       this.vaildMessage = "Project has been updated successfully";
    console.log(this.create_project_form.value);
       this.apiService.updateProject(this.create_project_form.value)
           .subscribe(
                project => {
                   // show an alert to tell the user if product was created or not
                   console.log(project);
   
                   // go back to list of products
                   this.getProjects();
                },
                error => console.log(error)
            );
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
}
