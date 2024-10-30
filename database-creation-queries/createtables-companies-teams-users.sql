CREATE TABLE Companies
(CompanyID int,
CompanyName varchar(40)
CONSTRAINT PK_CompanyID PRIMARY KEY (CompanyID)
)


CREATE TABLE Teams 
(TeamID int NOT NULL ,
TeamName varchar(40)NOT NULL ,
CompanyID int NOT NULL ,
CONSTRAINT PK_Teams PRIMARY KEY (TeamID),
CONSTRAINT FK_Companies FOREIGN KEY (CompanyID)
REFERENCES Companies (CompanyID)
)

CREATE TABLE Users
(UserID int NOT NULL AUTO_INCREMENT,
FullName varchar(60) NOT NULL,
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
    ActivityID int NOT NULL,
    ActivityName varchar(30) NOT NULL,
    CONSTRAINT PK_UserActivites PRIMARY KEY (UserID, ActivityID),
    CONSTRAINT FK_UserID FOREIGN KEY (UserID)
)