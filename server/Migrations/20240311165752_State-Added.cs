using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class StateAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "project");

            migrationBuilder.AddColumn<int>(
                name: "state",
                table: "project",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "start",
                table: "assignment",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<float>(
                name: "percentage",
                table: "assignment",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTime>(
                name: "end",
                table: "assignment",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateTable(
                name: "state",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "varchar(40)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_state", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "state",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Not started" },
                    { 2, "Ready" },
                    { 3, "In Progress" },
                    { 4, "Blocked" },
                    { 5, "Done" },
                    { 6, "Cancelled" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_project_state",
                table: "project",
                column: "state");

            migrationBuilder.AddForeignKey(
                name: "FK_project_state_state",
                table: "project",
                column: "state",
                principalTable: "state",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_project_state_state",
                table: "project");

            migrationBuilder.DropTable(
                name: "state");

            migrationBuilder.DropIndex(
                name: "IX_project_state",
                table: "project");

            migrationBuilder.DropColumn(
                name: "state",
                table: "project");

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "project",
                type: "varchar(45)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "start",
                table: "assignment",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<int>(
                name: "percentage",
                table: "assignment",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "end",
                table: "assignment",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");
        }
    }
}
