import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from './../data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminGuard } from './admin.guard';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AdminComponent, SidemenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    InMemoryWebApiModule.forRoot(DataService),
    ModalModule.forRoot(),
    HttpClientModule,
    
  ],
  providers:[AdminGuard]
})
export class AdminModule {}
