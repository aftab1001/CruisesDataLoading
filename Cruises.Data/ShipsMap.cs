using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace OA.Data
{
    public class ShipsMap : BaseEntity
    {
        public ShipsMap(EntityTypeBuilder<Ships> entityBuilder)
        {
            entityBuilder.HasKey(t => t.Id);
            entityBuilder.Property(t => t.Name).IsRequired();
            entityBuilder.Property(t => t.SalesUnitId).IsRequired();
            


        }
    }
}
