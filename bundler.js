const fs = require('fs')

function createAsset(filename) {
    const file = fs.readFileSync(filename,{'encoding':'utf-8'})
    console.log(file)
}

createAsset('./example/entry.js')
