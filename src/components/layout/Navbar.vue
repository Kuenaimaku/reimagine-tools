<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-menu">
			<div class="navbar-start">
				<router-link to="/" class="navbar-item">Home</router-link>
				<router-link to="/apples" class="navbar-item"><o-icon pack="mdi" class="icon has-text-warning" icon="food-apple"/><span class="is-hidden-touch">Golden Apples</span><span class="is-hidden-widescreen is-hidden-desktop-only">Apples</span></router-link>
				<router-link to="/books" class="navbar-item"><o-icon pack="mdi" class="icon has-text-info" icon="book-open-page-variant"/><span class="is-hidden-touch">Expertise Textbooks</span><span class="is-hidden-widescreen is-hidden-desktop-only">Books</span></router-link>
			</div>
		</div>
	</nav>
</template>

<style scoped>
	.o-icon {
	margin: 0px 0.25em !important;
}

.navbar, .navbar-menu, .navbar-start, .navbar-end {
    align-items: stretch;
    display: flex;
}
</style>