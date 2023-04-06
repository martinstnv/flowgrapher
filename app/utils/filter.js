/**
 * @author MartinStoynov
 * @param {string} sourceCode
 */
const filter = (sourceCode) => {
    
    var mainBody = [],
        mainRegex = /{([^]+)}/g,
        mainMatch;

    while ((mainMatch = mainRegex.exec(sourceCode))) {
      mainBody.push(mainMatch[1]);
    }

    var result = mainBody.toString().split("\n").join("").replace(/\s\s+/g, " ").split('\t').join(' ').split('else if').join('elseif').split(' ');

    return result;
}
  
  module.exports.filter = filter;