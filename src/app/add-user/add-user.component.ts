import { Component, OnInit } from '@angular/core';
import { APIService } from  '../api.service';
import { User } from '../user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private  users:  Array<User> = [];
  create_user_form: FormGroup;
  vaildMessage : string = "";
  addOrUpdate : string="Add";
  reverseSort: boolean =false;
  SortColumn : string ="first_name";

  constructor(private  apiService:  APIService, formBuilder: FormBuilder) { 
    this.create_user_form = formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      employee_id: ["", Validators.required],
      user_id:"",
      sort:"first_name",
      searchUserName:""
    }); 

  }

  sortTable(parm) {
    // you can use one of this solutions, but I recomend localeCompare
    // this.datas.sort((a, b)=>a[parm] > b[parm]);
    if(parm!='employee_id'){
    this.users.sort((a, b)=> a[parm].localeCompare(b[parm]) );
    }
    else
    {
      this.users.sort(function (a,b){ return a[parm]-b[parm];});
    }
    this.SortColumn=parm;

}

  ngOnInit() {
    this.getUsers();
  }

  deleteUser(user_id){
    this.vaildMessage = "User has been deleted successfully";
    this.apiService.deleteUser(user_id)
    .subscribe((user : User) => {
     console.log(user.first_name);
        // put values in the form
        
    });
  
  }
  viewUser(first_name,last_name,employee_id,user_id){
    alert("in view user"+first_name);

    this.create_user_form.patchValue({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      employee_id: employee_id,
    });

    this.addOrUpdate="Update";
  }

  updateUser(){
    alert("in Update user");
    console.log(this.create_user_form.value);
       // send data to server
       this.vaildMessage = "User has been updated successfully";
       this.apiService.updateUser(this.create_user_form.value)
           .subscribe(
                user => {
                   // show an alert to tell the user if product was created or not
                   console.log(user);
   
                   // go back to list of products
                   this.getUsers();
                },
                error => console.log(error)
            );
  }
  createUser(){
    alert("in create user");
    console.log(this.create_user_form.value);
       // send data to server
       this.vaildMessage = "User has been created successfully";
       this.apiService.createUser(this.create_user_form.value)
           .subscribe(
                user => {
                   // show an alert to tell the user if product was created or not
                   console.log(user);
   
                   // go back to list of products
                   this.getUsers();
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
