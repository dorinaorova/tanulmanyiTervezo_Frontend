import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public addUser(data: User){
        return this.http.post<User>(`${this.apiServerUrl}/user/add`, data);
    }

    public getUser(id: number) : Observable<User>{
        return this.http.get<User>(`${this.apiServerUrl}/user/find/${id}`);
    }

    public updateUser(data: User){
        return this.http.put<User>(`${this.apiServerUrl}/user/update`, data)
    }
}