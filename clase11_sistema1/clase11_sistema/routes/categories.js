var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const { data } = require('autoprefixer');

/* listar */
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM categorias ORDER BY id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err); 
            res.render('categories/index',{data:''});
        } else {
            res.render('categories/index',{data:rows});
        }

    });

});

/* formulario add */
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('categories/add', {
        nombres: ''      
    })
})


// agregar o insrtar en bd
router.post('/add', function(req, res, next) {    

    let nombres = req.body.nombres;
    let errors = false;

    if(nombres.length === 0) {
        errors = true;
        req.flash('error', "Please enter name");
        // render to add.ejs with flash message
        res.render('categories/add', {
            nombres: nombres
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombres: nombres
        }
        
        // insert query
        dbConn.query('INSERT INTO categorias SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('categories/add', {
                    name: form_data.nombres                 
                })
            } else {                
                req.flash('success', 'Categoria successfully added');
                res.redirect('/categories');
            }
        })
    }
})

// ver formulario editar 

router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM categorias WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Registro not found with id = ' + id)
            res.redirect('/categories')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('categories/edit', {
                id: rows[0].id,
                name: rows[0].nombres,
            })
        }
    })
})


module.exports = router;
