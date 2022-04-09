<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<input type="checkbox" id="toggler" role="button" class="toggler" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" />
		<div class="navbar-brand">
			<router-link to="/" class="navbar-item">
				<img id="brand" src="/brand.png" alt="ReIMAGINE Tools" width="123" height="28">
			</router-link>

			<label for="toggler" class="navbar-burger burger" >
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</label>
		</div>

		<div class="navbar-menu" id="navMenu">
			<div class="navbar-start">
				<router-link to="/apples" class="navbar-item"><o-icon pack="mdi" class="icon has-text-warning" icon="food-apple"/><span class="is-hidden-touch">Golden Apples</span><span class="is-hidden-widescreen is-hidden-desktop-only">Apples</span></router-link>
				<router-link to="/books" class="navbar-item"><o-icon pack="mdi" class="icon has-text-info" icon="book-open-page-variant"/><span class="is-hidden-touch">Expertise Textbooks</span><span class="is-hidden-widescreen is-hidden-desktop-only">Books</span></router-link>
				<router-link to="/damage" class="navbar-item"><o-icon pack="mdi" class="icon has-text-primary" icon="calculator-variant"/><span>Damage</span></router-link>
				<router-link to="/expertise" class="navbar-item"><o-icon pack="mdi" class="icon has-text-success" icon="arm-flex"/><span>Expertise</span></router-link>
				<router-link to="/moonphase" class="navbar-item"><o-icon pack="mdi" class="icon has-text-warning" icon="moon-waning-crescent"/><span>Moonphase</span></router-link>
				<router-link to="/timed-demons" class="navbar-item"><o-icon pack="mdi" class="icon has-text-danger" icon="emoticon-devil-outline"/><span>Demon Schedule</span></router-link>
			</div>

			<div class="navbar-end">
				<router-link to="/character" class="navbar-item"><o-icon pack="mdi" class="icon has-text-danger" icon="card-account-details"/><span>Character Builder</span></router-link>
				<a href="https://wiki.reimagine.online/Main_Page" class="navbar-item"><o-icon pack="mdi" class="icon" icon="wikipedia"/><span>ReIMAGINE Wiki</span></a>
			</div>
		</div>
	</nav>
</template>

<style lang="scss" scoped>

.has-text-primary {
	color: hsl(275, 20%, 50%) !important;
}

//We don't want menu to be displayed on mobile by default
@media screen and (max-width: 1024px) {
  .navbar-menu {
    display: none;
  }
}
//We don't need checkbox to be displayed in order for it to work
.toggler {
  display: none;
}
//Below are all the functionalities:
.navbar .toggler:checked {
  //Hamburger changes to X when toggler is checked
  & + .navbar-brand .burger {
    & span:nth-child(1) {
      -webkit-transform: translateY(5px) rotate(45deg);
      transform: translateY(5px) rotate(45deg);
    }
    & span:nth-child(2) {
      opacity: 0;
    }
    & span:nth-child(3){
      -webkit-transform: translateY(-5px) rotate(-45deg);
      transform: translateY(-5px) rotate(-45deg);
    }
  }
  //Displays menu when toggler is checked only on mobile/tablet
  & ~ .navbar-menu {
    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
}
	.o-icon {
	margin: 0px 0.25em !important;
}
</style>