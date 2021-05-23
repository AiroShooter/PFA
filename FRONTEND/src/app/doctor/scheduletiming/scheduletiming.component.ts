import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-scheduletiming',
  templateUrl: './scheduletiming.component.html',
  styleUrls: ['./scheduletiming.component.css']
})
export class ScheduletimingComponent implements OnInit {


  DUR_DATA = ['15 min', '30 min', '45 min', '1 heure']

  SLOT_Dimanche: object[] = []
  SLOT_Lundi: object[] = []
  SLOT_Mardi: object[] = []
  SLOT_Mercredi: object[] = []
  SLOT_Jeudi: object[] = []
  SLOT_Vendredi: object[] = []
  SLOT_Samedi: object[] = []
  

  SLOT_DATA : string[]

  _15MIN = ['08:00 - 08:15', '08:15 - 08:30', '08:30 - 08:45', '08:45 - 09:00',
            '09:00 - 09:15', '09:15 - 09:30', '09:30 - 09:45', '09:45 - 10:00',
            '10:00 - 10:15', '10:15 - 10:30', '10:30 - 10:45', '10:45 - 11:00',
            '11:00 - 11:15', '11:15 - 11:30', '11:30 - 11:45', '11:45 - 12:00',
            '12:00 - 12:15', '12:15 - 12:30', '12:30 - 12:45', '12:45 - 13:00',
            '13:00 - 13:15', '13:15 - 13:30', '13:30 - 13:45', '13:45 - 14:00',
            '14:00 - 14:15', '14:15 - 14:30', '14:30 - 14:45', '14:45 - 15:00',
            '15:00 - 15:15', '15:15 - 15:30', '15:30 - 15:45', '15:45 - 16:00',
            '16:00 - 16:15', '16:15 - 16:30', '16:30 - 16:45', '16:45 - 17:00',
            '17:00 - 17:15', '17:15 - 17:30', '17:30 - 17:45', '17:45 - 18:00']

  _30MIN = ['08:00 - 08:30', '08:30 - 09:00',
            '09:00 - 09:30', '09:30 - 10:00',
            '10:00 - 10:30', '10:30 - 11:00',
            '11:00 - 11:30', '11:30 - 12:00',
            '12:00 - 12:30', '12:30 - 13:00',
            '13:00 - 13:30', '13:30 - 14:00',
            '14:00 - 14:30', '14:30 - 15:00',
            '15:00 - 15:30', '15:30 - 16:00',
            '16:00 - 16:30', '16:30 - 17:00',
            '17:00 - 17:30', '17:30 - 18:00']

  _45MIN =	[ '08:00 - 08:45', '08:45 - 09:30',
              '09:30 - 10:15', '10:15 - 11:00',
              '11:00 - 11:45', '11:45 - 12:30',
              '12:30 - 13:15', '13:15 - 14:00',
              '14:00 - 14:45', '14:45 - 15:30',
              '15:30 - 16:15', '16:15 - 17:00',
              '17:00 - 17:45']

