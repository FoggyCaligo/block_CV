<template>
  <div class="preview-paper">
    <div class="paper-header">
      <div class="paper-avatar"></div>
      <div>
        <h3 class="paper-title">{{ resume.profile.name }}</h3>
        <div class="paper-meta">
          {{ resume.profile.phone }} · {{ resume.profile.email }} · {{ resume.profile.github_url }}<br />
          {{ resume.profile.address }} · {{ resume.profile.short_intro }}
        </div>
      </div>
    </div>

    <div
      v-for="item in resume.items"
      :key="item.id"
      class="paper-section"
    >
      <h5>{{ sectionLabel(item.template_type) }}</h5>

      <div v-if="item.display_type === 'chart'" class="bars">
        <div
          v-for="row in item.content_json.items"
          :key="row.name"
          class="bar-row"
        >
          <span>{{ row.name }}</span>
          <div class="bar"><span :style="{ width: `${row.score}%` }"></span></div>
          <strong>{{ row.level }}</strong>
        </div>
      </div>

      <div v-else class="paper-entry">
        <strong>{{ item.title }}</strong>
        <span>{{ item.subtitle }}</span>
        <p v-for="bullet in item.content_json.bullets" :key="bullet">{{ bullet }}</p>
      </div>
    </div>

    <div class="paper-section">
      <h5>자기소개서</h5>
      <div class="paper-entry">
        <p>{{ resume.self_intro_text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resume: {
    type: Object,
    required: true
  }
});

function sectionLabel(type) {
  const labels = {
    experience: "경력",
    portfolio: "포트폴리오",
    education: "학력",
    award: "수상내역",
    language: "언어능력",
    skill: "기술스택"
  };
  return labels[type] || type;
}
</script>
