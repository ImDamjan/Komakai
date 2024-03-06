using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Izmena_Modela_User : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "surname",
                table: "users",
                newName: "password");

            migrationBuilder.AddColumn<string>(
                name: "lastname",
                table: "users",
                type: "varchar(45)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastname",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "users",
                newName: "surname");
        }
    }
}
