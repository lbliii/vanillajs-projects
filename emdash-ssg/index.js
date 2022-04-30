
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
    fs.mkdirSync(path.dirname(fileName), { recursive: true }) // create the directory if it doesn't exist
    fs.writeFileSync(fileName, details) // write the file
}

// for each file in the content directory, templatize it

const templatizeAll = () => {
    const templateDir = path.join(__dirname, 'theme/templates') // get the template directory
    const baseTemplate = path.join(templateDir, 'base.html') // get the base template
    const files = returnAllFiles('content') // get all the files in the content directory
    console.log('# of Files: ', files.length) // log the number of files
    files.forEach(file => {
        console.log(file)
        templatize(baseTemplate, path.join(file))
    })
}




// find each folder and subfolder in the directory and output a list of files

const returnAllFiles = (dir) => {
    const files = fs.readdirSync(dir)
    const fileNames = []
    files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            fileNames.push(...returnAllFiles(filePath))
        } else {
            fileNames.push(filePath)
        }
    })
    return fileNames
}

console.log(returnAllFiles('content'))

// templatize('theme/templates/base.html', 'content/hello.md')

templatizeAll()


