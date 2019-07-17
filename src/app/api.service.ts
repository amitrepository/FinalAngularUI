import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL = 'http://localhost:8080/TaskManager';
  constructor(private  httpClient:  HttpClient) {}

  getTasks(){
    return this.httpClient.get(`${this.API_URL}/tasks`);
  }
getTaskByProject(projectName){
  return this.httpClient.get(`${this.API_URL}/getTasksByProject/`+projectName);
}
  createTask(task){
    
    return this.httpClient.post(`${this.API_URL}/tasks/addTask/`,task);
  }

  updateTask(task){
    
    return this.httpClient.post(`${this.API_URL}/updateTask/`,task);

}
  endTask(taskName){
    return this.httpClient.delete(`${this.API_URL}/deleteTask/`+ taskName);
  }

  readOneTask(taskName){
    return this.httpClient.get(`${this.API_URL}/getTask/`+ taskName);
  }

  getUsers(){
    return this.httpClient.get(`${this.API_URL}/fetchAllUsers`);
  }

  createUser(user){
        return this.httpClient.post(`${this.API_URL}/addUser/`,user);
  }

  updateUser(user){
    return this.httpClient.post(`${this.API_URL}/updateUser/`,user);
  }

  deleteUser(userId){
    return this.httpClient.get(`${this.API_URL}/deleteUser/`+ userId);
  }

  getProjects(){
    return this.httpClient.get(`${this.API_URL}/fetchAllProjects`);
  }

  createProject(project){
    return this.httpClient.post(`${this.API_URL}/addProject/`,project);
}
  updateProject(project){
    return this.httpClient.post(`${this.API_URL}/updateProject/`,project);
  }


  suspendProject(projectId){
    return this.httpClient.delete(`${this.API_URL}/suspendProject/`+ projectId);
  }
 
} 
