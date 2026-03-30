<template>
  <div class="page">
    <AdSlot label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Design Preview · Screen 2"
      title="이력서 조합 & 저장"
      description="좌측은 제목 목록, 우측은 실제 이력서 문서입니다. 우측은 기존 상세 페이지 역할까지 흡수했고, 기본정보는 여러 버전 중 택 1이 가능합니다."
    >
      <template #actions>
        <button class="btn secondary" @click="handleReset">새 조합 시작</button>
        <button class="btn primary" @click="handleSave">이력서 저장</button>
      </template>
    </PageHero>

    <div class="layout-2col">
      <div class="left-pane">
        <div class="resource-stack">
          <section class="resource-column">
            <div>
              <h3>기본정보</h3>
              <p>여러 버전 중에서 하나를 선택합니다.</p>
            </div>
            <div v-if="state.profiles.length" class="title-list">
              <div v-for="profile in state.profiles" :key="profile.id" class="title-item">
                <div>
                  <strong @click="openPreview('profile', profile)" style="cursor:pointer">{{ profile.title || `기본정보 ${profile.id}` }}</strong>
                  <span>{{ profile.name || '이름 미입력' }}</span>
                </div>
                <div class="title-item-actions">
                  <button @click="openPreview('profile', profile)">보기</button>
                  <button @click="selectComposerProfile(profile.id)">선택</button>
                </div>
              </div>
            </div>
            <div v-else class="empty-content-box">
              <div>추가된 기본정보 버전이 없습니다.</div>
              <div>1번 페이지에서 먼저 기본정보 버전을 만들어주세요.</div>
            </div>
          </section>

          <section class="resource-column">
            <div>
              <h3>내용</h3>
              <p>제목만 보고 추가합니다. 제목을 누르면 모달로 상세 내용을 확인할 수 있습니다.</p>
            </div>
            <div v-if="state.blocks.length" class="title-list">
              <div v-for="block in state.blocks" :key="block.id" class="title-item">
                <div>
                  <strong @click="openPreview('block', block)" style="cursor:pointer">{{ blockTitle(block) }}</strong>
                  <span>{{ blockTemplateLabel(block.template) }}</span>
                </div>
                <div class="title-item-actions">
                  <button @click="openPreview('block', block)">보기</button>
                  <button @click="addBlockToComposer(block.id)">+</button>
                </div>
              </div>
            </div>
            <div v-else class="empty-content-box">
              <div>추가된 내용 블록이 없습니다.</div>
              <div>1번 페이지에서 템플릿으로 블록을 만든 뒤 여기서 추가하세요.</div>
            </div>
          </section>

          <section class="resource-column">
            <div>
              <h3>자기소개글</h3>
              <p>우측 문서 안에서 직접 작성합니다.</p>
            </div>
            <div class="empty-content-box">
              <div>자기소개글은 별도 목록을 두지 않고, 우측 실제 문서 안에서 바로 작성합니다.</div>
            </div>
          </section>
        </div>
      </div>

      <div class="right-pane">
        <ResumeDocument
          :title="state.composer.title"
          :profile="selectedProfile"
          :blocks="selectedBlocks"
          :self-intro="state.composer.selfIntro"
          :controls="true"
          :show-profile-label="true"
          @update:title="(value) => (state.composer.title = value)"
          @move-up="(id) => moveComposerBlock(id, 'up')"
          @move-down="(id) => moveComposerBlock(id, 'down')"
          @remove="removeBlockFromComposer"
          @update:selfIntro="(value) => (state.composer.selfIntro = value)"
        />
      </div>
    </div>

    <PreviewModal
      :open="previewOpen"
      :title="previewTitle"
      :subtitle="previewSubtitle"
      @close="previewOpen = false"
    >
      <template v-if="previewType === 'profile'">
        <h4>{{ previewPayload?.title || '기본정보' }}</h4>
        <div class="preview-entry"><strong>이름</strong><p>{{ previewPayload?.name || '미입력' }}</p></div>
        <div class="preview-entry"><strong>연락처</strong><p>Tel · {{ previewPayload?.tel || '' }}<br />Email · {{ previewPayload?.email || '' }}</p></div>
        <div class="preview-entry"><strong>거주지역</strong><p>{{ previewPayload?.location || '미입력' }}</p></div>
      </template>
      <template v-else-if="previewType === 'block'">
        <h4>{{ blockTitle(previewPayload) }}</h4>
        <div class="preview-entry"><strong>형식</strong><p>{{ blockTemplateLabel(previewPayload?.template) }}</p></div>
        <template v-if="previewPayload?.template === 'basic'">
          <div class="preview-entry"><strong>소제목</strong><p>{{ previewPayload?.subtitle || '미입력' }}</p></div>
          <div class="preview-entry"><strong>내용</strong><p>{{ previewPayload?.body || '미입력' }}</p></div>
        </template>
        <template v-else-if="previewPayload?.template === 'experience'">
          <div v-for="item in previewPayload.items" :key="item.id" class="preview-entry">
            <strong>{{ item.subtitle || '소제목 없음' }}</strong>
            <p>{{ item.content || '미입력' }}</p>
          </div>
        </template>
        <template v-else-if="['award','certificate','language'].includes(previewPayload?.template)">
          <div class="preview-entry"><p>표 형식 템플릿입니다. 저장된 행 수: {{ previewPayload?.rows?.length || 0 }}</p></div>
        </template>
        <template v-else-if="previewPayload?.template === 'skill'">
          <div class="preview-entry"><strong>기술 요소</strong><p>{{ previewPayload?.skills?.map((item) => item.label).join(', ') || '미입력' }}</p></div>
        </template>
      </template>
    </PreviewModal>

    <AdSlot label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import AdSlot from '../components/AdSlot.vue';
