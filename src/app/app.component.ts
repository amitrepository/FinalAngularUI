import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capsule-project';
    task_name;
    show_update_task_html=false;
    show_read_task_html=true;

  // show the 'update product form'
showUpdateProduct($event){
 
  // set title and product ID
  this.title=$event.title;
  this.task_name=$event.task_name;

  // hide all html then show only one html
  this.hideAll_Html();
  this.show_update_task_html=true;
}

hideAll_Html(){
  this.show_read_task_html=false;
 
  this.show_update_task_html=false;
}
}
