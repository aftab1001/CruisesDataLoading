import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { RestApiService } from './base.service';
import {ISalesUnitDetail} from '../modals/ISalesUnitDetail'
import { IBookingsDetails } from '../modals/IBookingsDetails';

@Injectable()
export class SalesUnitDeatil {

   apiUrl = '/api';
    constructor(private _service: RestApiService) { }

    public loadBookingSaluesUnitData = (startDate, endDate): Observable<any> => {

        const request =  <ISalesUnitDetail>{};
        request.startDate = startDate;
        request.endDate = endDate;
        return this._service.post(this.apiUrl + '/BookingsDetails/GetSalesUnitData', request);

    }

    public loadBookingDetailData = (salesUnitId,startDate,endDate,searchText): Observable<any> => {

        const request =  <IBookingsDetails>{};
        request.startDate = startDate;
        request.endDate = endDate;
        request.salesUnitId = salesUnitId;
        request.searchText = searchText;
        request.salesUnitId 
        return this._service.post(this.apiUrl + '/BookingsDetails/GetBookingDetailData', request);

    }


}
