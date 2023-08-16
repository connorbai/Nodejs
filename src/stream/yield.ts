import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';


const yield1 = async() => {
    async function run() {
        await pipeline(
          async function* ({ signal }) {
            await someLongRunningfn({ signal });
            yield 'asd';
          },
          fs.createWriteStream('uppercase.txt'),
        );
        console.log('Pipeline succeeded.');
      }
      
      run().catch(console.error);
}