import PageHero from '../components/PageHero.vue';
import PreviewModal from '../components/PreviewModal.vue';
import ResumeDocument from '../components/ResumeDocument.vue';
import {
  state,
  resetComposer,
  selectComposerProfile,
  addBlockToComposer,
  removeBlockFromComposer,
  moveComposerBlock,
  saveComposer,
  getProfileById,
  getComposerBlocks
} from '../lib/store';

const previewOpen = ref(false);
const previewType = ref('');
const previewPayload = ref(null);
const previewTitle = ref('미리보기');
const previewSubtitle = ref('선택한 항목의 내용을 확인합니다.');

const selectedProfile = computed(() => getProfileById(state.composer.profileId));
const selectedBlocks = computed(() => getComposerBlocks());

function openPreview(type, payload) {
  previewType.value = type;
  previewPayload.value = payload;
  previewTitle.value = type === 'profile' ? (payload.title || '기본정보') : blockTitle(payload);
  previewSubtitle.value = type === 'profile' ? '선택 가능한 기본정보 버전입니다.' : blockTemplateLabel(payload.template);
  previewOpen.value = true;
}

function blockTitle(block) {
  if (!block) return '블록';
  const labels = {
    basic: block.title || '기본형 블록',
    experience: block.title || '경력',
    award: block.title || '수상내역',
    certificate: block.title || '자격증',
    language: block.title || '언어능력',
    skill: block.title || '기술스택'
  };
  return labels[block.template] || '블록';
}

function blockTemplateLabel(template) {
  return {
    basic: '제목 + 내용',
    experience: '소제목 + 내용 반복형',
    award: '표 형식',
    certificate: '표 형식',
    language: '표 형식',
    skill: '여러 요소 추가형'
  }[template] || '블록';
}

function handleSave() {
  saveComposer();
  alert('이력서가 저장되었습니다. 저장된 이력서 관리 페이지에서 확인할 수 있습니다.');
}

function handleReset() {
  resetComposer();
}
</script>
