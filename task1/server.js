const express = require('express')
const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization");
    res.header("Access-Control-Allow-Methods","PUT, GET, POST, OPTIONS, DELETE");
    next();
});

const PORT = parseInt(process.argv[2]) || 3001

// Generate 100,000+ records as an array of objects
const data = Array.from({ length: 100000 }, (_, index) => ({
    itemId: index + 1,
    name: `Item ${index + 1}`,
    value: Math.random() * 100
  }));

 /**
  * @param page req.query.page it represents which page to retrieve defaults to one
  * @param limit req.query.limit Represents maximum no of elements per page
  * 
  * @returns json-object with different set of data from data variable
  */
 app.get('/pagination', (req, res) => {
    let pageNumber = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 100;
    if(pageNumber < 1 || limit < 1) return res.status(400).send({
        message: 'Page number or limit of num of records should be atleast "1"'
    })
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
  
    res.status(200).send({
      data: data.slice(startIndex, endIndex),
      totalItems: data.length,
      currentPage: pageNumber,
      totalPages: Math.ceil(data.length / limit)
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });


