import { Component, OnInit, Input, Output, OnChanges, EventEmitter  } from '@angular/core';
import { APIService } from  '../api.service';
import { Task } from '../task';
import { SmartTable} from 'angular-smart-table';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Project } from '../project';



@Component({
  selector: 'app-view-task',
  templateUrl: 'view-task.component.html',
  styleUrls: ['view-task.component.css'],
  
})
export class ViewTaskComponent implements OnInit {
  view_task_form: FormGroup;
  private  tasks:  Array<Task> = [];
  private headers: String[];
  private projects: Array<Project>=[];
  
  @Output() show_update_task_event = new EventEmitter();
  settings = {
    delete:{
     confirmDelete: true
    },
    add:{
      confirmCreate: true
     },
     edit:{
      confirmSave: true
     },
     mode:'external'
     ,
    columns: {
      taskName: {
        title: 'Task Name'
      },
      parent_task_id: {
        title: 'Parent Task Id'
      },
      priority: {
        title: 'Priority'
      },
      start_date: {
        title: 'Start Date'
      },
      end_date: {
        title: 'End Date'
      }
    }
  };

  constructor(private  apiService:  APIService,formBuilder: FormBuilder) { 

    this.view_task_form = formBuilder.group({
      projectName: ["", Validators.required],
      searchText:"",
      searchParent:"",
      searchPrior:"",
      searchStart:"",
      searchEnd:"",
      searchProjectName:""
       });
  }

  sortTable(parm) {
    // you can use one of this solutions, but I recomend localeCompare
    // this.datas.sort((a, b)=>a[parm] > b[parm]);
    if(parm=='start_date' || parm=='end_date'){
      this.tasks.sort(function(a,b){
      return new Date(a[parm]).getTime() - new Date(b[parm]).getTime() 
      });
    
    }
    else if (parm=="priority" || parm=="noOfCompTasks")
    {
      this.tasks.sort(function (a,b){ return a[parm]-b[parm];});
    }
    else{
      console.log(parm);
      this.tasks.sort((a, b)=> a[parm].localeCompare(b[parm]) );
    }
    console.log(this.tasks);
  }

  ngOnInit() {
 // this.getTasks();
 this.getProjects();
  }
onSaveConfirm(event){
  if (window.confirm('Are you sure you want to save?')) {
   // event.newData['name'] += ' + added in code';
   // event.confirm.resolve(event.newData);
  } else {
    event.confirm.reject();
  }
}



populateProjectId(projectName){
  alert("in view populateProjectId"+projectName);
 console.log(this.view_task_form.value);
 this.view_task_form.patchValue({
  projectName: projectName
});
//this.closeModel();
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
  public getTasks(){
    this.apiService.getTasks().subscribe((data:  Array<Task>) => {
      this.tasks  =  data;
      this.headers=Object.keys(data[0] );
     // alert("Data "+data);
      console.log(data);
      //console.log(this.headers);
  });
  
  }
  public getTasksByProject(){
    this.apiService.getTaskByProject(this.view_task_form.value.projectName).subscribe((data:  Array<Task>) => {
      this.tasks  =  data;
     // this.headers=Object.keys(data[0] );
     // alert("Data "+data);
      console.log(data);
      console.log(this.headers);
  });
  //$("#myModal1").modal('hide'); 
  $("#myModal1 .close").click();
  }
  updateTask(taskName){
    //alert("Data "+taskName);
    this.show_update_task_event.emit({
      taskName: taskName,
      title: "Update Task"
  });
  } 
  deleteTask(taskName){}

}
