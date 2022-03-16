import 'dotenv/config';
import validateEnv from "./utils/validateEnv";
import * as schedule from 'node-schedule';
import getToken from './APIFunctions/getToken';
import eServiceCaller from './EServiceCaller/eServiceCaller';
import executeSP from './DAL/executeSP';

validateEnv();

getToken()
    .then(x => console.log(x))
    .catch(err => console.error(err));

const job = schedule.scheduleJob('0 1 * * *', async() => {
    let startTime = new Date().toLocaleString('sv-SE');
    console.log("Starting import " + startTime);

    var nybyggnadskarta = await eServiceCaller.getErrandStatuses(process.env.NYBYGGNADSKARTA_ID);
    var serveringForseljningFolkol = await eServiceCaller.getErrandStatuses(process.env.FORSELJNING_SERVERING_FOLKOL_ID);
    var forseljningFolkol = await eServiceCaller.getErrandStatuses(process.env.FORSELJNING_TOBAK_ID);
    var andringAvslutForseljningTobak = await eServiceCaller.getErrandStatuses(process.env.ANDRING_AVSLUT_FORSELJNING_TOBAK);
    var databaseMerge = await executeSP.mergeIDTables();
    console.log(databaseMerge);
    
    let endTime = new Date().toLocaleString('sv-SE');
    console.log("Import completedc" + endTime);
});