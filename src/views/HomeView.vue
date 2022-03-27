<template>
  <div id="home">
    <section class="hero is-primary is-bold">
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
              <h1 class="title">ReIMAGINE Tools</h1>
              <p class="subtitle"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content">
        <h1>Click a link in the navbar up above to get started.</h1>
        <h2>
          Golden Apple Calculator
          <router-link to="/apples"
            ><o-icon
              pack="mdi"
              class="icon has-text-info"
              icon="link"
            />Link</router-link
          >
        </h2>
        <p>
          Calculate the number of Golden Apples needed to reach a level, and how
          many dungeon runs that means.
        </p>
        <h2>
          Expertise Textbook Calculator
          <router-link to="/books"
            ><o-icon
              pack="mdi"
              class="icon has-text-info"
              icon="link"
            />Link</router-link
          >
        </h2>
        <p>
          Find out how many Expertise Textbooks it will take to reach a certain
          Class/Rank.
        </p>
        <h2>
          Expertise Calculator
          <router-link to="/expertise"
            ><o-icon
              pack="mdi"
              class="icon has-text-info"
              icon="link"
            />Link</router-link
          >
        </h2>
        <p>
          Plan out your expertise build, from Chain Expertise down to specific
          skill unlocks. Supports loading data from saved urls.
        </p>
         <h2>
          Moon Phase Simulator
          <router-link to="/moonphase"
            ><o-icon
              pack="mdi"
              class="icon has-text-info"
              icon="link"
            />Link</router-link
          >
        </h2>
        <p>
          Find out the current time in ReIMAGINE and upcoming moon phases.
        </p>
        <hr />
        <p>
          Find an issue? Have a suggestion for a new feature or tool? <a href="https://github.com/Kuenaimaku/reimagine-tools/issues/new">Create an issue on GitHub</a> and I'll see what I can do. <br/>
          And for anything else not covered, check out the 
          <a href="https://wiki.reimagine.online/Main_Page">ReIMAGINE Wiki</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
hr {
  background-color: #333;
}
</style>