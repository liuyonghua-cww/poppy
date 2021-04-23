<template>
  <div>
    <counter-result :result="result"></counter-result>
    <div>
      <counter-button
          action="plus"
          text="+"
          @compete="compete"
      />
      <counter-button
          action="minus"
          text="-"
          @compete="compete"
      />
    </div>
  </div>
</template>

<script>
import CounterResult from './counterResult';
import counterButton from "./counterButton";

export default {
  name: "index",
  components: {
    CounterResult,
    counterButton
  },
  data() {
    return {
      result: 0
    }
  },
  methods: {
    compete(action) {
      switch (action) {
        case 'plus':
          this.result++;
          break;
        case 'minus':
          this.result--;
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>
