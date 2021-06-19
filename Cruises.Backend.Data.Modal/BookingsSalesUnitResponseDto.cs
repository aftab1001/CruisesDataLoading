using System;
using System.Collections.Generic;
using System.Text;

namespace Cruises.Backend.Data.Modal
{
   public class BookingsSalesUnitResponseDto
    {
        public long salesUnitId { get; set; }
        public string salesUnitName { get; set; }
        public double totalPrice { get; set; }
    }
}
