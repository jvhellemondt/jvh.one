<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>

      <PostMeta :post="$page.post"/>
    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image
            v-if="$page.post.cover_image"
            :src="$page.post.cover_image"
            alt="Cover image"
        />
        <div class="post__credit_wrap" v-if="hasCoverCredit">
          <span class="post__credit" v-html="coverCreditMarkdown"/>
        </div>
      </div>

      <div class="post__content">
        <VueRemarkContent/>
      </div>

      <div class="post__content">
        Mocht je vragen hebben, dan mag je die mij natuurlijk stellen! Je kunt ze stellen door een e-mail te sturen naar
        <a href="mailto:me@jvh.one">me@jvh.one</a>
        <span v-if="$page.post.tweet"> of door te reageren op deze Tweet:</span>
        <Tweet v-if="$page.post.tweet"
               :id="$page.post.tweet"
               :options="{ hideTread: false, hideMedia: false, align: 'center', omitScript: true }"/>
      </div>
      <div class="post__footer">
        <PostTags :post="$page.post"/>
        <PostDirectEdit :post="$page.post"/>
      </div>
    </div>

    <div class="post-comments">
      <!-- Add comment widgets here -->
    </div>

    <Author class="post-author"/>
  </Layout>
</template>

<script>
import Author from '@/components/Author.vue'
import PostDirectEdit from '@/components/PostDirectEdit'
import PostMeta from '@/components/PostMeta'
import PostTags from '@/components/PostTags'
import marked from 'marked'
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet,
    Author,
    PostMeta,
    PostTags,
    PostDirectEdit
  },
  computed: {
    hasCoverCredit() {
      return !!this?.$page?.post?.cover_credit
    },
    coverCreditMarkdown() {
      return marked.parseInline(this.$page.post.cover_credit)
    },
    getCoverImage() {
      console.log(this.$page.post.cover_image)
      let coverImage = ''
      const cover = this.$page.post.cover_image
      if (cover != null) {
        coverImage = `${this.getBaseUrl}${this.$page.post.cover_image}`
      }
      return coverImage
    },
    getBaseUrl() {
      return process.env.GRIDSOME_BASE_URL
    }
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:description',
          content: this.$page.post.description
        },
        {
          name: 'twitter:title',
          content: this.$page.post.title
        },
        {
          name: 'twitter:site',
          content: '@jvhellemondt'
        },
        {
          name: 'twitter:image',
          content: this.getCoverImage
        },
        {
          name: 'twitter:creator',
          content: '@jvhellemondt'
        }
      ],
      script: [
        {
          src: 'https://platform.twitter.com/widgets.js',
          async: true,
          defer: true,
          id: 'twitter-wjs',
          type: 'text/javascript'
        }
      ]
    }
  }
}
</script>

<page-query>
query Post ($id: ID!) {
post: post (id: $id) {
title
path
date (format: "D MMMM YYYY", locale: "nl-nl")
published
fileInfo {
path
name
directory
extension
}
tags {
id
title
path
}
description
content
cover_image (width: 860, height: 425, blur: 10)
cover_credit
tweet
}
}
</page-query>

<style lang="scss" scoped>
.post-title {
  margin:     0 auto;
  max-width:  var(--content-width);
  padding:    calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {
  &__header {
    border-radius: var(--radius) var(--radius) 0 0;
    margin-bottom: calc(var(--space) / 2);
    margin-left:   calc(var(--space) * -1);
    margin-top:    calc(var(--space) * -1);
    overflow:      hidden;
    position:      relative;
    width:         calc(100% + var(--space) * 2);

    img {
      width: 100%;
    }

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

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      color:     var(--title-color);
      font-size: 1.2em;
    }

    img {
      display:     block;
      margin-left: calc(var(--space) * -1);
      max-width:   none;
      width:       calc(100% + var(--space) * 2);
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
