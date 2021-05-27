import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from './../../common-service.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
	favourites:any = [];
  constructor(public commonService:CommonServiceService, private router:Router) { }

  ngOnInit(): void {
  	this.getFavourites();
    if(!(!!localStorage.getItem("patient_id")))
    {
      this.router.navigateByUrl('/patients/start');
    }
  }

  getFavourites() {
  	this.commonService.getFav()
  		.subscribe(res=>{
        this.favourites = res;
  		})
  }

  unfav(fav) {
    this.commonService.deleteFav(fav.id)
      .subscribe(res=>{
          this.getFavourites();
      })
  }

}
