// 自定义保留小数位 默认保留2位
export const toCountFix = (num: any, fix = 2) => {
  return Number(num).toFixed(fix);
};

// 遍历数据相加 提供数据和键
export const keyValueSum = (data: any, key: any, fix = 2) => {
  const sum = data.reduce((acc: any, cur: any) => acc + cur[key], 0);
  return toCountFix(sum, fix);
};
