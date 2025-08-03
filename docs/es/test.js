function count (){
 let sum = 1
 function increment(){
 sum += 1
 console.log("🚀 ~ increment ~ sum:", sum)
 console.log("🚀 ~ increment ~ sum:", sum)
 }
 return {sum,increment}
}
const {sum,increment} = count()
console.log(sum)
increment()
increment()
console.log(sum)
