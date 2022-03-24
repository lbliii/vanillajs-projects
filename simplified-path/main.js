

var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';
    let r = '';
    for (let i = 0; i < strs[0].length; i++) {

      for (let j = 1; j < strs.length; j++) {
        if (strs[0][i] !== strs[j][i]) return r;
      }
      r += strs[0][i];
    }
    return r;
  };

  
console.log(  longestCommonPrefix(['apple', 'application','appliance']))


b = ['moat', 'two', 'three']

e = ['monkeys','horses','parrots']


let x = ''
for (let i = 0; i < b.length; i++) {
    for (let i =0; i < e.length; i++) {
        if (b[0][i] !== e[0][i])  x = ''
    }
    x += b[0][i] 

    console.log(x)

}