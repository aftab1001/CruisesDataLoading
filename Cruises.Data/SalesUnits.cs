using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OA.Data
{
    public class SalesUnits:BaseEntity
    {
      //  public Int64 Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Currency { get; set; }
        public ICollection<Ships> Ships { get; set; }

    }
}
