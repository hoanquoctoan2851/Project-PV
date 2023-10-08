<template>
  <div class="layout-create">
    <div class="layout-create__content padding-side-global">
      <div class="w-full max-w-[1200px] flex flex-col items-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutCreate',
  setup() {}
}
</script>
<style lang="scss">
@import '@/design/variable.scss';
.layout-create {
  @apply w-full flex flex-col justify-center;

  .layout-create__header {
    background: $color-white;
    z-index: 1000;
    height: $height-header-create;
    border-bottom: 1px solid $white-01;
    @apply w-full max-w-[1920px] flex py-3 fixed top-0 right-0 left-0 bg-neutral-0;
  }
  .layout-create__content {
    min-height: calc(100vh - $height-header-create);
    padding-top: 48px;
    padding-bottom: 80px;
    @apply flex items-center flex-col;
  }
}
</style>
