using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UbaceniPrioritetiitagovi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tags",
                table: "team");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "project",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "priority_id",
                table: "project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "team_tag",
                columns: table => new
                {
                    team_id = table.Column<int>(type: "INTEGER", nullable: false),
                    tag_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_team_tag", x => new { x.team_id, x.tag_id });
                    table.ForeignKey(
                        name: "FK_team_tag_tag_tag_id",
                        column: x => x.tag_id,
                        principalTable: "tag",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_team_tag_team_team_id",
                        column: x => x.team_id,
                        principalTable: "team",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "priority",
                columns: new[] { "id", "description", "level" },
                values: new object[,]
                {
                    { 1, "At risk", 4 },
                    { 2, "High", 3 },
                    { 3, "Medium", 2 },
                    { 4, "Low", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_project_priority_id",
                table: "project",
                column: "priority_id");

            migrationBuilder.CreateIndex(
                name: "IX_team_tag_tag_id",
                table: "team_tag",
                column: "tag_id");

            migrationBuilder.AddForeignKey(
                name: "FK_project_priority_priority_id",
                table: "project",
                column: "priority_id",
                principalTable: "priority",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_project_priority_priority_id",
                table: "project");

            migrationBuilder.DropTable(
                name: "team_tag");

            migrationBuilder.DropIndex(
                name: "IX_project_priority_id",
                table: "project");

            migrationBuilder.DeleteData(
                table: "priority",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "priority",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "priority",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "priority",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "description",
                table: "project");

            migrationBuilder.DropColumn(
                name: "priority_id",
                table: "project");

            migrationBuilder.AddColumn<string>(
                name: "tags",
                table: "team",
                type: "varchar(45)",
                nullable: false,
                defaultValue: "");
        }
    }
}
