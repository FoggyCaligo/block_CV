<template>
  <div class="stat-card">
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-desc">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  description: String
});
</script>
