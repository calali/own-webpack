const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse').default
const babel = require('babel-core')

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

    const {code} = babel.transformFromAst(ast, null, {
        presets: ['env'],
    });

    

    return {
        id:ID++,
        filename,
        dependencies,
        code
    }

}

function createGraph(entry) {
    const mainAsset =createAsset(entry)

    const queue = [mainAsset]

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename)

        asset.mapping = {}

        asset.dependencies.forEach(relativePath=>{
            const absolutePath = path.join(dirname,relativePath)

            const child = createAsset(absolutePath)

            asset.mapping[relativePath] = child.id

            queue.push(child)
        })
    }

    return queue
}

function bundler(params) {
    
}

const graph = createGraph('./example/entry.js')

const result = bundler(graph)

console.log(result);
