<template>
  <div class="resume-sheet">
    <div class="sheet-head">
      <div class="photo-placeholder">사진 영역</div>
      <div class="editable-pane">
        <div class="profile-actions" v-if="showProfileLabel">
          <span class="selected-version">선택된 기본정보 · {{ profile?.title || '없음' }}</span>
        </div>
        <input class="profile-name" :value="title || profile?.name || ''" :readonly="!controls" @input="$emit('update:title', $event.target.value)" />
        <div class="sheet-info-grid">
          <div class="sheet-field">
            <small>연락처</small>
            <div class="dual-line">
              <input class="inline-text" :value="profile?.tel ? `Tel · ${profile.tel}` : ''" readonly />
              <input class="inline-text" :value="profile?.email ? `Email · ${profile.email}` : ''" readonly />
            </div>
          </div>
          <div class="sheet-field">
            <small>거주지역</small>
            <input class="inline-text" :value="profile?.location || ''" readonly />
          </div>
        </div>
      </div>
    </div>

    <section class="sheet-section">
      <div class="sheet-section-header">
        <div>
          <h4>내용</h4>
          <p>{{ controls ? '실제 이력서 본문이 되는 영역입니다. 여기서 순서 변경과 삭제가 가능합니다.' : '실제 저장된 이력서를 미리 보는 영역입니다.' }}</p>
        </div>
      </div>

      <template v-if="blocks.length">
        <div v-for="(block, index) in blocks" :key="block.id" class="document-block-shell">
          <div class="document-block-tools">
            <strong>{{ blockLabel(block) }}</strong>
            <div v-if="controls" class="title-item-actions">
              <button class="small-btn" @click="$emit('move-up', block.id)" :disabled="index === 0">↑</button>
              <button class="small-btn" @click="$emit('move-down', block.id)" :disabled="index === blocks.length - 1">↓</button>
              <button class="small-btn remove" @click="$emit('remove', block.id)">삭제</button>
            </div>
          </div>
          <div class="document-preview-block">
            <template v-if="block.template === 'basic'">
              <strong>{{ block.title || '제목 없음' }}</strong>
              <span>{{ block.subtitle || '소제목 없음' }}</span>
              <p>{{ block.body || '내용 없음' }}</p>
            </template>

            <template v-else-if="block.template === 'experience'">
              <strong>{{ block.title || '경력' }}</strong>
              <div v-for="item in block.items" :key="item.id" style="margin-top:10px;">
                <span>{{ item.subtitle || '소제목 없음' }}</span>
                <p>{{ item.content || '내용 없음' }}</p>
              </div>
            </template>

            <template v-else-if="['award','certificate','language'].includes(block.template)">
              <strong>{{ block.title || '표 형식 블록' }}</strong>
              <div style="overflow:auto; margin-top:10px;">
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                  <thead>
                    <tr>
                      <th v-for="head in tableHeaders(block.template)" :key="head" style="border:1px solid #dbe7f4; padding:8px 10px; background:#f5f9ff; text-align:left;">{{ head }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in block.rows" :key="row.id">
                      <td v-for="cell in tableValues(block.template, row)" :key="cell.key" style="border:1px solid #dbe7f4; padding:8px 10px;">{{ cell.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>

            <template v-else-if="block.template === 'skill'">
              <strong>{{ block.title || '기술스택' }}</strong>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
                <span v-for="skill in block.skills" :key="skill.id" class="pill">{{ skill.label }}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
      <div v-else class="empty-content-box">
        <div>아직 우측 문서에 추가된 내용이 없습니다.</div>
        <div>좌측의 내용 섹션에서 <strong>+</strong> 버튼으로 항목을 넣어주세요.</div>
      </div>
    </section>

    <section class="sheet-section">
      <div class="sheet-section-header">
        <div>
          <h4>자기소개글</h4>
          <p>우측 전체 문서 맥락 안에서 작성합니다.</p>
        </div>
      </div>
      <textarea class="textarea-ghost" :value="selfIntro" :readonly="!controls" @input="$emit('update:selfIntro', $event.target.value)" placeholder="자기소개글을 입력하세요"></textarea>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  profile: Object,
  blocks: {
    type: Array,
    default: () => []
  },
  selfIntro: {
    type: String,
    default: ""
  },
  controls: {
    type: Boolean,
    default: false
  },
  showProfileLabel: {
    type: Boolean,
    default: false
  }
});

defineEmits(["move-up", "move-down", "remove", "update:selfIntro", "update:title"]);

function blockLabel(block) {
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

function tableHeaders(template) {
  return {
    award: ['수상명', '주최', '날짜'],
    certificate: ['자격명', '발급기관', '취득일'],
    language: ['언어', '등급', '취득일']
  }[template] || [];
}

function tableValues(template, row) {
  const map = {
    award: [
      { key: 'awardName', value: row.awardName || '' },
      { key: 'organizer', value: row.organizer || '' },
      { key: 'date', value: row.date || '' }
    ],
    certificate: [
      { key: 'certificateName', value: row.certificateName || '' },
      { key: 'issuer', value: row.issuer || '' },
      { key: 'date', value: row.date || '' }
    ],
    language: [
      { key: 'language', value: row.language || '' },
      { key: 'grade', value: row.grade || '' },
      { key: 'date', value: row.date || '' }
    ]
  };
  return map[template] || [];
}
</script>
