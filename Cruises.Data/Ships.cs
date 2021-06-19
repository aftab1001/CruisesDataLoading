using System;
using System.Collections.Generic;
using System.Text;

namespace OA.Data
{
    public class Ships : BaseEntity
    {
        public string Name {get;set;}
        public Int64 SalesUnitId { get; set; }
        public virtual SalesUnits SalesUnit { get; set; }

        public ICollection<Bookings> Bookings { get; set; }

    }
}
