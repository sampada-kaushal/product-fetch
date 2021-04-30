let products

export default class ProductsDAO {

    static async injectDB(conn) {
        if (products) {
            return;
        }
        try {
            products = await conn.db(process.env.PRODUCTS_DB).collection("products");
        }
        catch (e) {
            console.error(
                `Unable to establish connection in productsDAO ${e}`
            );
        }
    }

    static async getProducts({
        filters = null,
        page = 1,
        productsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("productName" in filters) {
                query = { $text: { $search: filters["name"] } };
            }

            if ("brand" in filters) {
                console.log("brand filter")
                query = { "brand": { $eq: filters["brand"] } };
            }

            if ("gender" in filters) {
                let input_gender = new RegExp("^" + filters["gender"] + "$", "i");
                console.log("Analysing gender filter inputted :- "+input_gender);
                query = { "gender": { $regex: input_gender } };

            }
        }

        let cursor

        try {
            console.log("Attempting to print query :- " + query);
            cursor = await products.find(query);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { productsList: [], totalNumProducts: 0 };
        }

        const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * (page - 1));

        try {
            const productsList = await displayCursor.toArray();
            const totalNumProducts = await products.countDocuments(query);
            return { productsList, totalNumProducts };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { productsList: [], totalNumProducts: 0 };
        }
    }
}