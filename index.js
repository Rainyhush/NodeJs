import *as fs from 'node:fs';

const data = '急急急i';

// 写入文件
fs.writeFile('cs.js', data, (err) => {
  if (err) {
    console.error('写入文件时发生错误:', err);
  } else {
    console.log('文件已成功写入');
  }
});
fs.readFile('cs.js', (err,data)=>{
  if (err) {
    console.log(err)
  }
  console.log(data.toString())
})