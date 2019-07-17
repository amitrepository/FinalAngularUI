import { Component, OnInit,Input, Output, EventEmitter ,OnChanges  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { APIService } from  '../api.service';
import { Task } from '../task';

@Component({
  selector: 'app-end-task',
  templateUrl: './end-task.component.html',
  styleUrls: ['./end-task.component.css']
})
export class EndTaskComponent implements OnInit {

  vaildMessage : string = "";
  constructor(private  apiService:  APIService, formBuilder: FormBuilder,private route:ActivatedRoute) { }

  ngOnInit() {
    this.endTask(this.route.snapshot.params.taskName)
  }

  endTask(taskName:string)
  {
    this.apiService.endTask(taskName)
    .subscribe((task : Task) => {
     console.log(task.taskName);
        // put values in the form
        
    });
  
  
  }
}
