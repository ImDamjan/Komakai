import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAllRoles():Observable<Role[]>
  {
    const url = this.baseUrl + "/Role/getAll";
    return this.http.get<Role[]>(url);
  }
  constructor() { }
}