  _1H = [	'08:00 - 09:00',
          '09:00 - 10:00',
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00' ]


  select: any;
  select2: any;
  jour: string = 'Lundi';
  constructor(private appComponnet: AppComponent,  private http: HttpClient) { }



  setLocalData(table: string[])
  {
    localStorage.setItem('SLOT-Dimanche', JSON.stringify(table));
    localStorage.setItem('SLOT-Lundi', JSON.stringify(table));
    localStorage.setItem('SLOT-Mardi', JSON.stringify(table));
    localStorage.setItem('SLOT-Mercredi', JSON.stringify(table));
    localStorage.setItem('SLOT-Jeudi', JSON.stringify(table));
    localStorage.setItem('SLOT-Vendredi', JSON.stringify(table));
    localStorage.setItem('SLOT-Samedi', JSON.stringify(table));

  }

  ngOnInit(): void {

    this.setLocalData(this._15MIN)

    this.SLOT_DATA = JSON.parse(localStorage.getItem('SLOT-' + this.jour));

    this.CheckDatabase(localStorage.getItem('Mid')
);

    if(!this.hours)  this.hours = this.SLOT_DATA[0].split(' - ', 2);

    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  checktime()
  {
    
  }

  dimanche(){
    this.jour = 'Dimanche';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  lundi(){
    this.jour = 'Lundi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  mardi(){
    this.jour = 'Mardi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  mercredi(){
    this.jour = 'Mercredi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  jeudi(){
    this.jour = 'Jeudi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  vendredi(){
    this.jour = 'Vendredi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  samedi(){
    this.jour = 'Samedi';
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  deleteDay()
  {
    this.deleteHoures(localStorage.getItem('Mid')
, this.jour);
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

  deleteAll()
  {
    this.deleteHouresAll(localStorage.getItem('Mid')
);
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
  }

 

  CheckVal(e: any){

    if(e == '15 min')
    {
      this.setLocalData(this._15MIN);
    }
    if(e == '30 min')
    {
      this.setLocalData(this._30MIN);
    }

    if(e == '45 min')
    {
      this.setLocalData(this._45MIN);
    }

    if(e == '1 heure')
    {
      this.setLocalData(this._1H);
    }

    this.SLOT_DATA = JSON.parse(localStorage.getItem('SLOT-' + this.jour));

    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)

   

  }


  SERVER_URL: string = 'http://127.0.0.1:8000/api/';


  selected : string

  hours : string[];



  CheckVal2(e: any){

   if(e)
   {
    this.selected = e;

    this.hours = this.selected.split(' - ', 2);

    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid')
)
   }
    
   
  }

  Send()
  {
    this.Add()
    
  }

  Add()
  {
 
    
    this.CheckDatabase(localStorage.getItem('Mid'))
    
   

    let data = new FormData();

    data.append('med_id', localStorage.getItem('Mid'));
    data.append('jour', this.jour);
    data.append('heureDebut', this.hours[0])
    data.append('heureFin', this.hours[1]);

    
    this.count(this.jour, this.hours[0],this.hours[1], localStorage.getItem('Mid'))
    if(localStorage.getItem('slot_count') == '0')
    {
      this.http.post(this.SERVER_URL + 'doctor/schedule', data).subscribe(res=>{

        this.CheckDatabase(data.get('med_id'))
      
      });
    }

    
   

  }

  chekckTime(time1:string, time2:string)
  {
   let n1 = ((parseInt(time1.substring(0,2)) * 60 ) +  parseInt(time1.substring(3,2)))
   let n2 = ((parseInt(time2.substring(0,2)) * 60 ) +  parseInt(time2.substring(3,2)))

   if(n1>n2) return false
   else return true
    
  }

 

  CheckDatabase(med_id)
  {
    this.http.post(this.SERVER_URL + 'doctor/schedule/check', {"med_id":med_id}).subscribe((res: string[]) => {
      res.forEach((element,index)=>{

        let id = parseInt(res[index]['calen_id']);
        let hour = res[index]['heureDebut'].substring(0,5)+ ' - ' + res[index]['heureFin'].substring(0,5);
        let data = {"hour":hour, "id":id}
        let jour = res[index]['jour']


        if(jour == 'Lundi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Lundi.length; i++)
          {
            if(this.SLOT_Lundi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Lundi.push(data);

        }

        if(jour == 'Mardi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Mardi.length; i++)
          {
            if(this.SLOT_Mardi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Mardi.push(data);

        }
        if(jour == 'Mercredi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Mercredi.length; i++)
          {
            if(this.SLOT_Mercredi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Mercredi.push(data);

        }
        if(jour == 'Jeudi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Jeudi.length; i++)
          {
            if(this.SLOT_Jeudi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Jeudi.push(data);

        }
        if(jour == 'Vendredi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Vendredi.length; i++)
          {
            if(this.SLOT_Vendredi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Vendredi.push(data);

        }
        if(jour == 'Samedi')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Samedi.length; i++)
          {
            if(this.SLOT_Samedi[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Samedi.push(data);

        }
        if(jour == 'Dimanche')
        {
         

         let x = 0;
          for(let i = 0; i < this.SLOT_Dimanche.length; i++)
          {
            if(this.SLOT_Dimanche[i]['hour'] == hour)
            {
              x++;
            }
          }

          if(x == 0) this.SLOT_Dimanche.push(data);

        }
        
    })})
     
  }

  deleteHoures(med_id, jour)
  {
    this.http.post(this.SERVER_URL + 'doctor/schedule/delete',{"med_id":med_id, "jour":jour}).subscribe((res:string) => {
      
  })
   
        if(jour == 'Lundi')
        {
          this.SLOT_Lundi = []
        }

        if(jour == 'Mardi')
        {
          this.SLOT_Mardi = []
        }
        if(jour == 'Mercredi')
        {
          this.SLOT_Mercredi = []
        }
        if(jour == 'Jeudi')
        {
          this.SLOT_Jeudi = []
        }
        if(jour == 'Vendredi')
        {
          this.SLOT_Vendredi = []
        }
        if(jour == 'Samedi')
        {
          this.SLOT_Samedi = []
        }
        if(jour == 'Dimanche')
        {
          this.SLOT_Dimanche = []
        }
  }


  deleteHouresAll(med_id)
  {
    this.http.post(this.SERVER_URL + 'doctor/schedule/deleteAll',{"med_id":med_id}).subscribe((res:string) => {
      
  })
   
          this.SLOT_Lundi = []
          this.SLOT_Mardi = []
          this.SLOT_Mercredi = []
          this.SLOT_Jeudi = []
          this.SLOT_Vendredi = []
          this.SLOT_Samedi = []
          this.SLOT_Dimanche = []
     
  }
  count(jr, hd, hf, id)
  {
 
    this.http.post(this.SERVER_URL + 'doctor/schedule/checkQuery',{"jour":jr, "heureDebut":hd, "heureFin":hf, "med_id":parseInt(id)}).subscribe((res: string) => {
      localStorage.setItem('slot_count',res);
    })

   
  }


  
  delete(calen_id)
  {
    this.http.post(this.SERVER_URL + 'doctor/schedule/deleteSingle',{"calen_id":calen_id}).subscribe((res:string) => {

      if(this.jour == 'Lundi')
        {
          this.SLOT_Lundi = []
        }

        if(this.jour == 'Mardi')
        {
          this.SLOT_Mardi = []
        }
        if(this.jour == 'Mercredi')
        {
          this.SLOT_Mercredi = []
        }
        if(this.jour == 'Jeudi')
        {
          this.SLOT_Jeudi = []
        }
        if(this.jour == 'Vendredi')
        {
          this.SLOT_Vendredi = []
        }
        if(this.jour == 'Samedi')
        {
          this.SLOT_Samedi = []
        }
        if(this.jour == 'Dimanche')
        {
          this.SLOT_Dimanche = []
        }
       

      this.CheckDatabase(localStorage.getItem('Mid'));

    })

   
  }


}
