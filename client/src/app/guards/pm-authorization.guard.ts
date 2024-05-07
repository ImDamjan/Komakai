import { CanActivateFn } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { inject } from '@angular/core';

export const pmAuthorizationGuard: CanActivateFn = (route, state) => {
  const jwt_Service = inject(JwtDecoderService);
  let token = jwt_Service.getToken();
  if(token!==null)
  {  
    let decode = jwt_Service.decodeToken(token);
    if(decode.role==="Project Manager")
      return true;
    else
      return false;
  }

  return true;
};
