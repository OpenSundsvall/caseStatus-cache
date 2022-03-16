import axios from 'axios';
import * as parser from 'fast-xml-parser';

async function getSingleErrand(errandID:string)
{
    var url = `${process.env.OPENE_URL}/api/instanceapi/getinstance/${errandID}/xml/`;
    var openEObj;

    try 
    {
        var response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/xml',
                'Authorization': 'Basic ' + process.env.OPENE_CREDENTIALS
            }
        });
        
        var cleanRes = response.data.toString('latin1');
        openEObj = parser.parse(cleanRes);
    } 
    catch (error)
    {
        console.error(error);
    }

    return openEObj;
}

export default getSingleErrand;