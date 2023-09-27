let baseURL = "http://xxxx";
switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "https://mock.apifox.cn/m1/2937593-0-default"
    break
  case "test":
    baseURL = "http://nekmnm.natappfree.cc"
    break
  case "production":
    baseURL="https://mock.apifox.cn/m1/2937593-0-default"
}

export default baseURL;
4
