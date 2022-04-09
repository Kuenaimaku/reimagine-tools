<template>
  <div id="expertise">
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-2 has-text-centered">
              <figure class="image is-128x128 is-inline-block">
                <img alt="ReIMAGINE logo" src="@/assets/logo.png" />
              </figure>
            </div>
            <div class="column is-10">
              <!-- Left side -->
              <h1 class="title">Damage Calculator</h1>
              <p class="subtitle">In Beta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="container">
              <div class="content">
                <h1>Input</h1>
              </div>
              <o-tabs v-model="activeTab" :expanded="true">
                <o-tab-item value="0" label="Statistics">
                  <div class="content">
                    <h1>Step 1</h1>
                    <o-field label="Primary Stat">
                      <o-input v-model.number="stats.primarystat"/>
                    </o-field>
                    <o-field label="Skill Modifier">
                      <o-input v-model.number="stats.skillmodifier"/>
                    </o-field>
                    <o-field label="Expertise Class/Rank">
                      <o-input v-model.number="stats.expertiseclassrank"/>
                    </o-field>
                    <o-field label="Defense">
                      <o-input v-model.number="stats.enemydefense"/>
                    </o-field>
                    <o-field label="Resistance">
                      <o-input v-model.number="stats.enemyresistance"/>
                    </o-field>
                    <h1>Step 2</h1>
                    <o-field label="Affinity">
                      <o-input v-model.number="stats.affinity"/>
                    </o-field>
                    <o-field label="Action">
                      <o-input v-model.number="stats.action"/>
                    </o-field>
                    <o-field label="Racial">
                      <o-input v-model.number="stats.racial"/>
                    </o-field>
                    <o-field label="Skill Power">
                      <o-input v-model.number="stats.skillpower"/>
                    </o-field>
                    <h1>Step 3</h1>
                    <o-field label="General Stat Boost">
                      <o-input v-model.number="stats.general"/>
                    </o-field>
                    <o-field label="Incense Modifier Boost">
                      <o-input v-model.number="stats.incense"/>
                    </o-field>
                    <o-field label="Beef Boost">
                      <o-input v-model.number="stats.beef"/>
                    </o-field>
                    <o-field label="Alignment Boost">
                      <o-input v-model.number="stats.alignment"/>
                    </o-field>
                    <o-field label="Enhancement Boost">
                      <o-input v-model.number="stats.enhancement"/>
                    </o-field>
                    <o-field label="CotW Boost">
                      <o-input v-model.number="stats.hex"/>
                    </o-field>
                    <o-field label="General Damage Reduction">
                      <o-input v-model.number="stats.generaldamagereduction"/>
                    </o-field>
                    <o-field label="Affinity Damage Reduction">
                      <o-input v-model.number="stats.enemydamagereduction"/>
                    </o-field>
                    <o-field label="LP Damage Power">
                      <o-input v-model.number="stats.lbdamage"/>
                    </o-field>
                  </div>
                </o-tab-item>
                <o-tab-item value="1" label="Options">
                  <h1>Options</h1>
                </o-tab-item>
              </o-tabs>
            </div>
          </div>
          <div class="column">
            <div class="container">
              <div class="content">
                <h1>Summary</h1>
                <hr/>
                <hr/>
                <hr/>
                <o-tooltip label="Used for Non-Critical Hit"><span>A1: {{A1}}</span></o-tooltip> = (<o-tooltip label="Primary Stat"><span>{{stats.primarystat}}</span></o-tooltip> * (<o-tooltip label="Skill Modifier"><span>{{stats.skillmodifier}}</span></o-tooltip> / 100) + (<o-tooltip label="Expertise Rank"><span>{{stats.expertiseclassrank}}</span></o-tooltip> / 2) - <o-tooltip label="Enemy Defense"><span>{{stats.enemydefense}}</span></o-tooltip>) * (<o-tooltip label="Primary Stat"><span>{{stats.enemyresistance}}</span></o-tooltip> / 100)
                <br/>
                <o-tooltip label="Used for Critical Hit"><span>A2: {{A2}}</span></o-tooltip> = (<o-tooltip label="Primary Stat"><span>{{stats.primarystat}}</span></o-tooltip> * (<o-tooltip label="Skill Modifier"><span>{{stats.skillmodifier}}</span></o-tooltip> / 100) + (<o-tooltip label="Expertise Rank"><span>{{stats.expertiseclassrank}}</span></o-tooltip> / 2)) * (<o-tooltip label="Primary Stat"><span>{{stats.enemyresistance}}</span></o-tooltip> / 100)
                <br/>
                <o-tooltip label="Used for Non-Critical Hit"><span>B1: {{B1}}</span></o-tooltip> = <o-tooltip label="From A1"><span>{{A1}}</span></o-tooltip> * (1 + (<o-tooltip label="Affinity"><span>{{stats.affinity}}</span></o-tooltip> / 100)) * (1 + ((<o-tooltip label="Action"><span>{{stats.action}}</span></o-tooltip> + <o-tooltip label="Racial"><span>{{stats.racial}}</span></o-tooltip> + <o-tooltip label="Skill Power"><span>{{stats.skillpower}}</span></o-tooltip>) / 100))
                <br/>
                <o-tooltip label="Used for Critical Hit"><span>B2: {{B2}}</span></o-tooltip> = <o-tooltip label="From A2"><span>{{A2}}</span></o-tooltip> * (1 + (<o-tooltip label="Affinity"><span>{{stats.affinity}}</span></o-tooltip> / 100)) * (1 + ((<o-tooltip label="Action"><span>{{stats.action}}</span></o-tooltip> + <o-tooltip label="Racial"><span>{{stats.racial}}</span></o-tooltip> + <o-tooltip label="Skill Power"><span>{{stats.skillpower}}</span></o-tooltip>) / 100))
                <br/>
                <o-tooltip label="Used for Minimum Non-Critical Hit"><span>C1: {{C1}}</span></o-tooltip> = <o-tooltip label="From B1"><span>{{B1}}</span></o-tooltip> * 0.8
                <br/>
                <o-tooltip label="Used for Maximum Non-Critical Hit"><span>C2: {{C2}}</span></o-tooltip> = <o-tooltip label="From B1"><span>{{B1}}</span></o-tooltip> * 0.99
                <br/>
                <o-tooltip label="Used for Critical Hit"><span>C3: {{C3}}</span></o-tooltip> = <o-tooltip label="From B2"><span>{{B2}}</span></o-tooltip> * 1.2
                <br/>
                <o-tooltip label="Used for Limit Burst"><span>C4: {{C4}}</span></o-tooltip> = <o-tooltip label="From B2"><span>{{B2}}</span></o-tooltip> * 1.5
                <br/>
                <o-tooltip label="Minimum Non-Critical Hit"><span>D1: {{D1}}</span></o-tooltip> = <o-tooltip label="From C1"><span>{{C1}}</span></o-tooltip> * (1 + ((<o-tooltip label="General Damage Boost"><span>{{stats.general}}</span></o-tooltip> + <o-tooltip label="Incense Modifier Boost"><span>{{stats.incense}}</span></o-tooltip> + <o-tooltip label="Beef Boost"><span>{{stats.beef}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="LNC Boosts"><span>{{stats.alignment}}</span></o-tooltip> + <o-tooltip label="Enhancment Buffs"><span>{{stats.enhancement}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Curse of the Wretched Debuffs"><span>{{stats.hex}}</span></o-tooltip> + <o-tooltip label="General Damage Reduction"><span>{{stats.generaldamagereduction}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Enemy Damage Reduction"><span>{{stats.enemydamagereduction}}</span></o-tooltip>) / 100))
                <br/>
                <o-tooltip label="Minimum Non-Critical Hit"><span>D2: {{D2}}</span></o-tooltip> = <o-tooltip label="From C2"><span>{{C2}}</span></o-tooltip> * (1 + ((<o-tooltip label="General Damage Boost"><span>{{stats.general}}</span></o-tooltip> + <o-tooltip label="Incense Modifier Boost"><span>{{stats.incense}}</span></o-tooltip> + <o-tooltip label="Beef Boost"><span>{{stats.beef}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="LNC Boosts"><span>{{stats.alignment}}</span></o-tooltip> + <o-tooltip label="Enhancment Buffs"><span>{{stats.enhancement}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Curse of the Wretched Debuffs"><span>{{stats.hex}}</span></o-tooltip> + <o-tooltip label="General Damage Reduction"><span>{{stats.generaldamagereduction}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Enemy Damage Reduction"><span>{{stats.enemydamagereduction}}</span></o-tooltip>) / 100))
                <br/>
                <o-tooltip label="Minimum Non-Critical Hit"><span>D3: {{D3}}</span></o-tooltip> = <o-tooltip label="From C3"><span>{{C3}}</span></o-tooltip> * (1 + ((<o-tooltip label="General Damage Boost"><span>{{stats.general}}</span></o-tooltip> + <o-tooltip label="Incense Modifier Boost"><span>{{stats.incense}}</span></o-tooltip> + <o-tooltip label="Beef Boost"><span>{{stats.beef}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="LNC Boosts"><span>{{stats.alignment}}</span></o-tooltip> + <o-tooltip label="Enhancment Buffs"><span>{{stats.enhancement}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Curse of the Wretched Debuffs"><span>{{stats.hex}}</span></o-tooltip> + <o-tooltip label="General Damage Reduction"><span>{{stats.generaldamagereduction}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Enemy Damage Reduction"><span>{{stats.enemydamagereduction}}</span></o-tooltip>) / 100))
                <br/>
                <o-tooltip label="Minimum Non-Critical Hit"><span>D4: {{D4}}</span></o-tooltip> = <o-tooltip label="From C4"><span>{{C4}}</span></o-tooltip> * (1 + ((<o-tooltip label="Limit Burst Damage"><span>{{stats.lbdamage}}</span></o-tooltip>) / 100)) * ((<o-tooltip label="General Damage Boost"><span>{{stats.general}}</span></o-tooltip> + <o-tooltip label="Incense Modifier Boost"><span>{{stats.incense}}</span></o-tooltip> + <o-tooltip label="Beef Boost"><span>{{stats.beef}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="LNC Boosts"><span>{{stats.alignment}}</span></o-tooltip> + <o-tooltip label="Enhancment Buffs"><span>{{stats.enhancement}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Curse of the Wretched Debuffs"><span>{{stats.hex}}</span></o-tooltip> + <o-tooltip label="General Damage Reduction"><span>{{stats.generaldamagereduction}}</span></o-tooltip>) / 100)) * (1 + ((<o-tooltip label="Enemy Damage Reduction"><span>{{stats.enemydamagereduction}}</span></o-tooltip>) / 100))
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Damage",
  components: {
  },
  data() {
    return {
      activeTab: "0",
      stats: {
        "primarystat": 0,
        "skillmodifier": 0,
        "expertiseclassrank": 0,
        "enemydefense": 0,
        "enemyresistance": 0,
        "affinity": 0,
        "action": 0,
        "racial": 0,
        "skillpower": 0,
        "general": 0,
        "incense": 0,
        "beef": 0,
        "alignment": 0,
        "enhancement": 0,
        "hex": 0,
        "generaldamagereduction": 0,
        "enemydamagereduction": 0,
        "lbdamage": 0
      },
      expertise: {},
      options: {},
    };
  },
  created() {
  },
  computed: {
    A1(){
      return (this.stats.primarystat * ( this.stats.skillmodifier / 100) + (this.stats.expertiseclassrank / 2) -  this.stats.enemydefense) * (this.stats.enemyresistance / 100)
    },
    A2(){
      return (this.stats.primarystat * ( this.stats.skillmodifier / 100) + (this.stats.expertiseclassrank / 2)) * (this.stats.enemyresistance / 100)
    },
    B1(){
      return this.A1 * (1 + (this.stats.affinity / 100)) * (1 + ((this.stats.action + this.stats.racial + this.stats.skillpower) / 100))
    },
    B2(){
      return this.A2 * (1 + (this.stats.affinity / 100)) * (1 + ((this.stats.action + this.stats.racial + this.stats.skillpower) / 100))
    },
    C1(){
      return this.B1 * 0.8
    },
    C2(){
      return this.B1 * 0.99
    },
    C3(){
      return this.B2 * 1.2
    },
    C4(){
      return this.B2 * 1.5
    },
    D1(){
      return this.C1 * (1 + ((this.stats.general + this.stats.incense + this.stats.beef) / 100)) * (1 + ((this.stats.alignment + this.stats.enhancement) / 100)) * (1 + ((this.stats.hex + this.stats.generaldamagereduction) / 100)) * (1 + ((this.stats.enemydamagereduction) / 100))
    },
    D2(){
      return this.C2 * (1 + ((this.stats.general + this.stats.incense + this.stats.beef) / 100)) * (1 + ((this.stats.alignment + this.stats.enhancement) / 100)) * (1 + ((this.stats.hex + this.stats.generaldamagereduction) / 100)) * (1 + ((this.stats.enemydamagereduction) / 100))
    },
    D3(){
      return this.C3 * (1 + ((this.stats.general + this.stats.incense + this.stats.beef) / 100)) * (1 + ((this.stats.alignment + this.stats.enhancement) / 100)) * (1 + ((this.stats.hex + this.stats.generaldamagereduction) / 100)) * (1 + ((this.stats.enemydamagereduction) / 100))
    },
    D4(){
      return this.C4 * (1 + ((this.stats.general + this.stats.incense + this.stats.beef) / 100)) * (1 + ((this.stats.alignment + this.stats.enhancement) / 100)) * (1 + ((this.stats.lbdamage) / 100)) * (1 + ((this.stats.hex + this.stats.generaldamagereduction) / 100)) * (1 + ((this.stats.enemydamagereduction) / 100))
    }
  },
  methods: {
  },
};
</script>

<style lang="scss">
.o-tabs__content {
  padding: 0px;
}

.toast-notification {
  margin: 0.5em 0;
  text-align: center;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  border-radius: 2em;
  padding: 0.75em 1.5em;
  pointer-events: auto;
  color: #e6d6e6;
  background: #485fc7;
}
</style>