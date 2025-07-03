import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL:string='http://localhost:3333';


  constructor(private http:HttpClient) { }

  createSession(user:User):Observable<any>{
    return this.http.post(`${this.apiURL}/sessions`,user);
  }

  createUSer(user:User):Observable<any>{
    return this.http.post<User>(`${this.apiURL}/users`,user);
  }
}
