// 怪物类
class Monster {
  constructor(name, type) {
    this.id = new Date().getTime() + '-' + Math.random()*10000;
    this.name = name;
    this.type = type; // 怪物类型（普通/精英/BOSS）
    this.level = 1;
    
    // 战斗属性
    this.attributes = {
      hp: 200,       // 生命值
      atk: 15,       // 攻击力
      def: 8,        // 防御力
      spd: 6,        // 速度
      critRate: 0.1, // 暴击率
      dodge: 0.05    // 闪避率
    };

    // 战斗状态
    this.status = {
      isEnraged: false,  // 狂暴状态
      isPoisoned: false  // 中毒状态
    };

    // 掉落物品
    this.dropItems = [];
  }

  // 基础攻击方法
  attack(target) {
    const baseDamage = this.attributes.atk - target.zz.def;
    const finalDamage = Math.max(baseDamage, 1);
    target.zz.hp -= finalDamage;
    return finalDamage;
  }

  // 进入狂暴状态
  enrage() {
    this.status.isEnraged = true;
    this.attributes.atk *= 1.5;
    this.attributes.spd *= 1.2;
  }

  // 更新等级
  levelUp() {
    this.level += 1;
    this.attributes.hp *= 1.2;
    this.attributes.atk *= 1.1;
    this.attributes.def *= 1.05;
  }
}

export default Monster;