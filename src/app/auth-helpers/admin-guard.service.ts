import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()){
        this.router.navigate(['login']);
        return false;
    }
    else if(!this.auth.isAdmin()) {
      this.router.navigate([`profile`]);
      return false;
    }
    return true;
  }
}