using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ProjectRolesSeeded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "project_role",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Project Manager" },
                    { 2, "Developer" },
                    { 3, "User" },
                    { 4, "Guest" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "project_role",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "project_role",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "project_role",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "project_role",
                keyColumn: "id",
                keyValue: 4);
        }
    }
}
