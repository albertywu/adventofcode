const md5 = require("./md5.js");
const input = "ckczppom";

for (let i = 1; i < 1000000000; i++) {
  if (md5(`${input}${i}`).startsWith("000000")) {
    console.log(i);
    break;
  }
}
