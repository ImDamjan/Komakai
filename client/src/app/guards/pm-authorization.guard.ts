import { CanActivateFn, Router } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { inject } from '@angular/core';

export const pmAuthorizationGuard: CanActivateFn = (route, state) => {
  const jwt_Service = inject(JwtDecoderService);
  const router = inject(Router);
  let token = jwt_Service.getToken();
  if(token!==null)
  {  

    let decode = jwt_Service.decodeToken(token);
    if(decode.role==="Project Manager")
      return true;
    else if (decode.role==="Admin")
    {
      router.navigate(['/admin'])
      return false;
    }
    else
    {
      if(route.url[0].path === 'dashboard')
      {
          router.navigate(['/projects'])
          return false;
      }
      else
        return true;
    }
  }

  return true;
};
