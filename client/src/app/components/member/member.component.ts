import { Component, Input } from '@angular/core';
import { Role } from '../../models/role';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  @Input() roles :Role[] = [];
  @Input() users : User[] = [];
}
