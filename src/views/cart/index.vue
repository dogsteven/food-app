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
        <v-list-item>
          <v-list-item-title>
            {{ $store.state.foods[cart.index].name }}
            
          </v-list-item-title>
        </v-list-item>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
  })
}
</script>

<style>

</style>