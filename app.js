const randomVal = (min, max) =>
  Math.floor(Math.random() * (max - min) + min) + 1;

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      healthBarColorPlayer: "",
      monsterHealth: 100,
      healthBarColorMonster: "",
      countRound: 0,
      logMessages: [],
      winner: null,
      animation: false,
    };
  },
  watch: {
    playerHealth(health) {
      if (health >= 100) {
        this.playerHealth = 100;
      }

      if (health <= 0 && this.monsterHealth <= 0) {
        this.playerHealth = 0;
        this.monsterHealth = 0;
        this.winner = "Draw! 🍻";
      } else if (health <= 0) {
        this.playerHealth = 0;
        this.winner = "You lost! 💥";
      }
    },
    monsterHealth(health) {
      if (health <= 0 && this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.monsterHealth = 0;
        this.winner = "Draw! 🍻";
      } else if (health <= 0) {
        this.monsterHealth = 0;
        this.winner = "You Won! 🏆";
      }
    },
    countRound(round) {
      round % 3 !== 0 ? this.countRound : (this.countRound = 0);
    },
  },
  computed: {
    styleMonsterHealth() {
      if (this.monsterHealth === 100) this.healthBarColorMonster = "bg-success";
      if (this.monsterHealth <= 50) this.healthBarColorMonster = "bg-warning";
      if (this.monsterHealth <= 25) this.healthBarColorMonster = "bg-danger";
      return { width: this.monsterHealth + "%" };
    },
    stylePlayerHealth() {
      if (this.playerHealth <= 100) this.healthBarColorPlayer = "bg-success";
      if (this.playerHealth <= 50) this.healthBarColorPlayer = "bg-warning";
      if (this.playerHealth <= 25) this.healthBarColorPlayer = "bg-danger";
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackMonster() {
      this.countRound++;
      this.attackPlayer();
      const takenDmg = randomVal(4, 8);
      this.monsterHealth -= takenDmg;
      this.animation = "attack-animation";
      this.battleStats("Player", "Attack", takenDmg);
    },
    attackPlayer() {
      const takenDmg = randomVal(7, 14);
      this.animation = "attack-animation";
      this.playerHealth -= takenDmg;
      this.battleStats("Monster", "Attack", takenDmg);
    },
    healPlayer() {
      this.attackPlayer();
      const heal = randomVal(7, 18);
      this.playerHealth += heal;
      this.animation = false;
      this.battleStats("Player", "Heal", heal);
    },
    specialAttack() {
      this.countRound++;
      this.attackPlayer();
      const takenDmg = randomVal(8, 16);
      this.monsterHealth -= takenDmg;
      this.battleStats("Player", "Special Attack", takenDmg);
    },
    battleStats(who, type, val) {
      this.logMessages.unshift({ madeBy: who, spell: type, dmg: val });
    },
    startNewGame() {
      this.winner = null;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.logMessages = [];
      this.countRound = 0;
    },
    surrender() {
      this.winner = "You lost! 💥";
      this.playerHealth = 0;
    },
  },
});

app.mount("#game");
