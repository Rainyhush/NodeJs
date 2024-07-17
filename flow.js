import fs from 'fs';

fs.readFile('流量数据.json', 'utf-8', (err, data) => {
  // 格式化流量元数据文件
var flow = JSON.parse(data);

// 封装函数
function mbToGB(mb) {
  if (mb < 1024) {
    return mb + ' MB';
  } else {
    return (mb / 1024).toFixed(2) + ' GB';
  }
}

function getTRU(flow, index) {
  return {
    total: Number(flow.resources[0].details[index].total),
    remain: Number(flow.resources[0].details[index].remain),
    use: Number(flow.resources[0].details[index].use),
  };
}

// 通用流量索引
const generalIndices = [0, 1, 2, 3, 5, 6];
// 定向流量索引
const directionalIndex = 4;

// 初始化总量
let totalGeneral = 0, remainGeneral = 0, useGeneral = 0;

// 计算通用流量总量
generalIndices.forEach(index => {
  const { total, remain, use } = getTRU(flow, index);
  totalGeneral += total;
  remainGeneral += remain;
  useGeneral += use;
});

// 计算定向流量
const { total: totalDirectional, remain: remainDirectional, use: useDirectional } = getTRU(flow, directionalIndex);

// 转换为GB
const totalGeneralGB = mbToGB(totalGeneral);
const remainGeneralGB = mbToGB(remainGeneral);
const useGeneralGB = mbToGB(useGeneral);

const totalDirectionalGB = mbToGB(totalDirectional);
const remainDirectionalGB = mbToGB(remainDirectional);
const useDirectionalGB = mbToGB(useDirectional);

console.log('通用流量:', totalGeneralGB, remainGeneralGB, useGeneralGB);
console.log('定向流量:', totalDirectionalGB, remainDirectionalGB, useDirectionalGB);
  
  
  
})