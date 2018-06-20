const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname)

files.forEach((file) => {
    let fileName = path.basename(file, '.js')

    if(fileName !== 'controllers'){
        exports[fileName] = require('./' + fileName)
    }    
})