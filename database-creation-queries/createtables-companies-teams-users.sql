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

CREATE TABLE UserActivites(
    UserID int NOT NULL, 
    ActivityID int IDENTITY(1,1),
    ActiviyName varchar(30) NOT NULL,
    CONSTRAINT PK_UserActivites PRIMARY KEY (UserID, ActivityID),
    CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES Users (UserID)
)