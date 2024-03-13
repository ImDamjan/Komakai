using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class TeamUsersvezaV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_project_project_subproject",
                table: "project");

            migrationBuilder.DropIndex(
                name: "IX_project_subproject",
                table: "project");

            migrationBuilder.DropColumn(
                name: "subproject",
                table: "project");

            migrationBuilder.AddColumn<int>(
                name: "team_id",
                table: "project",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_project_team_id",
                table: "project",
                column: "team_id");

            migrationBuilder.AddForeignKey(
                name: "FK_project_team_team_id",
                table: "project",
                column: "team_id",
                principalTable: "team",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_project_team_team_id",
                table: "project");

            migrationBuilder.DropIndex(
                name: "IX_project_team_id",
                table: "project");

            migrationBuilder.DropColumn(
                name: "team_id",
                table: "project");

            migrationBuilder.AddColumn<int>(
                name: "subproject",
                table: "project",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_project_subproject",
                table: "project",
                column: "subproject");

            migrationBuilder.AddForeignKey(
                name: "FK_project_project_subproject",
                table: "project",
                column: "subproject",
                principalTable: "project",
                principalColumn: "id");
        }
    }
}
