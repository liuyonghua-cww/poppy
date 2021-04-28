<template>
    <div class="main">
        <tab />
    </div>
</template>

<script>
/**
 * 页面组件：承载多个组件的容器
 * 页面组件尽量不要放任何数据和方法
 */
import Tab from '@/components/Tab'
export default {
    components: {
        Tab
    }
}
</script>

<style scoped lang="scss">
.main {

}

</style>
