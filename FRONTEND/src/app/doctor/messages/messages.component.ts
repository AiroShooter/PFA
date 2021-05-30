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
    
   

    if(this.isDoctor)
    {
     this.room_id = "room_" + this.user_id + this.us_id 
    }
    else{
     this.room_id  = "room_" + this.us_id +  this.user_id 
    }

    console.log(this.room_id)

    this.show()

    setInterval( ()=>{this.show()},1000);

   
  }

  

  ngOnDestroy() {
    this.commonSerivce.nextmessage('');
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  messages = []
  send() {

    if(this.message != '')
    { 
      this.http.post(this.SERVER_URL + 'messages/send', {"message":this.message, "receiver":this.us_id, "sender":this.user_id, "room_id":this.room_id}).subscribe((res)=>{
        this.show()
      })
    }
    this.message = ''
  }



  show()
  {
    this.http.post(this.SERVER_URL + 'messages/show', {"room_id":this.room_id}).subscribe((res:[])=>{
      this.messages = res;
    })

    console.log("shhshshs")
  }

  isDoctor = !!localStorage.getItem('patient_id');

   user_id=localStorage.getItem('user_id');
   us_id = localStorage.getItem('us_id');

   room_id
   us_nom = localStorage.getItem('us_nom');
   us_prenom = localStorage.getItem('us_prenom');
}
