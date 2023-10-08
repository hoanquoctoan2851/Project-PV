<template>
  <a-config-provider :locale="viVN">
    <RouterView></RouterView>
  </a-config-provider>
</template>
<script setup>
import viVN from 'ant-design-vue/es/locale/vi_VN'
</script>
