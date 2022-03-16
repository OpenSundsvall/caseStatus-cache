import axios from 'axios';
import tokenStorage from '../utils/tokenStorage';

async function getPersonId(personNumber:string)
{
    var url = `${process.env.WSO2_URL}/citizen/v1/person/${personNumber}/guid`;
    var personID:string;
    var token = await tokenStorage.getToken();

    try 
    {
        var response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        personID = response.data;

    } 
    catch (error)
    {
        console.error(error);
    }

    return personID;
}

export default getPersonId;