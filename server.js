const http = require("http");
const url = require("url");
const port = 8989;


let products = ['milk', 'eggs', 'cheese', 'pork', 'shrimp', 'chicken']
let foundProducts = [];


http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-type': 'text/html'
    })

    let path = url.parse(req.url, true); //this will parse the req.url into a URL object with each part of the address as a property
    let queryString = url.parse(req.url, true).query;

    console.log("QueryString Value: ", queryString)
    console.log("Path Name: " + path.pathname)

    if (path.pathname === "/profile") {
        res.write("This is the PROFILES page")
    } else if (path.pathname === "/products") {
        res.write("This is the PRODUCTS page")
        if (queryString.search) {
            foundProducts = products.filter(function (products) {
                return products == queryString.search;
            })

            if (foundProducts.length >= 1) {
                res.write("\nProduct Available")
            } else {
                res.write("\nProduct Not Available")
            }
        }
    } else if (path.pathname === "/cart") {
        res.write("This is the CART page")
    } else if (path.pathname === "/register") {
        res.write("This is the REGISTER page")
    } else if (path.pathname === "/login") {
        res.write("This is the LOGIN page")
    } else {
        res.write(req.url);
    }
    res.end();
}).listen(port);