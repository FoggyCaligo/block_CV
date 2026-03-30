<template>
  <article class="block-card">
    <div class="block-top">
      <div>
        <h4 class="block-title">{{ block.title }}</h4>
        <p class="block-sub">{{ block.subtitle }}</p>
      </div>

      <div v-if="mode === 'manage'" class="icon-actions">
        <button class="icon-btn" title="복제">⧉</button>
        <button class="icon-btn" title="수정">✎</button>
        <button class="icon-btn" title="삭제">🗑</button>
      </div>

      <button
        v-else-if="mode === 'select'"
        class="btn primary btn-inline"
        type="button"
      >
        + 추가
      </button>
    </div>

    <div class="block-body">
      <div class="chip-row">
        <span class="pill">{{ block.template_type }}</span>
        <span class="pill">{{ block.display_type }}</span>
        <span v-for="tag in block.tags_json" :key="tag" class="pill">{{ tag }}</span>
      </div>

      <div v-if="block.display_type === 'chart' && block.content_json.items" class="bars">
        <div
          v-for="item in block.content_json.items"
          :key="item.name"
          class="bar-row"
        >
          <span>{{ item.name }}</span>
          <div class="bar"><span :style="{ width: `${item.score}%` }"></span></div>
          <strong>{{ item.level }}</strong>
        </div>
      </div>

      <ul v-else class="mini-list">
        <li v-for="bullet in block.content_json.bullets" :key="bullet">{{ bullet }}</li>
      </ul>
    </div>
  </article>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: "manage"
  }
});
</script>
