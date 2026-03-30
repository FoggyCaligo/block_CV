<template>
  <div class="card">
    <div class="card-header">
      <div>
        <h3>사진 + 개인정보</h3>
        <p>이력서 상단에 고정으로 들어가는 기본 프로필 자산입니다.</p>
      </div>
      <div class="chip-row">
        <span class="chip">고정 블록</span>
        <span class="chip">재사용 가능</span>
      </div>
    </div>

    <div class="profile-panel">
      <div class="avatar">{{ initials }}</div>
      <div class="info-grid">
        <div class="info-item"><small>이름</small><strong>{{ profile.name }}</strong></div>
        <div class="info-item"><small>연락처</small><strong>{{ profile.phone }}</strong></div>
        <div class="info-item"><small>이메일</small><strong>{{ profile.email }}</strong></div>
        <div class="info-item"><small>거주지역</small><strong>{{ profile.address }}</strong></div>
        <div class="info-item"><small>GitHub</small><strong>{{ profile.github_url }}</strong></div>
        <div class="info-item"><small>한 줄 소개</small><strong>{{ profile.short_intro }}</strong></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});

const initials = computed(() => (props.profile?.name || "U").slice(0, 2));
</script>
