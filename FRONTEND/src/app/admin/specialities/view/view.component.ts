import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  speciality = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  constructor(
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private http: HttpClient, private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSpecialityList();
    this.getshowspecialities();
  }

  getSpecialityList() {
    this.commonService.getSpeciality().subscribe(
      (data: any[]) => {
        this.speciality = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: ' modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

  editModal(template: TemplateRef<any>, special,spec_id) {
    localStorage.setItem('spec_id',spec_id);
    this.id = special.id;
    // this.name = data[0].speciality;
    // this.id = data[0].id;
    // this.key = data[0].key;
    this.modalRef = this.modalService.show(template, {
      class: ' modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, special,spec_id) {
    localStorage.setItem('spec_id',spec_id);
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    // let count = this.speciality.reverse()[0]['key'] + 1;
    // let id = this.speciality.reverse()[0]['id'] + 1
    // let params = {
    //   id : id,
    //   key : count,
    //   speciality : this.name
    // }
    // this.commonService.createSpeciality(params).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // })
    this.modalRef.hide();
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    // this.commonService.updateSpeciality(params,this.id).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // });
    this.modalRef.hide();
  }

  deleteSpeciality() {
    this.speciality = this.speciality.filter((a) => a.id !== this.id);
    this.commonService.deleteSpeciality(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getSpecialityList();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  showspecialities:any 
  getshowspecialities(){
    this.http.get("http://127.0.0.1:8000/api/admin/specialities/show").subscribe(result => {
      this.showspecialities = result;
    });
    console.log(this.showspecialities);
  }; 
  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }
  myForm = this.fb.group({
    libelle:[]
  })

  addspec()
  { 
    let form = new FormData();
    form.append("libelle",this.myForm.value.libelle);
    console.log(this.myForm.value.libelle);
     this.http.post("http://127.0.0.1:8000/api/admin/insertSpec",form).subscribe(result =>{
       console.log(result);
       this.showspecialities = result;
       
     });
  }

  editspec()
  { 
    let spec_id = localStorage.getItem('spec_id');
    let form = new FormData();
    form.append("libelle",this.myForm.value.libelle);
    form.append("spec_id",spec_id);
    console.log(this.myForm.value.libelle);
    console.log(spec_id);
     this.http.post("http://127.0.0.1:8000/api/admin/specialities/edit",form).subscribe(result =>{
       console.log(result);
       localStorage.removeItem('spec_id');
       this.showspecialities = result;

     });
  }
  deletespec()
  { 
    let spec_id = localStorage.getItem('spec_id');
    let form = new FormData();
    form.append("spec_id",spec_id);
    console.log(spec_id);
     this.http.post("http://127.0.0.1:8000/api/admin/specialities/delete",form).subscribe(result =>{
       console.log(result);
       localStorage.removeItem('spec_id');
       this.showspecialities = result;
       this.modalRef.hide();
     });
  } 
}
