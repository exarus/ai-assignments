<script>
export default {
  name: 'GlobalNavigation'
}
</script>

<template lang="pug">
  .navigation
    img(src="~@/assets/ai.svg")
    h1 Welcome to the world of artificial intelligence
    h2 Artificial Intelligence
    ul
      li
        router-link(to='/ai/vacuum-cleaner-world') Vacuum Cleaner World
      li
        router-link(to='/ai/8-puzzle') 8-Puzzle Problem
    h2 GameDev
    ul
      li
        router-link(to='/game-dev/8-puzzle') 8-Puzzle Game
    h2 Contact me
    ul.author
      li
        a(href='https://www.linkedin.com/in/exarus/' target='_blank')
          i.fa.fa-linkedin-square
        a(href='https://github.com/exarus' target='_blank')
          i.fa.fa-github
        a(href='https://t.me/exarus' target='_blank')
          i.fa.fa-telegram
        a(href='https://twitter.com/_exarus' target='_blank')
          i.fa.fa-twitter
        a(href='https://www.facebook.com/mr.exarus' target='_blank')
          i.fa.fa-facebook-official
</template>

<style scoped>
.navigation {
  text-align: center;
}

.navigation > img {
  max-height: 40vmin;
}

.author {
  font-size: 40px;

  & i {
    margin: 0 0.5em;
  }

  & .fa-github {
    color: black;
  }

  & .fa-facebook-official {
    color: #415896;
  }

  & .fa-linkedin-square {
    color: #2675b3;
  }

  & .fa-twitter {
    color: #1da1f2;
  }

  & .fa-telegram {
    color: #2f83d5;
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
