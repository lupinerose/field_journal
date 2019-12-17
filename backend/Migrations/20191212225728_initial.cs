using Microsoft.EntityFrameworkCore.Migrations;

namespace BioField.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    ApplicationUserId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.ApplicationUserId);
                });

            migrationBuilder.CreateTable(
                name: "Journals",
                columns: table => new
                {
                    JournalsId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Journals", x => x.JournalsId);
                    table.ForeignKey(
                        name: "FK_Journals_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "ApplicationUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entries",
                columns: table => new
                {
                    EntriesId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    JournalsId = table.Column<int>(nullable: false),
                    DateTimeString = table.Column<string>(nullable: true),
                    Site = table.Column<string>(nullable: true),
                    Temperature = table.Column<int>(nullable: false),
                    Weather = table.Column<string>(nullable: true),
                    Wind = table.Column<string>(nullable: true),
                    Soil = table.Column<string>(nullable: true),
                    Observation = table.Column<string>(nullable: true),
                    UserApplicationUserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entries", x => x.EntriesId);
                    table.ForeignKey(
                        name: "FK_Entries_Journals_JournalsId",
                        column: x => x.JournalsId,
                        principalTable: "Journals",
                        principalColumn: "JournalsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entries_ApplicationUser_UserApplicationUserId",
                        column: x => x.UserApplicationUserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "ApplicationUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entries_JournalsId",
                table: "Entries",
                column: "JournalsId");

            migrationBuilder.CreateIndex(
                name: "IX_Entries_UserApplicationUserId",
                table: "Entries",
                column: "UserApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Journals_UserId",
                table: "Journals",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entries");

            migrationBuilder.DropTable(
                name: "Journals");

            migrationBuilder.DropTable(
                name: "ApplicationUser");
        }
    }
}
