process.stdin.on('data', data=>{
   const res = `回复：${data}\n`
   process.stdout.write(res)
// 这段代码的作用是监听标准输入（process.stdin）的'data'事件。
// 每当用户在命令行输入内容并回车时，回调函数会被触发，参数data就是输入的数据。
// 代码会将输入内容拼接成一个字符串，前面加上“回复：”，后面加上换行符。
// 然后通过process.stdout.write方法将这个字符串输出到标准输出（通常是终端）。
// 例如，用户输入“你好”，程序会输出“回复：你好”
})