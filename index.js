const YAML = require('yaml')
const defaults = { extensions: ['md', 'svx'] }

module.exports = function (middlewares, pl, options) {
    options = { defaults, ...options }
    
    // insert frontmatter metadata after meta is created
    const index = middlewares.findIndex(mw => mw.name === 'applyMetaToFiles')
    middlewares.splice(index + 1, 0, {
        name: "routify-plugin-frontmatter",
        middleware: middleware
    })

    return middlewares

    async function middleware(payload) { await walkFiles(payload.tree) }

    async function walkFiles(file) {
        if (file.children && file.children.length) {
            await Promise.all(file.children.map(walkFiles))
        }
        if (options.extensions.includes(file.ext)) {
            const body = require('fs').readFileSync(file.absolutePath, 'utf8')
            const match = body.match(/^---(((.)|[\s\S])+?)^---/m)            
            if (match) file.meta.frontmatter = YAML.parse(match[1])
        }
    }
}