using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OA.Data
{
    public class Bookings:BaseEntity
    {
      
        public Int64 ShipId { get; set; }
        public DateTime BookingDate { get; set; }
        
        public double Price { get; set; }
       public virtual Ships Ship { get; set; }
        
    }
}
