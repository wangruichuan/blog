function count (){
 let sum = 1
 function increment(){
 sum += 1
 }
 return {sum,increment}
}
const {sum,increment} = count()
console.log(sum)
increment()
increment()
console.log(sum)