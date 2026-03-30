<template>
  <div class="page">
    <AdSlot label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Design Preview · Screen 1"
      title="내용 블록 관리"
      description="입력 가능 영역은 모두 점선과 흰 입력 박스로 처리해, 서비스 UI와 문서 편집 UI가 분리되어 보이도록 구성했습니다. 기본정보는 맨 위 헤더가 곧 그 섹션입니다."
    >
      <template #actions>
        <button class="btn secondary">레이아웃 가이드</button>
        <button class="btn primary" @click="openTemplateModal = true">새 블록 시작</button>
      </template>
    </PageHero>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">저장된 프로필</div>
        <div class="stat-value">{{ stats.profileCount.value }}</div>
        <div class="stat-desc">여러 버전의 기본정보 저장 가능</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">내용 블록</div>
        <div class="stat-value">{{ stats.blockCount.value }}</div>
        <div class="stat-desc">템플릿 선택 후 생성</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">활성 템플릿</div>
        <div class="stat-value">{{ stats.templateCount.value }}</div>
        <div class="stat-desc">서로 다른 형식의 템플릿</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">저장된 이력서</div>
        <div class="stat-value">{{ stats.resumeCount.value }}</div>
        <div class="stat-desc">제목 단위로 버전 저장</div>
      </div>
    </div>

    <div class="autosave-row">
      <span class="status-pill">자동 저장됨 · 로컬 상태 기준</span>
    </div>

    <div class="resume-sheet">
      <section class="sheet-section">
        <div class="sheet-section-header">
          <div>
            <h4>기본정보</h4>
            <p>사진, 이름, 연락처, 거주지역이 하나의 기본정보 버전으로 묶입니다.</p>
          </div>
          <button class="small-btn" @click="handleAddProfile">+ 기본정보 버전 추가</button>
        </div>

        <div v-if="currentProfile" class="sheet-head">
          <button class="photo-placeholder">사진 영역 비어 있음<br />클릭해서 추가</button>
          <div class="editable-pane">
            <input v-model="currentProfile.name" class="profile-name" placeholder="이름을 입력하세요" />
            <div class="sheet-info-grid">
              <div class="sheet-field">
                <small>연락처</small>
                <div class="dual-line">
                  <input v-model="currentProfile.tel" class="inline-text" placeholder="Tel을 입력하세요" />
                  <input v-model="currentProfile.email" class="inline-text" placeholder="Email을 입력하세요" />
                </div>
              </div>
              <div class="sheet-field">
                <small>거주지역</small>
                <input v-model="currentProfile.location" class="inline-text" placeholder="거주지역을 입력하세요" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-content-box">
          <div>아직 추가된 기본정보 버전이 없습니다.</div>
          <div><strong>+ 기본정보 버전 추가</strong>를 눌러 시작하세요.</div>
        </div>

        <div v-if="state.profiles.length" class="title-list">
          <div v-for="profile in state.profiles" :key="profile.id" class="title-item">
            <div>
              <strong>{{ profile.title || `기본정보 ${profile.id}` }}</strong>
              <span>{{ profile.name || '이름 미입력' }}</span>
            </div>
            <div class="title-item-actions">
              <button @click="selectEditorProfile(profile.id)">선택</button>
              <button class="small-btn remove" @click="removeProfile(profile.id)">삭제</button>
            </div>
          </div>
        </div>
      </section>

      <section class="sheet-section">
        <div class="sheet-section-header">
          <div>
            <h4>내용</h4>
            <p>처음에는 비어 있고, 아래의 블록 추가 버튼으로 시작합니다. 템플릿을 고르면 그 형식에 맞는 입력 블록이 생성됩니다.</p>
          </div>
          <span class="chip">서로 다른 템플릿 구성</span>
        </div>

        <div v-if="!state.blocks.length" class="empty-content-box">
          <div>아직 추가된 내용 블록이 없습니다.</div>
          <div>아래의 <strong>+ 블록 추가</strong>를 눌러 템플릿을 선택하세요.</div>
        </div>

        <div v-else class="content-block-list">
          <div v-for="block in state.blocks" :key="block.id" class="content-block-item">
            <div class="drag-handle">☰</div>
            <div class="content-block-inner">
              <template v-if="block.template === 'basic'">
                <input v-model="block.title" class="block-title-input" placeholder="제목을 입력하세요" />
                <input v-model="block.subtitle" class="block-subtitle-input" placeholder="소제목을 입력하세요" />
                <textarea v-model="block.body" class="block-body-input" placeholder="내용을 입력하세요"></textarea>
              </template>

              <template v-else-if="block.template === 'experience'">
                <input v-model="block.title" class="block-title-input" placeholder="경력 블록 제목을 입력하세요" />
                <div v-for="item in block.items" :key="item.id" class="sheet-field">
                  <input v-model="item.subtitle" class="inline-text" placeholder="소제목을 입력하세요" />
                  <textarea v-model="item.content" class="block-body-input" placeholder="내용을 입력하세요" style="margin-top:10px"></textarea>
                  <div style="display:flex; justify-content:flex-end; margin-top:10px;">
                    <button class="small-btn remove" @click="removeExperienceItem(block, item.id)">항목 삭제</button>
                  </div>
                </div>
                <button class="small-btn" @click="addExperienceItem(block)">+ 소제목 항목 추가</button>
              </template>

              <template v-else-if="['award', 'certificate', 'language'].includes(block.template)">
                <input v-model="block.title" class="block-title-input" placeholder="표 제목을 입력하세요" />
                <div style="overflow:auto;">
                  <table style="width:100%; border-collapse:collapse; font-size:13px;">
                    <thead>
                      <tr>
                        <th v-for="header in tableHeaders(block.template)" :key="header" style="border:1px dashed #b8cfe8; padding:10px; background:#f8fbff; text-align:left;">{{ header }}</th>
                        <th style="border:1px dashed #b8cfe8; padding:10px; background:#f8fbff; width:90px;">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in block.rows" :key="row.id">
                        <td v-for="field in tableFields(block.template)" :key="field.key" style="border:1px dashed #b8cfe8; padding:8px;">
                          <input v-model="row[field.key]" class="inline-text" :placeholder="field.placeholder" />
                        </td>
                        <td style="border:1px dashed #b8cfe8; padding:8px;">
                          <button class="small-btn remove" @click="removeTableRow(block, row.id)">삭제</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button class="small-btn" @click="addTableRow(block)">+ 행 추가</button>
              </template>

              <template v-else-if="block.template === 'skill'">
                <input v-model="block.title" class="block-title-input" placeholder="기술스택 제목을 입력하세요" />
                <div class="sheet-field">
                  <div class="dual-line" style="grid-template-columns:1fr auto; display:grid; gap:10px;">
                    <input v-model="block.pendingSkill" class="inline-text" placeholder="기술 요소를 입력하세요" @keyup.enter="addSkill(block)" />
                    <button class="small-btn" @click="addSkill(block)">+ 추가</button>
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
                    <span v-for="skill in block.skills" :key="skill.id" class="pill">
                      {{ skill.label }}
                      <button style="border:0; background:transparent; cursor:pointer; color:#1d4ed8; font-weight:800;" @click="removeSkill(block, skill.id)">×</button>
                    </span>
                  </div>
                </div>
              </template>

              <div class="block-actions-row">
                <span class="status-pill">자동 저장됨</span>
                <div class="title-item-actions">
                  <button class="small-btn" @click="moveBlock(block.id, 'up')">↑</button>
                  <button class="small-btn" @click="moveBlock(block.id, 'down')">↓</button>
                  <button class="small-btn remove" @click="removeBlock(block.id)">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="add-block-wrap">
          <button class="add-block-bar" @click="openTemplateModal = true">+ 블록 추가</button>
        </div>
      </section>

      <section class="sheet-section">
        <div class="sheet-section-header">
          <div>
            <h4>자기소개글</h4>
            <p>문서 전체 흐름 안에서 직접 입력하는 영역입니다.</p>
          </div>
          <span class="chip">버전별 직접 작성</span>
        </div>
        <textarea class="textarea-ghost" v-model="introDraft" placeholder="자기소개글을 입력하세요"></textarea>
      </section>
    </div>

    <TemplatePickerModal
      :open="openTemplateModal"
      :templates="templateCatalog"
      @close="openTemplateModal = false"
      @select="handleSelectTemplate"
    />

    <AdSlot label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import AdSlot from '../components/AdSlot.vue';
