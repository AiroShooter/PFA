import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  email:string = localStorage.getItem('email');

  users:any
  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  loadUsers()
  {
    this.http.get(this.SERVER_URL + 'users').subscribe(result => {
      this.users=result;
    });

    console.log(this.users);
  }
}
