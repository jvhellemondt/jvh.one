<template>
  <div class="post-edit">
    <div>
      Direct aanpassen via
      <a
        :href="$static.metadata.social.gitlab.editBlogUrl + post.fileInfo.path"
      >
        <font-awesome :icon="['fab', 'gitlab']" /> GitLab
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
}
</script>

<static-query>
query {
  metadata {
    social {
      gitlab {editBlogUrl}
    }
  }
}
</static-query>

<style lang="scss" scoped>
.post-edit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: left;
  font-size: 0.5em;
  opacity: 0.8;
  margin-top: 24px;
}
</style>
