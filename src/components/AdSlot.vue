<template>
  <div class="ad-slot" :class="position">
    <span class="ad-badge">AD</span>
    <div class="ad-copy">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    default: "top"
  },
  label: {
    type: String,
    default: "애드센스 슬롯 자리"
  }
});
</script>
