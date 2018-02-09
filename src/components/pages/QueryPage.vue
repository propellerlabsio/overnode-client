<template>
  <span>
    <article class="message is-warning is-hidden-tablet">
      <div class="message-header">
        <p>
          <span class="icon">
            <i class="fa fa-exclamation-triangle"></i>
          </span>
          Graph<i>i</i>QL is a powerful query tool that is best experienced on larger screens.<br/><br/>
          <router-link to="/">Return to home page.</router-link>
        </p>
      </div>
    </article>
    <iframe class="is-hidden-mobile" src="/graphql"></iframe>
  </span>
</template>

<script>

export default {
  name: 'query-page',
};
</script>

<style scoped>
  iframe {
    margin-top: -40px;
    width: 100%;
    height: calc(100% + 40px);
  }
</style>

