
const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!!')
        }, 1500)
    })
    return promise
}

setTimeout(() => {
    console.log('First Message.')
    fetchData()
    .then(text => {
        console.log(text)
        let aaa = text + ' OH MY GOD GET THE FUCK READY NOW!!!!'
        return aaa
    })
    .then(text2 => {
        console.log(text2)
    })
}, 500)
