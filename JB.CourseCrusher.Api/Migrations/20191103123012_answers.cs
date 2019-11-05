using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JB.CourseCrusher.Api.Migrations
{
    public partial class answers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "Question");

            migrationBuilder.AddColumn<bool>(
                name: "IsMultipleChoice",
                table: "Question",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    AnswerId = table.Column<string>(nullable: true),
                    AnswerPhrase = table.Column<string>(nullable: true),
                    IsCorrect = table.Column<bool>(nullable: false),
                    QuestionID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Question",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionID",
                table: "Answer",
                column: "QuestionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropColumn(
                name: "IsMultipleChoice",
                table: "Question");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "Question",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
