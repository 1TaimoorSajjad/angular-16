import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/components/auth/service/auth.service';
@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  constructor(private authService: AuthService){

  }
  transform(value: any): string {
    return this.authService.staffComponentRoles[value];
  }
}
