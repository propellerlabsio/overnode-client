<template>
  <div>
    <page-title title="Donations"/>
    <p>Thank you for your interest in supporting this project. You may send donations to:</p>
    <br/>
    <p>
      <span class="tag is-large is-success is-hidden-mobile">
        {{ address }}
      </span>
      <span class="tag is-success is-hidden-tablet">
        {{ address }}
      </span>
    </p>
    <br/>
    <p>
        Thanks!
    </p>
  </div>
</template>

<script>
import PageTitle from '../misc/PageTitle';

export default {
  name: 'donations-page',
  data() {
    return {
      address: 'bitcoincash:qqtfhm837rqfteckfm5khxj69y8yyscywc6g4e70em',
    };
  },
  components: {
    PageTitle,
  },
};
</script>

