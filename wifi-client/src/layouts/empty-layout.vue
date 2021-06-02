<template>
    <div class="empty-layout">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "am-empty-layout"
    }
</script>

<style scoped>
    .empty-layout{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>