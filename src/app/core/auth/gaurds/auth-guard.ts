import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  //  check token 
  if(localStorage.getItem("token"))
    return true ;
  // +14 angular
  // navigate to the login page  
  return router.parseUrl('/login');
};
