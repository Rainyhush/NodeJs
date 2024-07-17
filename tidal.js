const axios = require('axios');

// 客户端ID和客户端密钥
const clientId = 'PIXkqCMZnC8s94K0';
const clientSecret = '4goKru64BPvEUs53AR99PEw0qnIR4p7THsXsfCFwoBg=';

// 生成Base64编码
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// 设置请求URL
const tokenUrl = 'https://auth.tidal.com/v1/oauth2/token';

// 设置请求数据
const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');

// 发送POST请求
axios.post(tokenUrl, data, {
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    console.log('Access token:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });