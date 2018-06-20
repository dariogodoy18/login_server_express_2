const localStrategy = require('passport-local').Strategy
const mysql = require('mysql')
const bcrypt = require('bcrypt')


module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((objUser, done) => {
        done(null, objUser)
    })

    passport.use(new localStrategy({
        passReqToCallback: true  
    }, (req, email, password, done) =>{
        const configdb = require('../database/configdb') 
        db = mysql.createConnection(configdb)
        db.connect()

        db.query('SELECT * FROM users WHERE email = ?', email, (err, row, fields) =>{
            if(err) throw err

            db.end()

            if(row.length > 0){
                const user = row[0]

                if(bcrypt.compareSync(password, user.password)){
                    return done(null, user, {
                        id: user.user_id,
                        firmName: user.firs_name,
                        email: user.email
                    })
                }
            }

            return done(null, false, req.flash('autenticateMessage', 'Password or email not func'))
        })
    }))
}