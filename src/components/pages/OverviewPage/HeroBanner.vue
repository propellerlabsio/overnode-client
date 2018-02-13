<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column titles has-text-centered">
            <h1 class="title is-hidden-mobile">
              overnode.org
              <span class="tag is-danger">Beta</span>
            </h1>
            <h2 class="subtitle is-hidden-mobile">
              Bitcoin live node monitoring and explorer powered by GraphQL.
            </h2>
            <h1 class="title is-hidden-tablet is-4">
              overnode.org
            </h1>
            <h2 class="subtitle is-hidden-tablet is-6">
              Bitcoin live node monitoring and explorer.
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
    background-image: url('../../../assets/hero.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  div.titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    padding-top: 5px;
  }
  span.tag {
    margin-top: -6px;
  }
</style>

