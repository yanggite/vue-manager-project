let env = ""
if (process.env.NODE_ENV === "development") {
  env = "developer"
} else if (process.env.NODE_ENV === "production") {
  env = "testserver"
} else {
  env = "testserver"
}

export const HOST = {
  //https://cointon.io.com
  // 192.168.5.29:8061  赵本地
  // 192.168.5.196:8061 吴本地
  //线上测试 192.168.5.199:8061
  developer: "http://192.168.5.29:8061",
  production: "http://192.168.5.199:8061",
  testserver: "http://192.168.5.202:8061"
}[env]
