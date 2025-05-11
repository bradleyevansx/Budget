using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    /// <inheritdoc />
    public partial class Income4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_incomes_users_user_id",
                table: "incomes");

            migrationBuilder.DropIndex(
                name: "IX_incomes_user_id",
                table: "incomes");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "incomes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "incomes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_incomes_user_id",
                table: "incomes",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_incomes_users_user_id",
                table: "incomes",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
