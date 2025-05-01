using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    /// <inheritdoc />
    public partial class Allocations3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "allocation_id",
                table: "transactions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_transactions_allocation_id",
                table: "transactions",
                column: "allocation_id");

            migrationBuilder.AddForeignKey(
                name: "FK_transactions_allocations_allocation_id",
                table: "transactions",
                column: "allocation_id",
                principalTable: "allocations",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_transactions_allocations_allocation_id",
                table: "transactions");

            migrationBuilder.DropIndex(
                name: "IX_transactions_allocation_id",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "allocation_id",
                table: "transactions");
        }
    }
}
