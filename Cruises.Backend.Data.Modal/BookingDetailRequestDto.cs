using System;
using System.Collections.Generic;
using System.Text;

namespace Cruises.Backend.Data.Modal
{
   public class BookingDetailRequestDto
    {
        
       public Int64 SalesUnitId { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string SearchText { get; set; }
        
    }
}
