import getErrandIds from "../APIFunctions/getErrandList";
import getSingleErrand from '../APIFunctions/getSingleErrand';
import getPersonId from '../APIFunctions/getPersonID';
import getErrandStatus from '../APIFunctions/getErrandStatus';
import dbWriter from '../DAL/writeToDB';
import {PrivateOrOrganisation} from '../interfaces/privateOrOrganisation';

async function getErrandStatuses(familyID:string)
{
    let errandList;
    errandList = await getErrandIds(familyID);

    let thereIsAnyErrands:any = errandList.FlowInstances;

    if (thereIsAnyErrands !== "")
    {
        for (var i=0;i<errandList.FlowInstances.FlowInstance.length;i++)
        {
            let tempID = errandList.FlowInstances.FlowInstance[i].flowInstanceID.toString();
            let tempErrand = await getSingleErrand(tempID);
            
            let tempStatusObj = await getErrandStatus(tempID);

            let tempStatus = tempStatusObj.Status.name;
            let tempContentType = tempStatusObj.Status.contentType;
            let tempErrandType = tempErrand.FlowInstance.Header.Flow.Name;
            let tempSubmittedDate = errandList.FlowInstances.FlowInstance[i].firstSubmitted;
            let tempLatestStatusEdit = errandList.FlowInstances.FlowInstance[i].lastStatusChange;

            if (tempErrand.FlowInstance.Values)
            {   
                let privateOrOrganisationObj = {} as PrivateOrOrganisation;           
                privateOrOrganisationObj = await getPrivateOrOrganisation(familyID, tempErrand.FlowInstance.Values); 

                if (privateOrOrganisationObj.Type == "org")
                {
                    let tempOrgnr = privateOrOrganisationObj.Number.replace("-", "");
                    let dbRes = await dbWriter.stageCompanies(tempID, tempOrgnr, familyID, tempStatus, tempErrandType, tempContentType, tempSubmittedDate, tempLatestStatusEdit);
                    console.log(dbRes);
                }
                else
                {
                    let tempPersonNumber = privateOrOrganisationObj.Number.replace("-", "");
                    let tempPersonID = await getPersonId(tempPersonNumber);
                    let dbRes = await dbWriter.stagePrivate(tempID, tempPersonID, familyID, tempStatus, tempErrandType, tempContentType, tempSubmittedDate, tempLatestStatusEdit);
                    console.log(dbRes);
                }
            }
            else
            {
                let dbRes = await dbWriter.stageUnknown(tempID, familyID, tempStatus, tempErrandType, tempContentType, tempSubmittedDate, tempLatestStatusEdit);
                console.log(dbRes);
            }

        }
    }   
    
    return "Fetch errand statuses complete";
};

async function getPrivateOrOrganisation(familyID:string, openEObj:any)
{
    let returnObj = {} as PrivateOrOrganisation;
    let tempOrgnr = "";
    let tempPersonNumber = "";

    switch (familyID)
    {
        case process.env.NYBYGGNADSKARTA_ID:
            if (openEObj.clientEstablishment)
            {
                tempOrgnr = openEObj.clientEstablishment.OrganizationNumber;
                returnObj = {Type:"org",Number:tempOrgnr};
            }
            else
            {
                tempPersonNumber = openEObj.clientPrivate.SocialSecurityNumber;
                returnObj = {Type:"private",Number:tempPersonNumber};
            }
            break;

        case process.env.FORSELJNING_SERVERING_FOLKOL_ID:
            tempOrgnr = openEObj.company.Organisationsnummer;
            returnObj = {Type:"org",Number:tempOrgnr};
            break;

        case process.env.FORSELJNING_ECIGG_ID:
            console.log("Fösäljning e-cigg");
            console.log(openEObj);
            returnObj = {Type:"org",Number:"123456789"};
            break;

        case process.env.FORSELJNING_TOBAK_ID:
            if (openEObj.company)
            {
                tempOrgnr = openEObj.company.Organisationsnummer;
            }
            else
            {
                tempOrgnr = openEObj.chooseCompany.OrganizationNumber;
            }
            returnObj = {Type:"org",Number:tempOrgnr};
            break;
        
        case process.env.ANDRING_AVSLUT_FORSELJNING_TOBAK:
            if (openEObj.company)
            {
                tempOrgnr = openEObj.company.Organisationsnummer;
            }
            else
            {
                tempOrgnr = openEObj.chooseCompany.OrganizationNumber;
            }
            returnObj = {Type:"org",Number:tempOrgnr};
            break;

        case process.env.TIPS_BRISTER_HANDEL_TOBAK_ID:
            returnObj = {Type:"private",Number:"123456789"};
            break;

        case process.env.REGISTRERING_LIVSMEDELSANLAGGNING_ID:
            returnObj = {Type:"private",Number:"123456789"};
            break;

        case process.env.ANSOKAN_FORHANDSBESKED_ID:
            if (openEObj.type.Value == 'Privat')
            {
                tempPersonNumber = openEObj.applicant.SocialSecurityNumber;
                returnObj = {Type:"private",Number:tempPersonNumber};
            }
            else
            {
                if (openEObj.hasOwnProperty('applicant'))
                {
                    if (openEObj.companyType.Value == 'Juridisk person')
                    {
                        tempOrgnr = openEObj.applicant.applicantIdentifier;
                    }
                    else
                    {
                        tempOrgnr = openEObj.applicant.applicantIdentifier;
                    }
                }
                else
                {
                    tempOrgnr = "Saknas"
                }
                returnObj = {Type:"org",Number:tempOrgnr};
            }
    }

    return returnObj;
}

const eServiceCaller = {
    getErrandStatuses
};

export default eServiceCaller;