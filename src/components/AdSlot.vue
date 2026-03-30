<template>
  <div class="ad-slot">
    <span class="ad-badge">AD</span>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: "애드센스 슬롯 자리" }
});
</script>
