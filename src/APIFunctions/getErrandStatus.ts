import axios from 'axios';
import * as parser from 'fast-xml-parser';
import {ErrandStatus} from '../interfaces/errandStatus';

async function getErrandStatus(errandID:string)
{
    var url = `${process.env.OPENE_URL}/api/instanceapi/getstatus/${errandID}`;
    var jsonObj = {} as ErrandStatus;

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
        jsonObj = parser.parse(cleanRes);
    } 
    catch (error)
    {
        console.error(error);
    }

    return jsonObj;
}

export default getErrandStatus;