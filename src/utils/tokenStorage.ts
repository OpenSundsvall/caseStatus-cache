import getWSO2Token from '../APIFunctions/getToken'

var token = "";
var tokenTime:Date = new Date();

async function getToken() {
    var currentTime = new Date();
    if (tokenTime != null && +currentTime < +tokenTime) {
        return token;
    }
    else {
        await getWSO2Token();
        return token;
    }
}

function setToken(inputToken:string) {
    token = inputToken;
}

async function getTokenTime() {
    return tokenTime;
}

function setTokenTime(seconds:number) {
    var d = new Date();
    tokenTime = new Date(d.getTime() + (seconds * 1000));
}

const tokenStorage = {
    getToken,
    setToken,
    setTokenTime
}

export default tokenStorage;