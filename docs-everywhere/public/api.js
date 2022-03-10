window.GetDocumentation = async function() {
    const docs = await GetAllDocs();
    
}

async function GetAllDocs() {
    const lookup = await fetch('https://help.bolt.com/index.json');
    const lookupResult = lookup.json();
    console.log(lookup);


}