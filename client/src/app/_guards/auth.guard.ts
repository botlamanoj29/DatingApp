import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountservice:AccountService){}

  canActivate() : Observable<boolean>  {
      return this.accountservice.currentUser$.pipe(map(user => {
        if(user) return true;
        else{
          console.log("You shall not pass");
          return false;
        }
      } ))
    
  }
  
}
