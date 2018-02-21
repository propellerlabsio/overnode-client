// This page is to be displayed when the server is in "prioritySyncing" mode.
// In this mode, all services are degraded and the website is not-functional.
// We use the term "Upgrading" in the text to the user here because it is
// more understandable.
<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message is-overnode-dark">
        <div class="message-header">
          <img src="../../assets/logo-navbar.png" alt="Overnode logo"/>
        </div>
        <div class="message-body">
          <div class="columns">
            <div class="column is-narrow side-icon">
              <span class="icon is-large has-text-overnode-dark">
                <i class="fa fa-wrench fa-3x"></i>
              </span>
            </div>
            <div class="column">
              <p>
                We are currently upgrading our server.</p>
              <br/>
              <p>
                Please come back again later or leave this page open and you will be redirected
                automatically when the upgrade has finished.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
  div.column.side-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
</style>
