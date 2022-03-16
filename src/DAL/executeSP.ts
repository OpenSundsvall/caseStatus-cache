import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: process.env.DB_HOST, 
	port: parseInt(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 5
});

async function mergeIDTables()
{
    let conn;
	let resMessage:string = "error";
	let query = `
        CALL CaseStatusCache.MergeCaseStatusCache()
	`;
	try
	{
		conn = await pool.getConnection();
		let insertResponse = await conn.query(query);

		if (insertResponse.affectedRows > 0)
		{
			resMessage = "Merge complete!";
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

const executeSP = {
    mergeIDTables
};

export default executeSP;