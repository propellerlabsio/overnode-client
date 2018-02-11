<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column is-narrow">
            <figure class="image is-128x128">
              <img src="../../../assets/hero.png">
            </figure>
          </div>
          <div class="column titles">
            <h1 class="title is-hidden-mobile">
              Overnode
            </h1>
            <h2 class="subtitle is-hidden-mobile">
              <br/>A Bitcoin live node monitoring and explorer app powered by GraphQL.
            </h2>
            <h1 class="title is-hidden-tablet is-4">
              Overnode
            </h1>
            <h2 class="subtitle is-hidden-tablet is-6">
              <br/>Bitcoin live node monitoring and explorer.
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
  div.titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

