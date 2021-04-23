<template>
  <div>
    <button @click="compete"> {{ text }}</button>
  </div>
</template>

<script>
export default {
  name: "counterButton",
  props: {
    text: String,
    action: String
  },
  methods: {
    compete() {
      this.$emit('compete', this.action)
    }
  }
}
</script>

<style scoped>

</style>
