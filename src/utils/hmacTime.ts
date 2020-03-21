const bcrypt = require('bcryptjs');
const jsSHA = require('jssha');

/**
 * 加盐就是在传输用户密码时候之前首先向服务器请求随机盐，然后将盐与密码混合做HMAC，这里散列函数
 * 的选择为密钥扩展的慢哈希函数bcrypt,然后将得到的“密码”与当前的时间（精确到分钟）做一次SHA加
 * 密得到最终上传的“密码”
 * 
 * @param password 
 * 原始密码
 * 
 * @param salt 
 * 随机盐
 */
export function hmacTime(password:string, salt: string) {
    const nowTime: string = Math.floor(new Date().getTime()/60000).toString();
    const passwordWithSalt: string = bcrypt.hashSync(password,salt);

    const shaObj = new jsSHA('SHA-512', 'TEXT');
    shaObj.update(passwordWithSalt);
    shaObj.update(nowTime);

    const passwordWithSaltTime: string = shaObj.getHash('HEX');
    return passwordWithSaltTime;
}