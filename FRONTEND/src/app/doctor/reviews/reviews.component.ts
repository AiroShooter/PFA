import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
  }

}
