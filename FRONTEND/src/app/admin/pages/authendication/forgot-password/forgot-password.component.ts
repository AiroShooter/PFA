import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('nom') == null)
      this.router.navigateByUrl('/admin/forgot-pass')
    else
      this.router.navigateByUrl('/admin/dashboard')
  }

}
