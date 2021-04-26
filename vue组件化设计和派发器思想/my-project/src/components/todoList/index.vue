<template>
  <div>
    <td-title :title="title" />
    <td-form @dispatch="dispatch" />
    <td-list :todoData="todoData" @dispatch="dispatch" />
  </div>
</template>

<script>
import TdTitle from "@/components/todoList/title";
import TdForm from "@/components/todoList/form";
import TdList from "@/components/todoList/list/index";
import dispatch from '@/dispatchers/list'
export default {
  name: "index",
  components: { TdList, TdForm, TdTitle },
  data() {
    return {
      title: "TODO LIST",
      todoData: [],
    };
  },
  methods: {
    dispatch(...args) {
      dispatch(this)(...args);
    }
  }
};
</script>

<style scoped></style>
