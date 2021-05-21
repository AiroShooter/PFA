import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  showspecialities:any 
  getshowspecialities(){
    this.http.get("http://127.0.0.1:8000/api/admin/specialities/show").subscribe(result => {
      this.showspecialities = result;
    });
    console.log(this.showspecialities);
  }; 

}
