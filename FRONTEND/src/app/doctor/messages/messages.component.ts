import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  message = '';
  text;
  constructor(
    private http: HttpClient,
    public router: Router,
    public commonSerivce: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.commonSerivce.nextmessage('chat');
  }

  ngOnDestroy() {
    this.commonSerivce.nextmessage('');
  }

  send() {
    this.http.post(this.SERVER_URL + '', {"message":this.message, "sender":this.user_id}).subscribe((res)=>{
      
    })
    
    this.message = ''
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

   user_id = localStorage.getItem('user_id');
   user_nom = localStorage.getItem('user_nom');
   user_prenom = localStorage.getItem('user_prenom');
}
