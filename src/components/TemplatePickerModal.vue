<template>
  <div class="modal-backdrop" :class="{ open: open }" @click.self="$emit('close')">
    <div class="modal-panel">
      <div class="modal-head">
        <div>
          <h3>템플릿 선택</h3>
          <p>템플릿을 고르면 내용 섹션에 바로 입력 가능한 블록이 생성됩니다.</p>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="template-grid">
        <article
          v-for="template in templates"
          :key="template.key"
          class="template-card"
          @click="$emit('select', template.key)"
        >
          <strong>{{ template.name }}</strong>
          <p>{{ template.description }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  templates: {
    type: Array,
    default: () => []
  }
});

defineEmits(["close", "select"]);
</script>
