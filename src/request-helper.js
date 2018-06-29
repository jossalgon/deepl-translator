const https = require('https');

module.exports = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';

      res.setEncoding('utf8');
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const dataParsed = JSON.parse(data.trim());
          resolve(dataParsed);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(postBody));
    req.end();
  });
};
