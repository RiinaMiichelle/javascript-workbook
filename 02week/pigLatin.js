'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
const vowels = ['a','e','i','o','u','y'];
word = word.toLowerCase().trim();
let storeIndex = 0;

//if (word[0] === 'a' || 'e' || 'i' || 'o' || 'u') {
  //  return word + 'yay';
 // }
//}


//const firstLetter = word[0];



for (let i=0; i<word.length; i++) {
  //if (vowels.includes(firstLetter)) {
  //   return word + 'yay';
  // } else {return word + 'ay';}
  for (let j=0; j<vowels.length; j++) {
    if (word[i] === vowels[j]){
      storeIndex = i;
      const firstString = word.slice(0,storeIndex);
      const secondString = word.slice(storeIndex);
    if (storeIndex === 0){
      return secondString + firstString + "yay";
    }
    return secondString + firstString + "ay";
      }
    }
  }
}












function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
