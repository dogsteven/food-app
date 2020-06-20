<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="isShowDrawer"
    >
      <v-list>
        <v-list-item
          to='/menu'
        >
          <v-list-item-icon>
            <v-icon>fas fa-hamburger</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Menu
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to='/profile'
        >
          <v-list-item-icon>
            <v-icon>fas fa-user-alt</v-icon>
            </v-list-item-icon>
          <v-list-item-title>
            Profile
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="signout"
        >
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Sign out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="orange"
      dark
      v-if="$store.state.customer.id !== null"
    >
      <v-app-bar-nav-icon
        @click="isShowDrawer = !isShowDrawer"
      >
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        text
        small
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <v-btn
        to="/cart"
        text
        small
      >
        <v-badge
          :color="$store.state.carts.length == 0 ? 'transparent' : 'error'"
          :content="$store.state.carts.length"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
        ma-0
        pa-0
      >
        <router-view>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import http from './http'
import FoodItem from './models/food-item'

export default {
  name: 'App',

  methods: {
    signout() {
      localStorage.removeItem('customer')
      let emptyInfo = {
        id: null,
        info: {
          username: null,
          firstname: null,
          lastname: null,
          email: null
        }
      }
      this.$store.commit('setCustomer', emptyInfo)
      this.$router.go('/sign-in-up')
    }
  },

  created() {
    let customer = JSON.parse(localStorage.getItem('customer'))
    if (customer !== null)
      if (('id' in customer) && ('info' in customer))
        this.$store.commit('setCustomer', customer)
      else {
        localStorage.removeItem('customer')
        this.$router.go('/sign-in-up')
      }

    http.server.get('/food-item').then((response) => {
      let data = response.data
      for (let item of data) {
        let foodItem = new FoodItem(item.id, item.vendorID, item.name, item.price, item.quantity, item.categories, item.description, item.photo)
        this.$store.commit('pushFoodItem', foodItem)
      }
    })
  },

  data: () => ({
    isShowDrawer: false
  }),
};
</script>
