<template>
  <section class="hero is-light">
    <div class="hero-body is-hidden-touch">
      <div class="container">
        <div class="columns is-flex has-background-image">
          <div class="column titles has-text-centered">
            <h2 class="subtitle is-2">
              <img src="../../../assets/logo-hero.png" alt="overnode"/>
              <span class="tag is-danger">Beta</span>
            </h2>
            <h2 class="subtitle">
              Bitcoin live node monitoring and explorer powered by GraphQL.
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-body is-hidden-desktop">
      <div class="container">
        <div class="columns is-mobile is-flex">
          <div class="column titles has-text-centered">
            <h2 class="subtitle">
              Bitcoin live node monitoring and explorer.
              <span class="tag is-danger">Beta</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hero-banner',
};
</script>

<style scoped>
  section.hero {
    /* margin-top: -40px; */
    margin-bottom: 30px;
  }
  div.hero-body {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  div.has-background-image {
    background-image: url('../../../assets/hero-at-logo-width.png');
    background-repeat: no-repeat;
    background-size: 188px 125px;
    height: 125px;
  }

  div.titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2.subtitle.is-2 {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
  span.tag {
    margin-top: -6px;
  }
</style>

