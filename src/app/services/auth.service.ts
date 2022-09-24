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
      }
      
    public auth(email: string, password: string): Observable<User>{
      return this.http.post<User>(`${this.apiServerUrl}/auth/login`, {email, password});
    }

  }