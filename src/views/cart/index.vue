<template>
  <v-container
    id="card-container"
  >
    <v-card
      class="mx-auto"
      max-width="700"
      elevation="0"
    >
      <v-card
        v-for="(cart, index) in $store.state.carts"
        :key="index"
        elevation="1"
        class="ma-3"
      >
        
          <v-img
            :src="$store.state.foods[getFoodItemIndexByID(cart.foodID)].photo"
            max-height="130"
          >
          </v-img>
        
        <v-card-title>
          {{ $store.state.foods[getFoodItemIndexByID(cart.foodID)].name }}
        </v-card-title>
        <v-card-subtitle>
          Số lượng: {{ cart.quantity }}, tổng giá: {{ $store.state.foods[getFoodItemIndexByID(cart.foodID)].price * cart.quantity }} VND
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card
            elevation="0"
          >
            <v-card-actions>
              <v-btn
                icon
                @click="$store.commit('decreaseCartItemQuantity', { index: index, amount: 1 })"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="$store.commit('increaseCartItemQuantity', { index: index, amount: 1 })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-btn
            text
            color="red"
            @click="$store.commit('removeItemFromCart', index)"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    getFoodItemIndexByID(id) {
      return this.$store.state.foods.findIndex(item => item.id === id)
    }
  },
  data: () => ({
    
  })
}
</script>

<style>

</style>