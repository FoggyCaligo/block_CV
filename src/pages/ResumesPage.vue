<template>
  <div class="page">
    <AdSlot label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Design Preview · Screen 3"
      title="저장된 이력서 관리"
      description="이력서는 수직 리스트로 정렬하고, 수정 버튼은 2번 페이지로 이동하면서 해당 이력서 내용을 우측 문서에 반영합니다. PDF 출력은 각 이력서 행에서 바로 실행합니다."
    >
      <template #actions>
        <button class="btn secondary">정렬</button>
      </template>
    </PageHero>

    <div class="card" style="padding:22px">
      <div class="toolbar">
        <label class="search">
          <span>🔎</span>
          <input v-model="keyword" type="text" placeholder="이력서 제목으로 검색" />
        </label>
      </div>

      <div v-if="filteredResumes.length" class="versions-list">
        <article v-for="resume in filteredResumes" :key="resume.id" class="resume-card">
          <div class="resume-top">
            <div @click="openResumePreview(resume)" style="cursor:pointer">
              <h4 class="resume-title">{{ resume.title }}</h4>
              <p class="resume-sub">{{ subtitle(resume) }}</p>
            </div>
            <div class="title-item-actions">
              <button @click="exportResumePdf(resume)">PDF 출력</button>
              <button @click="editResume(resume.id)">수정</button>
            </div>
          </div>
          <div class="resume-meta">
            <div class="meta-box"><small>수정일</small><strong>{{ resume.updatedAt }}</strong></div>
            <div class="meta-box"><small>블록 수</small><strong>{{ resume.blockIds.length }}개</strong></div>
            <div class="meta-box"><small>프로필</small><strong>{{ profileTitle(resume.profileId) }}</strong></div>
          </div>
        </article>
      </div>
      <div v-else class="empty-content-box">
        <div>저장된 이력서가 없습니다.</div>
        <div>2번 페이지에서 내용을 조합한 뒤 저장하면 이 목록에 추가됩니다.</div>
      </div>
    </div>

    <PreviewModal
      :open="previewOpen"
      :title="previewTitle"
      :subtitle="previewSubtitle"
      @close="previewOpen = false"
    >
      <ResumeDocument
        :title="previewResume?.title || ''"
        :profile="previewPayload.profile"
        :blocks="previewPayload.blocks"
        :self-intro="previewPayload.selfIntro"
      />
    </PreviewModal>

    <AdSlot label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdSlot from '../components/AdSlot.vue';
import PageHero from '../components/PageHero.vue';
import PreviewModal from '../components/PreviewModal.vue';
import ResumeDocument from '../components/ResumeDocument.vue';
import { exportResumePdf } from '../lib/pdf';
import { state, loadResumeToComposer, getProfileById, getResumePayload } from '../lib/store';

const router = useRouter();
const keyword = ref('');
const previewOpen = ref(false);
const previewTitle = ref('저장된 이력서 미리보기');
const previewSubtitle = ref('선택한 이력서의 내용을 확인합니다.');
const previewResume = ref(null);
const previewPayload = ref({ profile: null, blocks: [], selfIntro: '' });

const filteredResumes = computed(() => {
  const value = keyword.value.trim();
  if (!value) return state.resumes;
  return state.resumes.filter((item) => item.title.includes(value));
});

function profileTitle(profileId) {
  return getProfileById(profileId)?.title || '기본정보 없음';
}

function subtitle(resume) {
  return resume.selfIntro ? '자기소개글 포함 저장 버전' : '자기소개글 미입력 저장 버전';
}

function openResumePreview(resume) {
  previewResume.value = resume;
  previewTitle.value = resume.title;
  previewSubtitle.value = '저장된 이력서 미리보기';
  previewPayload.value = getResumePayload(resume);
  previewOpen.value = true;
}

function editResume(id) {
  loadResumeToComposer(id);
  router.push('/composer');
}
</script>
