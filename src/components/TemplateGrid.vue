<template>
  <div class="card">
    <div class="card-header">
      <div>
        <h3>새 블록 만들기</h3>
        <p>템플릿을 먼저 고른 뒤, 해당 템플릿 폼으로 이동하는 구조를 가정합니다.</p>
      </div>
    </div>

    <div class="template-grid">
      <article v-for="template in templates" :key="template.key" class="template-card">
        <strong>{{ template.name }}</strong>
        <p>{{ template.description }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
defineProps({
  templates: {
    type: Array,
    required: true
  }
});
</script>
