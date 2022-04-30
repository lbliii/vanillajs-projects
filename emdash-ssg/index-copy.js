const { Console } = require('console')
const fs = require('fs') // import the file system module 
const matter = require('gray-matter') 
const path = require('path')


// Showdown Markdown Converter  

const showdown = require('showdown') 
const converter = new showdown.Converter() 

//

const readFile = (file) => {
    const text = fs.readFileSync(file, 'utf8')
    const parsed = matter(text)
    const data = parsed.data
    const markdownBody = parsed.content
    const content = converter.makeHtml(markdownBody)
    return { data, content }
}


const templatize = (template, file) => {
    const {data, content} = readFile(file)
    template = template.replace('{{content}}', content)
    template = template.replace('{{title}}', data.title)
    template = template.replace('{{description}}', data.description) 
    const details = fs.readFileSync(template, 'utf8')
    console.log(fs.readFileSync(template, 'utf8'))
    fs.writeFile( 'public/test.html', details, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    )
}


templatize('theme/templates/base.html', 'content/hello.md')




