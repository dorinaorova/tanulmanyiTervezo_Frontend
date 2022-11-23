import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
  
    private apiServerUrl=environment.apiBaseUrl;
    
    constructor(private http: HttpClient) { 
    }
  
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('login');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
    }

    public isAuthenticated(){
      const token = localStorage.getItem('token');
      return token!=null;
    }

    public isAdmin(){
      const admin = localStorage.getItem('userRole');
      return admin=="admin"
    }
      
    public auth(email: string, password: string): Observable<User>{
      return this.http.post<User>(`${this.apiServerUrl}/auth/login`, {email, password});
    }

    public signUp(data: User){
      return this.http.post<User>(`${this.apiServerUrl}/auth/signup`, data);
  }

  }