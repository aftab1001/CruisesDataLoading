using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OA.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace OA.Repo
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
           
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            base.OnModelCreating(modelBuilder);
           
            new SalesUnitsMap(modelBuilder.Entity<SalesUnits>());
            new ShipsMap(modelBuilder.Entity<Ships>());
            new BookingsMap(modelBuilder.Entity<Bookings>());
            modelBuilder.Entity<SalesUnits>()
             .HasMany(c => c.Ships);
            modelBuilder.Entity<Ships>()
            .HasMany(c => c.Bookings)
            .WithOne(e => e.Ship).IsRequired();

           
            Assembly assembly = Assembly.GetExecutingAssembly();
            using (StreamReader r = new StreamReader(assembly.GetManifestResourceStream("Cruises.Repo.TrialDayData.json")))
            {
                var json = r.ReadToEnd();
              var  dataModal = JsonConvert.DeserializeObject<JsonModal>(json);

                modelBuilder.Entity<SalesUnits>().HasData(dataModal.SalesUnits);
                modelBuilder.Entity<Ships>().HasData(dataModal.Ships);
                modelBuilder.Entity<Bookings>().HasData(dataModal.Bookings);
             
            }

           
        }

        public DbSet<Bookings> Bookings { get; set; }
        public DbSet<SalesUnits> SalesUnits { get; set; }
        public DbSet<Ships> Ships { get; set; }
        
    }
}
