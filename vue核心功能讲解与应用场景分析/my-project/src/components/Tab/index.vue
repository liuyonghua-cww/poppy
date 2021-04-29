<template>
    <div class="tab">
        <tab-nav
            :navData="navData"
        />
        <tab-content
            :contentData="contentData"
        />
    </div>
</template>

<script>
import TabNav from '@/components/Tab/Nav';
import TabContent from '@/components/Tab/Content'
export default {
    components: {
        TabNav,
        TabContent
    },
    data() {
        return {
            navData: ['选项1', '选项2', '选项3'],
            contentData: ['内容1', '内容2', '内容3'],
            curIndex: 0
        }
    }
}
</script>

<style scoped lang="scss">
.tab {
    width: 500px;
    height: 500px;
    border: 1px solid skyblue;
}

</style>
