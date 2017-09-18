<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card class="grid">
        <v-toolbar>
          <v-toolbar-title class="grey--text text--darken-4">{{$route.params.username}} :: Room :: {{$route.params.roomname}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn primary dark @click="start()">
              <span @click.native="start()" class="grey--text text--darken-2">Start</span>
            </v-btn>
            <v-btn primary dark @click="onReady()">
              <span class="grey--text text--darken-2">Join</span>
            </v-btn>
            <v-btn primary dark @click="disconnect()">
              <span class="grey--text text--darken-2">Disconnect</span>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs6>
              <v-select append-icon="" v-bind:items="audioDevices" v-model="selectedAudioDevice" item-text="label" label="Select Audio Device" single-line bottom></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select append-icon="" v-bind:items="videoDevices" v-model="selectedVideoDevice" item-text="label" label="Select Video Device" single-line bottom></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4 v-for="remote in remotes" v-bind:key="remote.peer.id" id="remoteVideos2">
              <!--<div v-bind:id="'container_'+this.webrtc.getDomId(remote.peer)" class="videoContainer">{{remote.video}}</div>-->
            </v-flex>
            <video id="localVideo" autoplay></video>
            <div id="remoteVideos"></div>
          </v-layout>
        </v-container>
        <v-footer class="mt-5">

        </v-footer>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  name: 'call-page',
  data() {
    return {
      connecting: true,
      selectedAudioDevice: null,
      selectedVideoDevice: null,
      audioDevices: [],
      videoDevices: [],
      mediaOptions: {
        audio: true,
        video: true,
      },
      webrtc: null,
      remotes: [],
    };
  },
  created() {
    const self = this;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log('Got details of devices to process!');
      for (let i = 0; i !== devices.length; i += 1) {
        let device = devices[i];
        if (device.kind === 'audioinput') {
          // device.label = `${device.label} microphone ${(self.audioDevices.length + 1)}`;
          self.audioDevices.push(device);
        } else if (device.kind === 'videoinput') {
          // device.label = `${device.label} camera ${(self.videoDevices.length + 1)}`;
          self.videoDevices.push(device);
        }
        console.log(device.label);
      }
    });
  },
  methods: {
    addPeer(video, peer) {
      console.log(`video added ${peer.id}`);
      this.remotes.push({ video, peer });
    },
    removePeer(video, peer) {
      console.log(`Removing Peer ${peer.id}`);
    },
    disconnect() {
      console.log('Disconnecting');
      this.webrtc.leaveRoom();
      console.log('Left the room');
      this.webrtc.disconnect();
      console.log('Disconnected');
    },
    onReady() {
      console.log('Ready to call');
      this.webrtc.joinRoom(this.$route.params.username);
    },
    start() {
      this.webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos',
        // immediately ask for camera access
        autoRequestMedia: true,
        // detectSpeakingEvents: true,
        debug: false,
        nick: this.$route.params.username,
        media: this.mediaOptions,
        peerConnectionConfig: {
          iceServers: [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'turn:numb.viagenie.ca', username: 'diode123@yopmail.com', credential: 'diode123' },
          ],
        },
      });
      window.webrtc = this.webrtc;
      console.log('Initialized WebRTC!');

      this.webrtc.on('readyCall', this.onReady);
      this.webrtc.on('videoAdded', this.addPeer);
      this.webrtc.on('videoRemoved', this.removePeer);
    },
  },
};
</script>

<style>
#remoteVideos video {
  height: 150px;
}

#localVideo {
  height: 150px;
}
</style>
