const fs = require('fs') // import the file system module 
const path = require('path')
const matter = require('gray-matter') 
const showdown = require('showdown') // installs Showdown Markdown Converter  
const converter = new showdown.Converter() 
const publicLinks = []  // provides global list of links 


    
const checkIfFileIsDir = (file) => { // TODO: checkIfFileIsDir and use list template accordingly 
    const stat = fs.statSync(file)
    console.log(stat.isDirectory()) 
    if (stat.isDirectory()) {
        details = details.replace('{{content}}', 'test')
        return details
    }
}


const generatePublicFileLinks = (dir) => { // creates a globally available list of article links
    const startingDirr = dir
    const generatePublicLinks = returnAllFiles('public')
    generatePublicLinks.forEach(link => {
        linkName = link.replace('public/', '')
        linkName = linkName.replace('.html', '')
        link = `<li class="button"><a href='${startingDirr}${link}'> ${linkName}</a></li>`
        publicLinks.push(link)
    })
}

const generateShortCodeOutput = (shortcodeName) => {
    const templateDir = path.join(__dirname, 'theme/templates/shortcodes') // get the shortcode template directory
    const shortCodeTemplate = path.join(templateDir, (shortcodeName + '.html'))
    return shortCodeTemplate
}

const readFile = (file) => {
    const rawFileContent = fs.readFileSync(file, 'utf8')
    const parsedFileContent = matter(rawFileContent)
    const data = parsedFileContent.data
    const content = converter.makeHtml(parsedFileContent.content)
    return { data, content }
}

const returnAllFiles = (dir) => { // find each folder and subfolder in the directory and output a list of files
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

const saveFile = (file, details) => {
    fileName = path.basename(file) // get the file name
    fileName = fileName.replace('.md', '.html') // replace the extension
    fileName = path.join(path.dirname(file), fileName) // join the file name with the directory 
    fileName = fileName.replace('content', 'public') // replace the directory
    fs.mkdirSync(path.dirname(fileName), { recursive: true }) // create the directory if it doesn't exist
    fs.writeFileSync(fileName, details) // write the file
    console.log('File: ' + fileName)
}

// templatize individual file content 

const templatize = (template, file) => {
    const {data, content} = readFile(file) // read the file
    shortCodeNavigation = generateShortCodeOutput('links')
    let details = fs.readFileSync(template, 'utf8') // read the template

    details = templatizeNavigationLinks(details)    
    details = templatizeArticleDetails(details, {data, content})

    checkIfFileIsDir(file)   

    saveFile(file, details) // save the file
}

const templatizeArticleDetails = (details, {data, content}) => {
    details = details.replace('{{title}}', data.title) // replace the title 
    details = details.replace('{{description}}', data.description) // replace the description
    details = details.replace('{{keywords}}', data.keywords)
    details = details.replace('{{content}}', content) // replace the content
    return details
}

const templatizeNavigationLinks = (details) => {
    details = details.replace('{{navigation}}', fs.readFileSync(shortCodeNavigation, 'utf8'))
    details = details.replace('{{navLinks}}',  publicLinks.join(''))
    return details
}

// templatize all markdown files

const templatizeAllMarkdownFiles = () => {
    const templateDir = path.join(__dirname, 'theme/templates') // get the template directory
    const baseTemplate = path.join(templateDir, 'base.html') // get the base template
    const files = returnAllFiles('content') // get all the files in the content directory
    console.log(files.length, 'Files Generated:') // log the number of files
    console.log('-------')
    files.forEach(file => { 
        templatize(baseTemplate, path.join(file))
    })
    console.log('-------')
}

generatePublicFileLinks('/emdash-ssg/')

exports.generate = templatizeAllMarkdownFiles
