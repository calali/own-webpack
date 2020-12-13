const fs = require('fs')
const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse').default

let ID = 0

function createAsset(filename) {
    const content = fs.readFileSync(filename,{'encoding':'utf-8'})

    const  ast = babelParser.parse(content,{
        sourceType: "module"
    })

    const dependencies = []

    babelTraverse(ast,{
        ImportDeclaration:({node})=>{
            dependencies.push(node.source.value)
        }
    })

    

    return {
        id:ID++,
        filename,
        dependencies
    }

}

function createGraph(entry) {
    const mainAsset =createAsset(entry)
    return mainAsset
}


const graph = createGraph('./example/entry.js')

console.log(graph);
