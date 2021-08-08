<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import themeUtil from "@/utils/themeUtil";
import {mapState} from "vuex";

export default {
    computed: {
        ...mapState('setting', [
            'theme'
        ])
    },
    watch: {
        'theme.mode': function(val) {
            let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`)
            themeUtil.changeThemeColor(this.theme.color, val).then(closeMessage)
        },
        'theme.color': function(val) {
            let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`)
            themeUtil.changeThemeColor(val, this.theme.mode).then(closeMessage)
        },
    }
}
</script>
<style>
html, body {
    width: 100%;
    height: 100%;
}
#app {
    width: 100%;
    height: 100%;
}
</style>
