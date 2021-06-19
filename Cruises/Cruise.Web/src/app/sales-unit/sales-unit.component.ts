import { Component, OnInit, Inject } from '@angular/core';
import { SalesUnitDeatil } from '../providers/salesUnitDetail.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig,MatDatepicker } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { GridOptions } from 'ag-grid-community';
import { Message } from '../messages/message.component';
import { BookingDeatilComponent } from '../bookings-Detail/bookings-body-component';

@Component({
  selector: 'cruiseline-app',
  templateUrl: './sales-unit.component.html',
  styleUrls: ['./sales-unit.component.css']
})
export class SalesUnit implements OnInit {
salesUnitModal: any = {start_date: new Date("2016-01-01"),end_date: new Date("2016-03-31") };
bookingData:any;
searchString = '';
  startDate  = this.salesUnitModal.start_date;
  endDate =  this.salesUnitModal.end_date;
  gridOptions: GridOptions={
    rowSelection:'single',
    enableSorting: true,
    enableFilter: true,
    enableColResize: true,
    animateRows: true,
    paginationAutoPageSize: false,
    paginationPageSize: 50,
  };
  columnDefs = [
    
    {headerName: 'salesUnitId', field: 'salesUnitId', hide: true,editable:true,width:100 },
    {headerName: 'Sales Unit Name', field: 'salesUnitName',width:600,editable:true },
    {headerName: 'Total Price', field: 'totalPrice',width:600,editable:true  },
    
];

rowData = [
  
];
  constructor(private _salesUnitService:SalesUnitDeatil,
    private _dialog: MatDialog,
    private _toastr: MatSnackBar
    ) { }

  ngOnInit() {
    this.LoadSalesUnitData();
  }
public LoadSalesUnitData()
{
  if (new Date(this.startDate).valueOf() > new Date(this.endDate).valueOf()) {
    this._toastr.open(Message.Error.DateDiffError,"Date", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }
  else
  {
  this._salesUnitService.loadBookingSaluesUnitData(this.startDate,this.endDate)

    .subscribe((data: any) => {
      if (data) {
        this.rowData = data;
      }});
  }
}
/**
 *  This method will show Booking Detail when user click on sales unit
 */
public showBookingDetail (event:any) {
 
  var salesUnitId = event.data.salesUnitId;
  this.GetBookingDetail(salesUnitId);

}
public getSalesUnitDetail()
{
  this.LoadSalesUnitData();
}
public GetBookingDetail(salesUnitId:number)
{
  this._salesUnitService.loadBookingDetailData(salesUnitId,this.startDate,this.endDate,this.searchString)
  .subscribe((data: any) => {
    if (data) {
      this.ShowBookingDetailsInDialog(data,salesUnitId);
    }
}),
error => this.handleError(error);
}
public ShowBookingDetailsInDialog(bookingsData:any,salesUnitId:number)
{
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "840px"
    dialogConfig.data = {
        title: 'Booking Details',
        saleUnitId : salesUnitId,
        bookingDetail:bookingsData,
        startDate: this.startDate,
        endDate:this.endDate
    };
  
    this._dialog.open(BookingDeatilComponent, dialogConfig);

}
onGridReady(params) {
  let gridApi = params.api;
  gridApi.showLoadingOverlay()
  gridApi.setHeaderHeight(30);
}
startDateChange(startDate)
{

let selectedDate = new Date(startDate.value);
this.startDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' +  selectedDate.getFullYear();
}
endDateChange(endate)
{
  let selectedDate = new Date(endate.value);
  this.endDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' +  selectedDate.getFullYear();
}
handleError(error): void {
  this._toastr.open(error,Message.Error.ServerError, {
    duration: 2000,
    panelClass: ['red-snackbar']
  });
}
  
}







