import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit(): void {
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
  }

}
