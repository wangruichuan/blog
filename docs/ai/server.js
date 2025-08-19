process.stdin.on('data', data=>{
   const res = `回复：${data}\n`
   process.stdout.write(res)
})