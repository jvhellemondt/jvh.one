<template>
  <div class="post-meta">
    <div class="post-meta__left">
      <div v-if="post.publised">Gepubliceerd op {{ post.date }}</div>
      <div v-else>Verwachte publicatie datum {{ post.date }}</div>
    </div>
    <template v-if="post.timeToRead">
      <div class="post-meta__right">
        <strong> {{ post.timeToRead }} min lezen</strong>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['post'],
}
</script>

<style lang="scss">
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 0.8em;
  opacity: 0.8;
  &__left {
    flex: 1 0 auto;
  }
  &__right {
    flex: 0 0 auto;
  }
}
</style>
