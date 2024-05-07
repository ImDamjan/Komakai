import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';

export const adminAuthorizationGuard: CanActivateFn = (route, state) => {
  const jwt_Service = inject(JwtDecoderService);
  let token = jwt_Service.getToken();
  if(token!==null)
  {  
    let decode = jwt_Service.decodeToken(token);
    if(decode.role==="Admin")
      return true;
    else
      return false;
  }

  return true;
};
