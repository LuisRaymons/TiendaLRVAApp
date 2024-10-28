import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const apiToken:string = localStorage.getItem("api_token") == null ? '' : localStorage.getItem("api_token")!;

  if(apiToken != ''){
    return true;
  } else{
    router.navigateByUrl("home");
    return false;
  }
};
