<template>
  <div>
    <mdb-navbar position="top" dark color="indigo" scrolling>
      <mdb-navbar-brand href="#">Smr ExtremeSoft </mdb-navbar-brand>

    </mdb-navbar>
    <div style="height: 100vh">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {
    mdbNavbar,
    mdbNavbarBrand
  } from "mdbvue";
  export default {
    name: "NavigationPage",
    components: {
      mdbNavbar,
      mdbNavbarBrand
    }
  };
</script>

<style scoped>

  .navbar .dropdown-menu a:hover {
    color: inherit !important;
  }
  </style>
