import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginData: any = {};
  dialogConfig: MatDialogConfig;
  constructor(private authService: AuthService, private matDialog: MatDialog, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  login() {
    console.log(this.authService.login(this.userLoginData));
    this.authService.login(this.userLoginData).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Failed to login');
    });
  }

  logout() {
    return this.authService.logout();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  isEmployee() {
    return this.authService.isEmployee();
  }

  openModal() {
    this.matDialog.open(RegisterComponent,  {
      height: '80%',
      width: '40%'
    });
  }
}
