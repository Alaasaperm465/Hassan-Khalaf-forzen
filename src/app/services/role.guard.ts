import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRole = this.authService.getUserRole();
    if (userRole && requiredRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
