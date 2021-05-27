import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(!(!!localStorage.getItem("patient_id")))
      {
        this.router.navigateByUrl('/patients/start');
      }
  }

}
