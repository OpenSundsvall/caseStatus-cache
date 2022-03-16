import axios from 'axios';
import { json } from 'envalid';
import * as parser from 'fast-xml-parser';
import {OpenEFlowInstanceList} from '../interfaces/errandID';

const options = {
    arrayMode: /^FlowInstance$/
};

async function getErrandIds(familyID:string)
{
    console.log("Nu kom familyID " + familyID + " in");
    var url = `${process.env.OPENE_URL}/api/instanceapi/getinstances/family/${familyID}?fromDate=2021-11-01`;
    var jsonObj = {} as OpenEFlowInstanceList;

    try 
    {
        var response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/xml',
                'Authorization': 'Basic ' + process.env.OPENE_CREDENTIALS
            }
        });
        jsonObj = parser.parse(response.data, options);
    } 
    catch (error)
    {
        console.error(error);
    }

    return jsonObj;
}

export default getErrandIds;