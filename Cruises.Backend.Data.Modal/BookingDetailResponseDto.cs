using System;
using System.Collections.Generic;
using System.Text;

namespace Cruises.Backend.Data.Modal
{
   public class BookingDetailResponseDto
    {
        public long BookingId { get; set; }
        public string currency { get; set; }
        public double price { get; set; }
        public string ShipName { get; set; }
        public DateTime Date { get; set; }

       
    }
}
