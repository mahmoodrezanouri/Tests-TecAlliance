import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './apiservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  login(userName: string) {
    return this.checkUserValidity(userName);
  }

  lastLoginStatus() {
    let val: string = localStorage.getItem('isUserAuthenticated') || '';
    return val != null && val == 'true';
  }

  logout(): void {
    localStorage.removeItem('isUserAuthenticated');
  }

  private async checkUserValidity(userName: string) {
    let result = this.apiService.getUsersList();

    let users = await firstValueFrom(result);

    let checkResult = users.some(function (user: any) {
      return user.email == userName;
    });

    this.isUserAuthenticated.next(checkResult);
    this.updateLocalStorage(checkResult);

    return checkResult;
  }

  private updateLocalStorage(checkResult: boolean) {
    localStorage.setItem('isUserAuthenticated', checkResult ? 'true' : 'false');
  }
}