import PageHero from '../components/PageHero.vue';
import TemplatePickerModal from '../components/TemplatePickerModal.vue';
import {
  state,
  stats,
  templateCatalog,
  addProfile,
  removeProfile,
  selectEditorProfile,
  addBlock,
  removeBlock,
  moveBlock,
  addExperienceItem,
  removeExperienceItem,
  addTableRow,
  removeTableRow,
  addSkill,
  removeSkill,
  getProfileById
} from '../lib/store';

const openTemplateModal = ref(false);
const introDraft = ref('');

const currentProfile = computed(() => getProfileById(state.editorProfileId));

function handleAddProfile() {
  addProfile();
}

function handleSelectTemplate(templateKey) {
  addBlock(templateKey);
  openTemplateModal.value = false;
}

function tableHeaders(template) {
  return {
    award: ['수상명', '주최', '날짜'],
    certificate: ['자격명', '발급기관', '취득일'],
    language: ['언어', '등급', '취득일']
  }[template] || [];
}

function tableFields(template) {
  return {
    award: [
      { key: 'awardName', placeholder: '수상명' },
      { key: 'organizer', placeholder: '주최' },
      { key: 'date', placeholder: '날짜' }
    ],
    certificate: [
      { key: 'certificateName', placeholder: '자격명' },
      { key: 'issuer', placeholder: '발급기관' },
      { key: 'date', placeholder: '취득일' }
    ],
    language: [
      { key: 'language', placeholder: '언어' },
      { key: 'grade', placeholder: '등급' },
      { key: 'date', placeholder: '취득일' }
    ]
  }[template] || [];
}
</script>
