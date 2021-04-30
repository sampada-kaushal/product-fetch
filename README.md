# product-fetch

This API is written in node.js with database used as mongoDB, to fetch list of products from online shopping application. MongoDB is hosted via MongoDB Atlas.

## To run the server

npm start

## Usage

URL to access the API- https://product-fetch.herokuapp.com/api/v1/product
Endpoint- api/v1/product is used to get the product details from our database.

* To fetch all the products-

-> Request - https://product-fetch.herokuapp.com/api/v1/product

-> Response - Returns all the available products

* To fetch the products with applied gender and brand filters

-> Request - https://product-fetch.herokuapp.com/api/v1/product?gender=Men&brand=2GO

-> Response -
```JSON
{
    "status": "SUCCESSFUL",
    "message": "Successfully returned data",
    "products": [
        {
            "_id": "608c44c5f238cd13f8225aa4",
            "landingPageUrl": "Jackets/2GO/2GO-Black-Sporty-Jacket/1726589/buy",
            "productId": 1726589,
            "product": "2GO Black Sporty Jacket",
            "productName": "2GO Black Sporty Jacket",
            "rating": 0,
            "ratingCount": 0,
            "discount": 680,
            "brand": "2GO",
            "searchImage": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625708-2GO-Black-Sporty-Jacket-721486632625379-1.jpg",
            "effectiveDiscountPercentageAfterTax": 33,
            "effectiveDiscountAmountAfterTax": 558,
            "inventoryInfo": [
                {
                    "skuId": 12779422,
                    "label": "S",
                    "inventory": 128,
                    "available": true
                },
                {
                    "skuId": 12779423,
                    "label": "M",
                    "inventory": 210,
                    "available": true
                },
                {
                    "skuId": 12779424,
                    "label": "L",
                    "inventory": 226,
                    "available": true
                },
                {
                    "skuId": 12779425,
                    "label": "XL",
                    "inventory": 373,
                    "available": true
                },
                {
                    "skuId": 12779426,
                    "label": "XXL",
                    "inventory": 405,
                    "available": true
                }
            ],
            "sizes": "S,M,L,XL,XXL",
            "images": [
                {
                    "view": "default",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625708-2GO-Black-Sporty-Jacket-721486632625379-1.jpg"
                },
                {
                    "view": "search",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625708-2GO-Black-Sporty-Jacket-721486632625379-1.jpg"
                },
                {
                    "view": "left",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625605-2GO-Black-Sporty-Jacket-721486632625379-5.jpg"
                },
                {
                    "view": "back",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625664-2GO-Black-Sporty-Jacket-721486632625379-3.jpg"
                },
                {
                    "view": "front",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625689-2GO-Black-Sporty-Jacket-721486632625379-2.jpg"
                },
                {
                    "view": "right",
                    "src": "http://assets.myntassets.com/assets/images/1726589/2017/2/9/11486632625641-2GO-Black-Sporty-Jacket-721486632625379-4.jpg"
                }
            ],
            "gender": "Men",
            "primaryColour": "Black",
            "discountLabel": "Flat_Search_Percent",
            "discountDisplayLabel": "(40% OFF)",
            "additionalInfo": "Sporty Jacket",
            "category": "Jackets",
            "mrp": 1699,
            "price": 1019,
            "colorVariantAvailable": true,
            "discountType": "1",
            "catalogDate": "1486598400000",
            "season": "Summer",
            "year": "2017",
            "systemAttributes": []
        }
    ],
    "entries_per_page": 20,
    "total_results": 1
}
```

* To check the response if gender filter entered is improper

-> Request - https://product-fetch.herokuapp.com/api/v1/product?gender=wo44men

-> Response
```JSON
{
    "message": "Improper filter value"
}
```

* To check if user is entering correct page number or not

-> Request - https://product-fetch.herokuapp.com/api/v1/product?gender=women&page=-1

-> Response
```JSON
{
    "message": "Negative/ Zero value for page number is not allowed"
}
```

* To check if user is searching for some data that does not exist

-> Request - https://product-fetch.herokuapp.com/api/v1/product?brand=rado

-> Response
```JSON
{
    "status": "FAILED",
    "message": "Failed to return data",
    "products": [],
    "entries_per_page": 20,
    "total_results": 0
}
```
## Yet to be implemented

* Introduction of custom exceptions to handle validation failure.
* Filter merging.
* Creating get filter APIs.