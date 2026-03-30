<template>
  <div class="page active">
    <AdSlot position="top" label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Detail Page"
      title="이력서 상세 페이지"
      description="저장된 이력서 결과 미리보기, PDF 출력, 수정 진입을 담당하는 화면입니다."
    >
      <template #actions>
        <RouterLink class="btn secondary" :to="`/composer`">수정하기</RouterLink>
        <button class="btn secondary">복제하기</button>
        <button class="btn primary">PDF 출력</button>
      </template>
    </PageHero>

    <div class="detail-layout">
      <div class="card">
        <ResumePreview :resume="resume" />
      </div>

      <aside class="side-panel">
        <div class="card">
          <div class="card-header">
            <div>
              <h3>문서 정보</h3>
              <p>저장된 버전에 대한 메타 정보입니다.</p>
            </div>
          </div>

          <ul class="list-clean">
            <li><strong>제목</strong><br />{{ resume.title }}</li>
            <li><strong>프로필</strong><br />{{ resume.profile.title }}</li>
            <li><strong>내용 블록</strong><br />총 {{ resume.items.length }}개 포함</li>
            <li><strong>최근 수정</strong><br />{{ resume.updated_at }}</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h3>사용된 블록</h3>
              <p>포함된 블록을 빠르게 확인합니다.</p>
            </div>
          </div>

          <ul class="list-clean">
            <li v-for="item in resume.items" :key="item.id">{{ item.title }}</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h3>개발 메모</h3>
              <p>PDF 출력은 이 상세 페이지 기준으로 연결하는 편이 자연스럽습니다.</p>
            </div>
          </div>

          <div class="empty-box">
            실제 구현에서는 서버리스 함수로 PDF를 생성하지 않고, 먼저 브라우저 print/PDF 전략으로 시작해도 됩니다.
            이후 필요할 때만 전용 PDF 렌더링으로 확장하는 쪽이 비용 면에서 유리합니다.
          </div>
        </div>
      </aside>
    </div>

    <AdSlot position="bottom" label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import AdSlot from "../components/AdSlot.vue";
import PageHero from "../components/PageHero.vue";
import ResumePreview from "../components/ResumePreview.vue";
import { resumes } from "../lib/mockData";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const resume = computed(() => {
  return resumes.find((item) => String(item.id) === String(props.id)) || resumes[0];
});
</script>
