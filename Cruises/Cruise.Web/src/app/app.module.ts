import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http'
import {
  FormsModule,ReactiveFormsModule
} from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { AgGridModule } from 'ag-grid-angular';
import { SalesUnitDeatil } from './providers/salesUnitDetail.service';
import { RestApiService } from './providers/base.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { SalesUnit } from './sales-unit/sales-unit.component';
import { BookingDeatilComponent } from './bookings-Detail/bookings-body-component';

const appRoutes: Routes = [
  { path: '', component: SalesUnit, data: { title: 'Sales Units' } },
  { path: 'saleunits', component: SalesUnit, data: { title: 'Sales Unit' } },
  { path: 'Bookings', component: SalesUnit, data: { title: 'Bookings Details' } }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SalesUnit,
    BookingDeatilComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  providers: [RestApiService,SalesUnitDeatil],
  bootstrap: [AppComponent],
  entryComponents: [BookingDeatilComponent]
})
export class AppModule { }
