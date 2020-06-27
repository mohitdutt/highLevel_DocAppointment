<template>
  <div id="app">
    <Slots />
  </div>
</template>

<script>
import Slots from './components/slots';
// import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

export default {
  name: 'App',
  components: {
    Slots
  }
}
</script>

<style>
@import "https://use.fontawesome.com/releases/v5.8.1/css/all.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
