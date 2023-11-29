var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const { data } = require('autoprefixer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT p.id, p.nombre, p.stock, p.precio, p.descripcion, c.nombres AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id ORDER BY p.id ASC',function(err,rows)     {
 
        if(err) {
            req.flash('error', err); 
            res.render('products/index',{data:''});
        } else {
            res.render('products/index',{data:rows});
        }

    });

});

module.exports = router;
