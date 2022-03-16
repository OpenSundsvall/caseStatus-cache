import axios from 'axios';
import {accessTokenData} from '../interfaces/accessTokenData';
import tokenStorage from '../utils/tokenStorage';

async function getToken()
{
    var url = `${process.env.WSO2_URL}/token`;  
    var accessObj = {} as accessTokenData;
    var responseMsg = "error";

    try 
    {
        var response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + process.env.CLIENT_CREDENTIALS
            },
            data: "grant_type=client_credentials"
        });

        accessObj = response.data;
        tokenStorage.setToken(accessObj.access_token);
        tokenStorage.setTokenTime(accessObj.expires_in - 10);
        responseMsg = "Token hämtad";
    } 
    catch (error)
    {
        console.error(error);
    }

    return responseMsg;
}

export default getToken;