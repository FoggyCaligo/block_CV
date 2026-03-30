<template>
  <div class="hero">
    <div>
      <div class="status-pill">{{ kicker }}</div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="hero-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  kicker: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" }
});
</script>
