<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">Trader&nbsp;<span class="font-weight-light"></span></span>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                <router-link :to="item.path" style="text-decoration: none;"><a class="grey--text" >{{ item.text }}</a></router-link> 
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content fluid 
        class="grey lighten-4 fill-height"> 
          <router-view/>
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12" md="8">
           
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      source: String,
    },
    name: 'App',
    components: {
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'add', text: 'Create Trade' , path: '/create'},
      ],
    }),
    mounted() {

  },
created() {
            this.$eventHub.$on('change-profile', this.changeP)
        },
          methods: {

            changeP(p) 
            {   console.log("----"+p)
                this.profile2 = p;
            }

        }

  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>