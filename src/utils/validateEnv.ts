import { cleanEnv } from "../../node_modules/envalid/dist/envalid";
import { str } from "../../node_modules/envalid/dist/validators";
import { num } from "../../node_modules/envalid/dist/validators";

function validateEnv() {
    var env = cleanEnv(process.env, {
        OPENE_CREDENTIALS: str(),
        DB_HOST: str(),
        DB_PORT: num(),
        DB_USER: str(),
        DB_PASSWORD: str(),
        DB_DATABASE: str(),
        CLIENT_CREDENTIALS: str()
    });
    return env;
}

export default validateEnv;