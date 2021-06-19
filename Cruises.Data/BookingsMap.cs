using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OA.Data
{
    public class BookingsMap
    {
        public BookingsMap(EntityTypeBuilder<Bookings> entityBuilder)
        {
            entityBuilder.HasKey(t => t.Id);
            entityBuilder.Property(t => t.ShipId).IsRequired();
            entityBuilder.Property(t => t.BookingDate);
            entityBuilder.Property(t => t.Price).IsRequired();
          
            //entityBuilder.Property(t => t.Email).IsRequired();
            //entityBuilder.HasOne(t => t.UserProfile).WithOne(u => u.User).HasForeignKey<UserProfile>(x => x.Id);
        }
    }
}
