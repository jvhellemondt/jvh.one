<template>
  <div
    :class="{ 'post-card--has-poster': post.poster }"
    class="post-card content-box"
  >
    <div class="post-card__header">
      <g-image
        v-if="post.cover_image"
        :src="post.cover_image"
        alt="Cover image"
        class="post-card__image"
      />
      <div class="post-card__credit_wrap" v-if="hasCoverCredit">
        <span class="post-card__credit" v-html="coverCreditMarkdown" />
      </div>
    </div>
    <div class="post-card__content">
      <h2 class="post-card__title" v-html="post.title" />
      <p class="post-card__description" v-html="post.description" />

      <PostMeta :post="post" class="post-card__meta" />
      <PostTags :post="post" class="post-card__tags" />

      <g-link :to="post.path" class="post-card__link">Link</g-link>
    </div>
  </div>
</template>

<script>
import PostMeta from '@/components/PostMeta'
import PostTags from '@/components/PostTags'
import marked from 'marked'

export default {
  components: {
    PostMeta,
    PostTags,
  },
  props: ['post'],
  computed: {
    hasCoverCredit(){
      return !!this?.post?.cover_credit
    },
    coverCreditMarkdown() {
      return marked.parseInline(this.post.cover_credit);
    },
  }
}
</script>

<style lang="scss" scoped>
.post-card {
  margin-bottom: var(--space);
  position:      relative;

  &__header {
    border-radius: var(--radius) var(--radius) 0 0;
    margin-bottom: calc(var(--space) / 2);
    margin-left:   calc(var(--space) * -1);
    margin-right:  calc(var(--space) * -1);
    margin-top:    calc(var(--space) * -1);
    overflow:      hidden;
    position:      relative;

    &:empty {
      display: none;
    }
  }

  &__credit {
    color:        black;
    margin-right: 8px;
  }

  &__credit_wrap {
    background: rgba(0, 0, 0, 0.5);
    color:      rgba(200, 200, 200, 0.87);
    position:   absolute;
    right:      0;
    text-align: right;
    top:        0;
    width:      100%;
  }

  &__image {
    min-width: 100%;
  }

  &__title {
    margin-top: 0;
  }

  &:hover {
    box-shadow: 1px 10px 30px 0 rgba(0, 0, 0, 0.1);
    transform:  translateY(-5px);
  }

  &__tags {
    position: relative;
    z-index:  1;
  }

  &__link {
    height:      100%;
    left:        0;
    opacity:     0;
    overflow:    hidden;
    position:    absolute;
    text-indent: -9999px;
    top:         0;
    width:       100%;
    z-index:     0;
  }
}
</style>
