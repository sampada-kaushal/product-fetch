import { Console } from "console";

let genders

export default class GendersDAO {

    static async genderDBConnection(conn) {
        if (genders) {
            return;
        }
        try {
            genders = await conn.db(process.env.PRODUCTS_DB).collection("gender");
        }
        catch (e) {
            console.error(
                `Unable to establish connection in gendersDAO ${e}`
            );
        }
    }

    static async getPermissibleGenders(gender) {
        let query

        //Making regex for gender
        gender = new RegExp("^" + gender + "$", "i");
        query = { genderName: { $regex: gender } };
        console.log("Attempting to print :- " + query);
        let cursor

        try {

            cursor = await genders.find(query).toArray();

            //Checking if cursor array returns document from DB collechtion
            if (cursor != null && cursor.length > 0) {
                return true;
            }
            else {
                return false;
            }

        } catch (e) {
            console.error(`Unable to find genders, ${e}`);

        }


    }
}