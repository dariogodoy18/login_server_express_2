const mysql = require('mysql')
const bcrypt = require('bcrypt')

module.exports = {
    //Signup functions routes
    getSignUp: function(req, res){
        return res.render('signup', {
            title: 'SignUp'
        })
    },

    postSignUp: function(req, res){
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        let user = {
            firs_name: req.body.firmName,
            email: req.body.email,
            password: password
        }
        const configdb = require('../database/configdb')
        let db = mysql.createConnection(configdb)
        db.connect()

        db.query('INSERT INTO users set?', user, function(err, rows, fields){
            if(err) throw err

            db.end()
        })
        req.flash('infoSuccess', 'It has been successfully redressed you can log in')
        res.redirect('/login')
    },

    //Login functions routes
    getLogin: function(req, res){
        return res.render('login', {
            title: 'login',
            message: req.flash('infoSuccess')
        })
    }

}