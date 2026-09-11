import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const role = localStorage.getItem('auth_role');
    // Block Approver from edit mode
    if (role === 'APPROVER') {
      alert('Access denied: You cannot edit contracts.');
      this.router.navigate(['/dashboard/contracts']);
      return false;
    }

    return true; // Admin or other roles allowed
  }
}
