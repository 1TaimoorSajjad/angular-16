import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/components/auth/service/auth.service';
@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  constructor(
    private authService: AuthService
  ) { }
  transform(value: any): string {
    return this.authService.accountStatus[value];
  }
}
