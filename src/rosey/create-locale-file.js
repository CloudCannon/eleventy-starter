const fs = require('fs');
const mv = require('mv');

// read theme color from _data/site.json
fs.readFile('./rosey/base.json', 'utf8', function (err, dataFile) {
  if (err) {
    console.log(err);
    return;
  }

  fs.readFile('./rosey/locales/ko-kr.json', 'utf8', function (err, localeFile) {
    if (err) {
      console.log(err);
      return;
    }

    localeFile = JSON.parse(localeFile);
    dataFile = JSON.parse(dataFile);
    const localeKeys = Object.keys(localeFile);
    const baseKeys = Object.keys(dataFile.keys);
    console.log(baseKeys);

    const result = {};
    for (let i = 0; i < baseKeys.length; i++) {
      const key = baseKeys[i];
      let localeValue = '';
      if (localeFile[key]) {
        localeValue = localeFile[key].value;
      }
      const original = dataFile.keys[key].original;
      if (localeValue || localeValue === '') {
        Object.assign(result, {
          [key]: {
            original: original,
            value: localeValue,
          },
        });
      }
    }
    const replacedFile = JSON.stringify(result);

    // Write result
    fs.writeFile(
      './rosey/locales/ko-kr.json',
      replacedFile,
      'utf-8',
      function (err) {
        if (err) {
          console.log(err);
        }
        console.log(`📚 Writing variables to './rosey/locales/ko-kr.json'`);

        const currentPath = './rosey';
        const destinationPath = './src/rosey';

        mv(currentPath, destinationPath, function (err) {
          if (err) {
            throw err;
          } else {
            console.log('Successfully moved the file!');
          }
        });
      }
    );
  });
});
