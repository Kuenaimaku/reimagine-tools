<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-48x48">
						<img :src="'./img/expertise/' + skill.slug +'.png'" :alt="skill.name">
					</figure>
				</div>
				<div class="media-content">
					<p class="title is-6">{{skill.name}}</p>
					<p class="subtitle is-7">{{info}}</p>
				</div>
			</div>

			<div class="content">
				{{skill.desc}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'SkillTooltip',
  components:{
  },
  props: {
    skill: {
      type: Object,
      required: true,
    },
  },
	computed:{
		info(){
			let r = this.skill.type;

			if(this.skill.action){
				r += ` • ${this.skill.action}`
			}

			if(this.skill.cost){
				r += ` • ${this.skill.cost}`
			}

			if(this.skill.affinity){
				r += ` • ${this.skill.affinity}`
			}

			if(this.skill.stack && this.skill.stack === 1){
				r += ` • ${this.skill.stack} stack`
			}
			else if(this.skill.stack && this.skill.stack !== 1){
				r += ` • ${this.skill.stack} stacks`
			}

			return r;
		}
	}
}
</script>

<style lang="scss" scoped>
.o-tip__content--multiline{
	width:300px;
}

.o-tip__content{
	max-width: 300px;
}

.subtitle.is-7{
	font-style: italic;
}

.card{ 
	text-align: left;

	.media:not(:last-child) {
    margin-bottom: 0.5rem;
}
	.media-left {
			margin-right: 0.5rem;
	}
}

</style>