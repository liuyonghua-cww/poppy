<template>
  <div>
    <button
        :class="{'active': method === curMethod}"
        @click="changeMethod"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "calButton",
  props: {
    text: String,
    method: String,
    curMethod: String
  },
  methods: {
    changeMethod() {
      this.$emit('dispatch', 'CHANGE_METHOD', this.method);
    }
  }
}
</script>

<style scoped>
.active {
  background-color: yellowgreen;
  color: #fff;
}
</style>
