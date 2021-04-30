import ProductsDAO from "../dao/product.js";
import GendersDAO from "../dao/gender.js";

export default class ProductsController {
    static async apiGetProducts(req, res, next) {
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        let apiStatus = "";
        let statusMessage = "";

        if (page <= 0) {
            return res.json({ message: 'Negative/ Zero value for page number is not allowed' });
        }

        let filters = {}
        if (req.query.brand) {
            filters.brand = req.query.brand;
        } else if (req.query.gender) {
            if (await GendersDAO.getPermissibleGenders(req.query.gender)) {
                filters.gender = req.query.gender;
                console.log("Permissible gender filter returned correctly :- " + filters.gender);
            }
            else {
                return res.json({ message: 'Improper filter value' });
            }
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        console.log(filters);
        const { productsList, totalNumProducts } = await ProductsDAO.getProducts({
            filters,
            page,
            productsPerPage
        });

        //Checking if total number of products returned is 0 or not
        if (totalNumProducts == 0) {
            apiStatus = 'FAILED';
            statusMessage = 'Failed to return data'
        }
        else {
            apiStatus = 'SUCCESSFUL';
            statusMessage = 'Successfully returned data';
        }

        let response = {
            status: apiStatus,
            message: statusMessage,
            products: productsList,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts
            // page: page,
            // filters: filters,
        };
        return res.json(response);
    }
}
