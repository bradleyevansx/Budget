using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    /// <inheritdoc />
    public partial class Income6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_expected_incomes_user_id",
                table: "expected_incomes",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_expected_incomes_users_user_id",
                table: "expected_incomes",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_expected_incomes_users_user_id",
                table: "expected_incomes");

            migrationBuilder.DropIndex(
                name: "IX_expected_incomes_user_id",
                table: "expected_incomes");
        }
    }
}
