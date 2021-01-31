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

document.getElementById('pig-latin-input').addEventListener('change', (inputValue) => {
  this.inputValue = inputValue.target.value;
})

document.getElementById('pig-latin-submit-btn').addEventListener('click', () => {
  const pigLatinReturnValue = pigLatin(this.inputValue);
  document.getElementById('pig-latin-output').innerHTML = 'Output: ' + pigLatinReturnValue;
})
