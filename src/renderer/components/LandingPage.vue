<template>
  <v-container fluid="fluid" class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <img id="logo" src="~@/assets/logo.png" alt="mytribe">
      </v-flex>
      <v-flex xs4 offset-xs4>
        <p class="text-md-center">
          <span class="sub-heading">Connect with your tribe now</span>
        </p>
        <div>
          <v-text-field v-model="username" name="username" label="Choose your name" value="" class="input-group--focused"></v-text-field>
          <v-text-field v-model="roomname" name="roomname" label="Choose your secret tribe name" value="" class="input-group--focused"></v-text-field>
        </div>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-0">
          <v-card-text>
            <div>
              <v-btn success dark @click="start()">Connect</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'landing-page',
  components: {},
  data() {
    return {
      username: '',
      roomname: '',
    };
  },
  methods: {
    start() {
      console.log(`Going to start the call from ${this.username} to tribe ${this.roomname}`);
      this.$router.push(`/${this.username}/calling/tribe/${this.roomname}`);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 0px;
  /* remove scrollbar space */
  background: transparent;
  /* optional: just make scrollbar invisible */
}


/* optional: show position indicator in red */

::-webkit-scrollbar-thumb {
  background: #FF0000;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 35vw;
}
</style>
