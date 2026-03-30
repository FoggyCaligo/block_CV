<template>
  <div class="hero">
    <div>
      <div class="kicker">{{ kicker }}</div>
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
  kicker: String,
  title: String,
  description: String
});
</script>
