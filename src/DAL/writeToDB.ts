import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: process.env.DB_HOST, 
	port: parseInt(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 5
});

async function stageCompanies(flowInstanceID:string, orgNumber:string, familyID:string, status:string, errandType:string, contentType:string, firstSubmitted:string, lastStatusChange:string)
{
	let conn;
	let resMessage:string = "error";
	let insertArray = [
		flowInstanceID,
		orgNumber,
		familyID,	
		status,
		errandType,
		contentType,
		firstSubmitted,
		lastStatusChange
	];
	let query = `
		INSERT INTO CaseStatusCache.StageCompanies
		(FlowInstanceID, OrganisationNumber, FamilyID, Status, ErrandType, ContentType, FirstSubmitted, LastStatusChange)
		VALUES(?,?,?,?,?,?,?,?);
	`;
	try
	{
		conn = await pool.getConnection();
		let insertResponse = await conn.query(query, insertArray);

		if (insertResponse.affectedRows > 0)
		{
			resMessage = "Insert complete";
		}
	}
	catch (err)
	{
		console.log(err);
	}
	finally
	{
		if (conn)
		{
			conn.release();
		}
		return resMessage;
	}
}

async function stagePrivate(flowInstanceID:string, personID:string, familyID:string, status:string, errandType:string, contentType:string, firstSubmitted:string, lastStatusChange:string)
{
	let conn;
	let resMessage:string = "error";
	let insertArray = [
		flowInstanceID,
		personID,
		familyID,		
		status,
		errandType,
		contentType,
		firstSubmitted,
		lastStatusChange
	];
	let query = `
		INSERT INTO CaseStatusCache.StagePrivate
		(FlowInstanceID, PersonId, FamilyID, Status, ErrandType, ContentType, FirstSubmitted, LastStatusChange)
		VALUES(?,?,?,?,?,?,?,?);
	`;
	try
	{
		conn = await pool.getConnection();
		let insertResponse = await conn.query(query, insertArray);

		if (insertResponse.affectedRows > 0)
		{
			resMessage = "Insert complete";
		}
	}
	catch (err)
	{
		console.log(err);
	}
	finally
	{
		if (conn)
		{
			conn.release();
		}
		return resMessage;
	}
}

async function stageUnknown(flowInstanceID:string, familyID:string, status:string, errandType:string, contentType:string, firstSubmitted:string, lastStatusChange:string)
{
	let conn;
	let resMessage:string = "error";
	let insertArray = [
		flowInstanceID,
		familyID,		
		status,
		errandType,
		contentType,
		firstSubmitted,
		lastStatusChange
	];
	let query = `
		INSERT INTO CaseStatusCache.StageUnknown
		(FlowInstanceID, FamilyID, Status, ErrandType, ContentType, FirstSubmitted, LastStatusChange)
		VALUES(?,?,?,?,?,?,?);
	`;
	try
	{
		conn = await pool.getConnection();
		let insertResponse = await conn.query(query, insertArray);

		if (insertResponse.affectedRows > 0)
		{
			resMessage = "Insert complete";
		}
	}
	catch (err)
	{
		console.log(err);
	}
	finally
	{
		if (conn)
		{
			conn.release();
		}
		return resMessage;
	}
}

const dbWriter = {
	stageCompanies,
	stagePrivate,
	stageUnknown
};

export default dbWriter;