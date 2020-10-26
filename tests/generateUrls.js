const fs = require('fs');
const {once} = require('events');

const targetDataNum = 10000000;
var baseUrl = 'http://localhost:3005/listing/';

async function run() {
  const writableStream = fs.createWriteStream('urls.csv');
  for (let k = 1; k <= targetDataNum; k+=100000) {
    let newUrl = baseUrl + k + '\n';
    const canWriteMore = writableStream.write(newUrl);
    console.log(k);
    if (!canWriteMore) {
      await once(writableStream, "drain");
    }
  }
}


run().then(() => {
  console.log('done');
}).catch(err => {
  console.log("got rejection: ", err);
});
