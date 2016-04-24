var _ = require('lodash');
var Promise = require('promise');

function TranslateObject(srcObj, language, api) {
  var googleTranslate = require('google-translate')(api);

  var promises = [];
  var destObj = {};

  // Recursivly loop through an object
  recurisveTranslateObject(destObj, {data: srcObj}, language);

  function recurisveTranslateObject(destObj, srcObj, language) {
    _.forEach(srcObj, function (value, key) {
      if (_.isPlainObject(value)) {
        destObj[key] = {};
        _.merge(destObj[key], value);
        recurisveTranslateObject(destObj[key], value, language);

        // Find the keys of the current object that has string value (str is translatable)
        var objKeys = _.pickBy(destObj[key], _.isString);
        var keysArray = _.keys(objKeys);
        var valuesArray = _.values(objKeys);

        promises.push(new Promise(function (resolve, reject) {
          googleTranslate
            .translate(_.concat(valuesArray), language, function (err, res) {
              if (err) {
                console.log('service falied', err, res);
                return new Error('Translation service has falied');
              }

              // if the response coming from google is an array [{translatedText:.., originalText:...}, {}]
              res = _.concat(res);
              for (var i = 0; i < keysArray.length; i++) {
                destObj[key][keysArray[i]] = res[i].translatedText;
              }

              return resolve();
            });
        })); // End of promises push
      } else if(_.isArray(value)){
        // Handles cases when the value in the JSON property is actually an array ["..", "...."]
        promises.push(new Promise(function (resolve, reject) {
          googleTranslate
            .translate(value, language, function (err, res) {
              if (err) {
                console.log('service falied', err, res);
                return new Error('Translation service has falied');
              }
              var translatedArray = [];
              // var resArray = res.text.join().split('{{*}}');
              for (var i = 0; i < res.length; i++) {
                 translatedArray.push(res[i].translatedText);
              }
              destObj[key] = translatedArray;
              return resolve();
            });
        })); // End of promises push
      }
    });
  }

  var dataProimse = new Promise(function promise(resolve, reject) {
    Promise.all(promises).then(function () {
      resolve(destObj.data);
    });
  });

  return dataProimse;
}

module.exports = TranslateObject;
