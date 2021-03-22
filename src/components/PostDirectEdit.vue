<template>
  <div class="post-edit">
    <span>
      Direct aanpassen via
      <a :href="$static.metadata.social.github.editBlogUrl + post.fileInfo.path">
        <font-awesome :icon="['fab', 'github']"/>
        GitHub
      </a>
    </span>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<static-query>
query {
metadata {
social {
github {editBlogUrl}
}
}
}
</static-query>

<style lang="scss" scoped>
.post-edit {
  display:         flex;
  justify-content: flex-end;
  align-items:     center;
  text-align:      left;
  font-size:       0.5em;
  opacity:         0.8;
  margin-top:      24px;
}
</style>
