CREATE TABLE Companies
(CompanyID int,
CompanyName varchar(40)
CONSTRAINT PK_CompanyID PRIMARY KEY (CompanyID)
)


CREATE TABLE Teams 
(TeamID int,
TeamName varchar(40),
CompanyID int,
CONSTRAINT PK_Teams PRIMARY KEY (TeamID),
CONSTRAINT FK_Companies FOREIGN KEY (CompanyID)
REFERENCES Companies (CompanyID)
)

CREATE TABLE Users
(UserID int,
Username varchar(25),
email varchar(25),
hashedpassword varchar(25),
TeamID int,
CONSTRAINT PK_UserID PRIMARY KEY (UserID),
CONSTRAINT FK_Teams FOREIGN KEY (TeamID)
REFERENCES Teams (TeamID)
)