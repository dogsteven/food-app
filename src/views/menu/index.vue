<template>
  <v-container
    id="menu-container"
  >
    <v-card
      max-width="700"
      class="mx-auto"
      elevation="0"
    >
      <v-card-text>
        <v-card
          v-for="(item, index) in $store.state.foods"
          :key="index"
          elevation="1"
          class="ma-3"
        >
          <v-img
            :src="item.photo"
            :lazy-src="item.photo"      
            max-height="130"
          >
            
          </v-img>
          <v-card-title
            @click="selectItem(index)"
          >
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.price }} VND
          </v-card-subtitle>
          <v-card-text>
            <v-expand-transition>
              <div
                v-if="selectedItem === index"
              >
                {{ item.description }}
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-card
                    elevation="0"
                  >
                    <v-card-actions>
                      <v-btn
                        icon
                        @click="quantity = quantity >= 2 ? quantity - 1 : 1"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      {{ quantity }}
                      <v-btn
                        icon
                        @click="quantity = quantity + 1"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-btn
                    text
                    color="orange"
                    @click="addItemToCart(index)"
                  >
                    Add to cart
                  </v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    addItemToCart(index) {
      let existIndex = this.$store.state.carts.findIndex(item => item.index === index)
      let exist = existIndex >= 0
      if (exist === false) {
        this.$store.commit('pushCartItem', {
          index: index,
          quantity: this.quantity
        })
      } else {
        this.$store.commit('increaseCartItemQuantity', { index: existIndex, amount: this.quantity })
      }
    },

    selectItem(index) {
      if (this.selectedItem === index) {
        this.selectedItem = null
      } else {
        this.quantity = 1
        this.selectedItem = index
      }
    }
  },
  data: () => ({
    selectedItem: null,
    quantity: 1
  })
}
</script>

<style>
</style>