// 物品类
export default {
  install(app, options) {
    // 定义 Goods 类
    class Goods {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      getInfo() {
        return `${this.name}的价格是${this.price}元`;
      }
    }

    // 将 Goods 类挂载到全局属性上
    app.config.globalProperties.$goods = Goods;
  }
};
