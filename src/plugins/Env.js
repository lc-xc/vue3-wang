// 环境类
class Env {
  constructor() {
    this.env = process.env.NODE_ENV || 'development';
  }

  isDevelopment() {
    return this.env === 'development';
  }

  isProduction() {
    return this.env === 'production';
  }

  isTesting() {
    return this.env === 'testing';
  }
}

export default new Env();
