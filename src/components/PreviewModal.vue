<template>
  <div class="modal-backdrop" :class="{ open: open }" @click.self="$emit('close')">
    <div class="modal-panel">
      <div class="modal-head">
        <div>
          <h3>{{ title }}</h3>
          <p>{{ subtitle }}</p>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="preview-sheet">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  title: String,
  subtitle: String
});

defineEmits(["close"]);
</script>
