const fs = require('fs');
const axios = require('axios');

const url1 = 'https://nachoneko.cn/api/v1/client/subscribe?token=7817c0778025c4ecc9d26436b6d90b09';
const url2 = 'http://s.hayaku.fun/v3/subscr?id=fbe513c056df418590dc614deeae6593';

Promise.all([axios.get(url1), axios.get(url2)])
  .then(function(responses) {
    const base64Data1 = responses[0].data;
    const base64Data2 = responses[1].data;

    // 解码 base64 数据得到 vmess 数据
    const vmessData1 = Buffer.from(base64Data1, 'base64').toString('utf-8');
    const vmessData2 = Buffer.from(base64Data2, 'base64').toString('utf-8');

    // 将数据按行拆分并合并
    const vmessLinks1 = vmessData1.split('\n').filter(line => line.trim() !== '');
    const vmessLinks2 = vmessData2.split('\n').filter(line => line.trim() !== '');
    const vmessLinks = vmessLinks1.concat(vmessLinks2);

    // 解码和解析每个链接
    const decodedLinks = vmessLinks.map((vmessLink, index) => {
      // 去除开头的 "vmess://"
      const encoded = vmessLink.replace('vmess://', '');

      // 解码 Base64
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8');

      // 解析 JSON 对象
      const json = JSON.parse(decoded);

      return json;
    });

    // 将 JSON 对象数组转换为字符串
    const jsonString = JSON.stringify(decodedLinks, null, 2);

    // 写入文件
    fs.writeFile('data.json', jsonString, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('成功');
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
