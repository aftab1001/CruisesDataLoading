using Cruises.Backend.Data.Modal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OA.Data;
using OA.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OA.Service
{
    public class BookingsDetailService : IBookingsDetails
    {
        private readonly IConfiguration _configuration;
        private string _connectionString;
        DbContextOptionsBuilder<ApplicationContext> _optionsBuilder;

        public BookingsDetailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
            _optionsBuilder.UseSqlServer(_connectionString);
        }

        public IEnumerable<BookingsSalesUnitResponseDto> GetBookingsSalesUnitByRange(BookingSalesUnitDetailRequestDto request)
        {
            try
            {
                using (ApplicationContext _context = new ApplicationContext(_optionsBuilder.Options))
                {
                    return _context.Bookings
                            .Include(bo => bo.Ship)
                                  .ThenInclude(s => s.SalesUnit).Where(b => b.BookingDate >= request.StartDate &&
                                  b.BookingDate <= request.EndDate).GroupBy(x => x.Ship.SalesUnit.Name).ToList()
                                 .Select(s => new BookingsSalesUnitResponseDto {salesUnitId = s.FirstOrDefault().Ship.SalesUnit.Id ,salesUnitName = s.Key, totalPrice = Convert.ToDouble(s.ToList().Sum(x => x.Price)) }); ;
                    
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<BookingDetailResponseDto> GetBookingsDetails(BookingDetailRequestDto request)
        {
            try
            {
                using (ApplicationContext _context = new ApplicationContext(_optionsBuilder.Options))
                {
                    if (request.SearchText != null && request.SearchText.Count() > 0)
                    {
                        return _context.Bookings
                                .Include(bo => bo.Ship)
                                      .ThenInclude(s => s.SalesUnit).Where(b => b.Ship.SalesUnit.Id == request.SalesUnitId &&
                                 (b.BookingDate >= request.StartDate && b.BookingDate <= request.EndDate)
                                 &&
                                 (b.Id.ToString().ToLower() == request.SearchText.ToLower()
                                 || b.Ship.Name.Contains(request.SearchText.ToLower()))).Select
                                 (
                                s => new BookingDetailResponseDto
                                {
                                    BookingId = s.Id,
                                    ShipName = s.Ship.Name,
                                    Date = s.BookingDate,
                                    price = s.Price,
                                    currency = s.Ship.SalesUnit.Currency
                                }).ToList();


                    }
                    else
                    {
                        return _context.Bookings
                             .Include(bo => bo.Ship).ThenInclude(s => s.SalesUnit).Where(b => b.Ship.SalesUnit.Id == request.SalesUnitId &&
                              (b.BookingDate >= request.StartDate && b.BookingDate <= request.EndDate)).Select
                              (
                             s => new BookingDetailResponseDto
                             {
                                 BookingId = s.Id,
                                 ShipName = s.Ship.Name,
                                 Date = s.BookingDate,
                                 price = s.Price,
                                 currency = s.Ship.SalesUnit.Currency
                             }).ToList();
                    }
                }
            }
            catch(Exception ex)
            {
                throw;
            }
        }

    }
}
