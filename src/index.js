
const { readFile, writeFile, readdir } = require("fs").promises;

async function fix() {
  const basePath = './metadata/'
  let files = (await readdir(basePath)).filter(file => file !== '.DS_Store')
  
  await files.sort(function(a, b)  {
    return a - b
  })
  
  for(let i in files) {
    const data = (await readFile(basePath + files[i])).toString('utf8')
    const tagert = /"image":"\/[0-9999]+"/
    
    // Enter metadata
    // const metadata = "QmcCFtkJNhRg19wZvwso8UtWUBkideznUD2T46gukrfGb4"
    
    const replaced = data.replace(tagert, `"image":"https://ipfs.io/ipfs/${metadata}/${i}.png"`)
    await writeFile(basePath + files[i], replaced)
  }
}

fix()
    .then(() => {
      console.log('metadata changed.')
    })
    .catch(err => {
      console.error(err)
    })