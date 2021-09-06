<template>
    <div class="menus">
        <a-menu mode="horizontal">
            <a-sub-menu key="sub1">
                <!--<span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>-->
                <span slot="title">
                    <span>文件</span>
                </span>
                <!--<a-menu-item key="9">-->
                <!--    Option 9-->
                <!--</a-menu-item>-->
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <!--<span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>-->
                <span slot="title">
                    <span>编辑</span>
                </span>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
export default {
    name: "index"
};
</script>

<style scoped lang="less">
.menus {
    width: 100%;
    height: 40px;
    > .ant-menu-horizontal {
        padding-left: 20px;
        line-height: 40px;
        height: 100%;
    }
}

</style>
