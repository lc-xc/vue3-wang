// 角色类
class Person {
  constructor(name) {
    this.id = new Date().getTime() + "-" + Math.random() * 10000;
    this.name = name;
    this.level = 1;
    this.zz = {
      // 血量
      hp: 100,
      // 攻击
      atk: 10,
      // 防御
      def: 10,
      // 速度
      spd: 10,
      // 暴击
      hit: 10,
      // 闪避
      dodge: 10,
    }
    // 善良
    this.goodness = 60;
    // 恶行
    this.villainy = 0;
  }

}

export default Person;
