GO
CREATE TRIGGER [createCompanyActivitiesForTeams]
ON CompanyActivities
AFTER INSERT
AS 
BEGIN 
	Declare @CompanyID int
	SELECT @CompanyID = CompanyID FROM inserted
	Declare	@ActivityID int 
	SELECT @ActivityID = ActivityID FROM inserted
	Declare @name varchar(30)
	SELECT @name = ActivityName FROM inserted
	Declare @reps int
	SELECT @reps = RepetitionsOrDuration FROM inserted
	Declare @amount int
	SELECT @amount = amount FROM inserted
	Declare @ActivityDescription varchar(100)
	SELECT @ActivityDescription = ActivityDescription FROM inserted
	
	declare @CompanyMemberstable table
	(
	TeamID int, 
    ActivityName varchar(30),
	RepetitionsOrDuration int ,
	Amount int,
	ActivityDescription varchar(100),
	CompanyActivityID int)

	INSERT INTO @CompanyMemberstable(TeamID)
	SELECT TeamID FROM Teams Where CompanyID = @CompanyID


	UPDATE @CompanyMemberstable
	SET
	ActivityName = @name,
	RepetitionsOrDuration = @reps,
	Amount = @amount,
	ActivityDescription = @ActivityDescription,
	CompanyActivityID = @ActivityID

	INSERT INTO TeamActivities (TeamID,ActivityName, RepetitionsOrDuration, Amount, ActivityDescription, CompanyActivityID)
	SELECT TeamID,ActivityName, RepetitionsOrDuration, Amount, ActivityDescription, CompanyActivityID FROM @CompanyMemberstable

END
