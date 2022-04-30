const { Console } = require('console')
const fs = require('fs') // import the file system module 
const matter = require('gray-matter') 
const path = require('path')

// Showdown Markdown Converter  

const showdown = require('showdown') 
const converter = new showdown.Converter() 

// Content Processing 

const readFile = (file) => {
    const rawFileContent = fs.readFileSync(file, 'utf8')
    const parsedFileContent = matter(rawFileContent)
    const data = parsedFileContent.data
    const content = converter.makeHtml(parsedFileContent.content)
    return { data, content }
}

const templatize = (template, file) => {
    const {data, content} = readFile(file) // read the file
    let details = fs.readFileSync(template, 'utf8') // read the template
    details = details.replace('{{content}}', content) // replace the content
    details = details.replace('{{title}}', data.title) // replace the title 
    details = details.replace('{{description}}', data.description) // replace the description
  
    saveFile(file, details) // save the file

}

const saveFile = (file, details) => {
    fileName = path.basename(file) // get the file name
    fileName = fileName.replace('.md', '.html') // replace the extension
    fileName = path.join(path.dirname(file), fileName) // join the file name with the directory 
    fileName = fileName.replace('content', 'public') // replace the directory
    fs.writeFileSync(fileName, details) // write the file
}

// for each file in the content directory, templatize it

const templatizeAll = () => {
    const contentDir = path.join(__dirname, 'content') // get the content directory
    const templateDir = path.join(__dirname, 'theme/templates') 
    const template = path.join(templateDir, 'base.html')
    const files = fs.readdirSync(contentDir)
    files.forEach(file => {
        console.log(file)
        templatize(template, path.join(contentDir, file))
    })
}


// templatize('theme/templates/base.html', 'content/hello.md')

templatizeAll()


