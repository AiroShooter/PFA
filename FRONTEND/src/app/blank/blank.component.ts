import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  constructor(public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  users:any

  loadUsers()
  {
    this.commonService.getUsers().subscribe(result => {
      this.users = result;

     
    });

    console.log(this.users);
  }

}
