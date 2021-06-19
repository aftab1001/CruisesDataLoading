using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cruises.Backend.Data.Modal;
using Microsoft.AspNetCore.Mvc;
using OA.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cruises
{
    [ApiController]
    public class BookingsDetailsController : Controller
    {
        private readonly IBookingsDetails bookingDetailService;
        public BookingsDetailsController(IBookingsDetails _bookingDetailService)
        {

            this.bookingDetailService = _bookingDetailService;
        }
        [HttpPost]
        [Route("api/BookingsDetails/GetSalesUnitData")]
        public IEnumerable<BookingsSalesUnitResponseDto> Post(BookingSalesUnitDetailRequestDto request)
        {
            List<string> model = new List<string>();
            return bookingDetailService.GetBookingsSalesUnitByRange(request);

        }
        
        [HttpPost]
        [Route("api/BookingsDetails/GetBookingDetailData")]
        public ActionResult<List<BookingDetailResponseDto>> Post(BookingDetailRequestDto request)
        {
            List<string> model = new List<string>();
            return bookingDetailService.GetBookingsDetails(request);
        }

    }
}
