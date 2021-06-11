using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CuentaVirtual.Helpers
{
    public class SqliteDataContext : DataContext
    {
        public SqliteDataContext(IConfiguration configuration) : base(configuration) { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // Conecta a la base de datos SQLite
            options.UseSqlite(Configuration.GetConnectionString("WebApiDatabase"));
        }
    }
}
