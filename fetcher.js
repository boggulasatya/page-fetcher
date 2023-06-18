const request = require('request');
const fs = require('fs');

//It should take two command line arguments:a URL,a local file path

const fetcher = function (url, filePath) {

// request.get used to send an HTTP request to specified URL  
  request.get(url, (error, response, body) => {
    if (error) {
      console.error('Error downloading resource:', error);
      return;
    }
    if (response.statusCode !== 200) {
      console.error('Error downloading resource. Status code:', response.statusCode);
      return;
    }
// if no errors the response body is written to the fs.writeFile.
    fs.writeFile(filePath, body, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        const fileSize = body.length; //get the filesize
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
      }
    });
  });
};
const args = process.argv.slice(2);
fetcher(args[0], args[1]);
