CREATE TABLE Companies
(CompanyID int IDENTITY(1,1),
CompanyName varchar(40)
CONSTRAINT PK_CompanyID PRIMARY KEY (CompanyID)
)


CREATE TABLE Teams 
(TeamID int IDENTITY(1,1),
TeamName varchar(40)NOT NULL ,
CompanyID int NOT NULL ,
CONSTRAINT PK_Teams PRIMARY KEY (TeamID),
CONSTRAINT FK_Companies FOREIGN KEY (CompanyID)
REFERENCES Companies (CompanyID)
)

CREATE TABLE Users
(UserID int IDENTITY(1,1),
firstName varchar(25) NOT NULL,
lastName varchar(25) NOT NULL,
Username varchar(25) NOT NULL,
email varchar(25) NOT NULL ,
hashedpassword varchar(25) NOT NULL ,
TeamID int,
CONSTRAINT PK_UserID PRIMARY KEY (UserID),
CONSTRAINT FK_Teams FOREIGN KEY (TeamID)
REFERENCES Teams (TeamID)
)

CREATE TABLE CompanyActivities(
    CompanyID int NOT NULL, 
    ActivityID int IDENTITY(1,1),
    ActivityName varchar(30) NOT NULL,
	RepetitionsOrDuration int NOT NULL,
	Amount int NOT NULL,
	Completed BIT NOT NULL Default 'FALSE',
	ActivityDescription varchar(100),
    CONSTRAINT PK_CompanyActivites PRIMARY KEY (ActivityID),
    CONSTRAINT FK_CompanyID FOREIGN KEY (CompanyID) REFERENCES Companies (CompanyID),
	
)

CREATE TABLE TeamActivities(
    TeamID int NOT NULL, 
    ActivityID int IDENTITY(1,1),
    ActivityName varchar(30) NOT NULL,
	RepetitionsOrDuration int NOT NULL,
	Amount int NOT NULL,
	Completed BIT NOT NULL Default 'FALSE',
	ActivityDescription varchar(100),
	CompanyActivityID int,
    CONSTRAINT PK_TeamActivites PRIMARY KEY (ActivityID),
    CONSTRAINT FK_TeamID FOREIGN KEY (TeamID) REFERENCES Teams (TeamID),
	CONSTRAINT FK_CompanyActivityID FOREIGN KEY (CompanyActivityID) REFERENCES CompanyActivities (ActivityID)
)



CREATE TABLE UserActivities(
    UserID int NOT NULL, 
    ActivityID int IDENTITY(1,1),
    ActivityName varchar(30) NOT NULL,
	RepetitionsOrDuration int NOT NULL,
	Amount int NOT NULL,
	Completed BIT NOT NULL Default 'FALSE',
	ActivityDescription varchar(100),
	TeamActivityID int,
    CONSTRAINT PK_UserActivites PRIMARY KEY (ActivityID),
    CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES Users (UserID),
	CONSTRAINT FK_TeamActivityID FOREIGN KEY (TeamActivityID) REFERENCES TeamActivities (ActivityID)
)

ALTER TABLE Users
ADD isTeamLeader BIT Default 'False'

ALTER TABLE Users
ADD isCompanyLeader BIT Default 'False'

CREATE TABLE [dbo].[sessions](
    [sid] [nvarchar](255) NOT NULL PRIMARY KEY,
    [session] [nvarchar](max) NOT NULL,
    [expires] [datetime] NOT NULL
)
