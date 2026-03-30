<template>
  <div class="page active">
    <AdSlot position="top" label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Screen 3"
      title="저장된 이력서 버전 관리"
      description="제목 중심으로 저장된 이력서 버전을 관리하고, 상세 페이지로 진입합니다."
    >
      <template #actions>
        <button class="btn secondary">정렬</button>
        <RouterLink to="/composer" class="btn primary">새 이력서 만들기</RouterLink>
      </template>
    </PageHero>

    <div class="card">
      <div class="card-header">
        <div>
          <h3>저장된 이력서 목록</h3>
          <p>제목, 수정일, 포함된 블록 수 중심으로 간단하게 관리합니다.</p>
        </div>
      </div>

      <div class="toolbar">
        <label class="search">
          <span>🔎</span>
          <input type="text" placeholder="이력서 제목으로 검색" />
        </label>
        <select class="select select-inline">
          <option>최신 수정순</option>
          <option>제목순</option>
          <option>오래된 순</option>
        </select>
      </div>

      <div class="versions-grid">
        <article v-for="resume in resumes" :key="resume.id" class="resume-card">
          <RouterLink :to="`/resumes/${resume.id}`" class="resume-link">
            <div class="resume-top">
              <div>
                <h4 class="resume-title">{{ resume.title }}</h4>
                <p class="resume-sub">{{ subtitle(resume) }}</p>
              </div>
              <div class="icon-actions">
                <button class="icon-btn" @click.prevent>⧉</button>
                <button class="icon-btn" @click.prevent>🗑</button>
              </div>
            </div>
            <div class="resume-meta">
              <div class="meta-box"><small>수정일</small><strong>{{ resume.updated_at }}</strong></div>
              <div class="meta-box"><small>블록 수</small><strong>{{ resume.block_count }}개</strong></div>
              <div class="meta-box"><small>프로필</small><strong>{{ resume.profile_title }}</strong></div>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>

    <AdSlot position="bottom" label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import AdSlot from "../components/AdSlot.vue";
import PageHero from "../components/PageHero.vue";
import { resumes } from "../lib/mockData";

function subtitle(resume) {
  if (resume.title.includes("공통")) return "여러 제출처에 두루 사용할 수 있도록 정리한 버전";
  if (resume.title.includes("포트폴리오")) return "포트폴리오 블록을 상단에 우선 배치한 버전";
  return "저장된 이력서 버전을 제목 중심으로 관리";
}
</script>
