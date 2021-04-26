<template>
  <div>
    <cal-result :result="result"/>
    <div class="inputs">
      <cal-input
          field="firstNumber"
          @dispatch="dispatch"
      />
      <cal-input
          field="secondNumber"
          @dispatch="dispatch"
      />
    </div>
    <div class="buttons">
      <cal-button
          :curMethod="curMethod"
          method="plus"
          text="+"
          @dispatch="dispatch"
      />
      <cal-button
          :curMethod="curMethod"
          method="minus"
          text="-"
          @dispatch="dispatch"
      />
      <cal-button
          :curMethod="curMethod"
          method="mul"
          text="*"
          @dispatch="dispatch"
      />
      <cal-button
          :curMethod="curMethod"
          method="div"
          text="/"
          @dispatch="dispatch"
      />

    </div>
  </div>
</template>

<script>
import calResult from "@/components/calculate/calResult";
import calInput from "@/components/calculate/calInput";
import calButton from "@/components/calculate/calButton";
import dispatch from '@/dispatchers/calculate'

export default {
  components: {
    calButton,
    calInput,
    calResult
  },
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      curMethod: 'plus',
      result: 0
    }
  },
  methods: {
    dispatch(...args) {
      dispatch(this)(...args);
    }
  }
}
</script>

<style scoped>
.buttons {
  display: flex;
}

.buttons > div {
  margin-right: 5px;
}
</style>
