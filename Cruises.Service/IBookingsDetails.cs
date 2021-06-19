using Cruises.Backend.Data.Modal;
using OA.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OA.Service
{
    public interface IBookingsDetails
    {
        IEnumerable<BookingsSalesUnitResponseDto> GetBookingsSalesUnitByRange(BookingSalesUnitDetailRequestDto request);
        List<BookingDetailResponseDto> GetBookingsDetails(BookingDetailRequestDto request);
    }
}
