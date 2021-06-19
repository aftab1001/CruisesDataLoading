import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { GridOptions } from 'ag-grid-community';
import { SalesUnitDeatil } from '../providers/salesUnitDetail.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Message } from '../messages/message.component';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './bookings-body.html',
  styleUrls: ['./bookings-body-component.css']
})
export class BookingDeatilComponent  {
  modalTitle: string;
  bookingData:any;
  saleUnitId:number;
  startDate:any;
  endDate:any;
    model: string;
    modelChanged: Subject<string> = new Subject<string>();

  gridOptions: GridOptions={
    rowSelection:'single',
    enableSorting: true,
    enableFilter: true,
    enableColResize: true,
    animateRows: true,
    paginationAutoPageSize: false,
    paginationPageSize: 50,
    floatingFilter: true
  };
   
  columnDefs = [  
    
    {headerName: 'Booking-Id', field: 'bookingId',editable:true,width:300 },
    {headerName: 'Ship Name', field: 'shipName',width:300,editable:true },
    {headerName: 'Price', field: 'price',width:300,editable:true  },
    
];

rowData = [
  
];

  constructor(@Inject(MAT_DIALOG_DATA,
    ) public data: any,private _salesUnitService:SalesUnitDeatil,
    private _toastr: MatSnackBar
    ) {
    this.modalTitle = data.title;
    this.rowData =  data.bookingDetail;
    this.saleUnitId  = data.saleUnitId;
    this.startDate = data.startDate,
    this.endDate = data.endDate
    this.modelChanged.
    pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((val) => {
        this.getBookingsDetails(val.toString());
      })
  ).subscribe();
  }
  getBookingsDetails(searchTextValue:string)
  {
    this._salesUnitService.loadBookingDetailData(this.saleUnitId,this.startDate,this.endDate,searchTextValue)
    .subscribe((data: any) => {
      if (data) {
        this.rowData =  data;
      }
  }),  error => this.handleError(error);
  }
  changed(text: string) {
    this.modelChanged.next(text);
}
handleError(error): void {
  this._toastr.open(error,Message.Error.ServerError, {
    duration: 2000,
    panelClass: ['red-snackbar']
  });
}
}