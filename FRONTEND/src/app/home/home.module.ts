import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    SlickCarouselModule,
    TooltipModule,
    HttpClientModule
  ],
})
export class HomeModule {}
