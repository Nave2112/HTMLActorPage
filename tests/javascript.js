function rev(s){
    let reverse= ""
    for(let i=s.length-1; i>=0; i--){
        reverse += s[i] 
    }
    return reverse
}
console.log(rev('naveen'))

const rebv = (str)=> str.split('').reverse().join('')
console.log(rebv('naveen'))