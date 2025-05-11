using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    /// <inheritdoc />
    public partial class Income2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_incomes_expected_incomes_expected_income_id",
                table: "incomes");

            migrationBuilder.AlterColumn<int>(
                name: "expected_income_id",
                table: "incomes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_incomes_expected_incomes_expected_income_id",
                table: "incomes",
                column: "expected_income_id",
                principalTable: "expected_incomes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_incomes_expected_incomes_expected_income_id",
                table: "incomes");

            migrationBuilder.AlterColumn<int>(
                name: "expected_income_id",
                table: "incomes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_incomes_expected_incomes_expected_income_id",
                table: "incomes",
                column: "expected_income_id",
                principalTable: "expected_incomes",
                principalColumn: "id");
        }
    }
}
