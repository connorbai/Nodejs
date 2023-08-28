import assert from 'assert';
import { Resolver } from 'dns/promises';
import fs, { createReadStream, createWriteStream, WriteStream } from 'fs';
import { test } from 'node:test';
import stream, { Duplex, PassThrough, Readable, Writable } from 'stream';
import { finished, pipeline } from 'stream/promises';
import zlib, { createGzip } from 'zlib';


const main = async () => {

    // finished1()
    // writer1()
    // reader1()
    // unpipe1()
    // streamEnd()
    // cork1()
    // writeEnd2()
    // pass()
    // readable1()
    // readable2()
    // pipe1()
    // data1()
    // readable4()
    // duplex1()
    let chunk
    chunk |= 0;

}
main()


async function stream1() {
    const ac = new AbortController();
    const { signal } = ac;
    setImmediate(() => ac.abort());
    try {
        await pipeline(
            createReadStream('archive.tar'),
            createGzip(),
            createWriteStream('archive.tar.gz'),
            { signal },
        );
    } catch (err) {
        console.error('error: ', err); // AbortError
    }
}

function finished1() {
    const rs = createReadStream('archive.tar');

    async function run() {
        await finished(rs);
        console.log('Stream is done reading.');
    }

    run().catch(console.error);
    rs.resume(); // Drain the stream.
}

function writer1() {
    const writer = fs.createWriteStream('filename.txt');

    for (let i = 0; i < 100; i++) {
        writer.write(`hello, #${i}!\n`);
    }

    writer.on('finish', () => {
        console.log('All writes are now complete.');
    });

    writer.end('This is the end\n');
}


function reader1() {
    const writer = fs.createWriteStream('filename_done.txt');
    const reader = fs.createReadStream('filename.txt')


    writer.on('pipe', (src) => {
        console.log('Something is piping into the writer.');
        assert.equal(src, reader);
        console.log(src)
    });
    reader.pipe(writer);
}


function unpipe1() {
    const writer = fs.createWriteStream('filename_done.txt');
    const reader = fs.createReadStream('filename.txt')
    writer.on('unpipe', (src) => {
        console.log('Something has stopped piping into the writer.');
        assert.equal(src, reader);
    });
    reader.pipe(writer);
    reader.unpipe(writer);
}


function destory() {
    const myStream = new Writable();
    const fooErr = new Error('foo error');
    console.log(myStream.destroyed); // false
    myStream.destroy(fooErr);
    console.log(myStream.destroyed); // true 
    myStream.on('error', (fooErr) => console.error(fooErr.message)); // foo error
}

function streamEnd() {
    // Write 'hello, ' and then end with 'world!'.
    const file = fs.createWriteStream('example.txt');
    file.write('hello, ');
    file.end('world!');
    // Writing more now is not allowed!
}

function cork1() {
    const stream = fs.createWriteStream('example.txt');

    stream.cork();
    stream.write('some ');
    stream.cork();
    stream.write('data ');
    process.nextTick(() => {
        stream.uncork();
        // The data will not be flushed until uncork() is called a second time.
        setTimeout(() => stream.uncork(), 5e3)
    });
}


function writeEnd2() {
    function write(data, cb) {
        const stream = fs.createWriteStream('example.txt');
        if (!stream.write(data)) {
            stream.once('drain', cb);
        } else {
            process.nextTick(cb);
        }
    }

    // Wait for cb to be called before doing any other write.
    write('hello', () => {
        console.log('Write completed, do more writes now.');
    });
}


function pass() {
    const pass = new PassThrough();
    const writable = new Writable();

    pass.pipe(writable);
    pass.unpipe(writable);
    // readableFlowing is now false.

    pass.on('data', (chunk) => { console.log(chunk.toString()); });
    // readableFlowing is still false.
    pass.write('ok');  // Will not emit 'data'.
    pass.resume();     // Must be called to make stream emit 'data'.
    // readableFlowing is now true. 
}


function readable1() {
    const rr = fs.createReadStream('filename.txt');
    rr.on('readable', () => {
        console.log(`readable: ${rr.read()}`);
    });
    rr.on('end', () => {
        console.log('end');
    });
}


function readable2() {
    const readable = new stream.Readable();
    console.log(readable.isPaused()); // === false
    readable.pause();
    console.log(readable.isPaused()); // === true
    readable.resume();
    console.log(readable.isPaused()); // === false
}

function readable3() {
    const readable = fs.createReadStream('filename.txt')
    readable.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
        readable.pause();
        console.log('There will be no additional data for 1 second.');
        setTimeout(() => {
            console.log('Now data will start flowing again.');
            readable.resume();
        }, 1000);
    });
}

// async function readable4() {
//     // With a synchronous mapper.
// for await (const chunk of Readable.from([1, 2, 3, 4]).map((x) => x * 2)) {
//     console.log(chunk); // 2, 4, 6, 8
//   }
//   // With an asynchronous mapper, making at most 2 queries at a time.
//   const resolver = new Resolver();
//   const dnsResults = Readable.from([
//     'nodejs.org',
//     'openjsf.org',
//     'www.linuxfoundation.org',
//   ]).map((domain) => resolver.resolve4(domain), { concurrency: 2 });
//   for await (const result of dnsResults) {
//     console.log(result); // Logs the DNS result of resolver.resolve4.
//   } 
// }



function pipe1() {
    const r = fs.createReadStream('filename.txt');
    const z = zlib.createGzip();
    const w = fs.createWriteStream('file.txt.gz');
    r.pipe(z).pipe(w);
}


function data1() {
    const readable = fs.createReadStream('filename.txt')
    readable.setEncoding('utf8');
    readable.on('data', (chunk) => {
        assert.equal(typeof chunk, 'string');
        console.log('Got %d characters of string data:', chunk.length);
    });
}

function getReadableStreamSomehow() {
    return fs.createReadStream('filename.txt')
}


// async function duplex1() {
//     const readable = new ReadableStream({
//         start(controller) {
//           controller.enqueue('world');
//         },
//       });
      
//       const writable = new WritableStream({
//         write(chunk) {
//           console.log('writable', chunk);
//         },
//       });
      
//       const pair = {
//         readable,
//         writable,
//       };
//       const duplex = Duplex.fromWeb(pair, { encoding: 'utf8', objectMode: true });
      
//       duplex.write('hello');
      
//       for await (const chunk of duplex) {
//         console.log('readable', chunk);
//       }
// }