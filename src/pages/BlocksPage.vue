<template>
  <div class="page active">
    <AdSlot position="top" label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Screen 1"
      title="내용 블록 관리"
      description="프로필과 이력서 내용 블록 원재료를 관리하는 화면입니다."
    >
      <template #actions>
        <button class="btn primary">새 블록 만들기</button>
        <button class="btn secondary">템플릿 보기</button>
      </template>
    </PageHero>

    <div class="stats">
      <StatCard label="저장된 프로필" value="2" description="기본 제출용 / 사진 제외형" />
      <StatCard label="내용 블록" value="18" description="경력·포트폴리오·언어능력 등" />
      <StatCard label="활성 템플릿" value="8" description="MVP 기준 템플릿 세트" />
      <StatCard label="저장된 이력서" value="6" description="제목 기준 버전 관리" />
    </div>

    <div class="page-grid">
      <div class="stack">
        <ProfileCard :profile="profile" />

        <div class="card">
          <div class="card-header">
            <div>
              <h3>내용 블록 관리</h3>
              <p>
                경력, 포트폴리오, 언어능력, 학력, 수상내역 등을 블록 단위로 저장하는 핵심 화면입니다.
              </p>
            </div>
            <button class="btn primary">+ 블록 추가</button>
          </div>

          <div class="toolbar">
            <label class="search">
              <span>🔎</span>
              <input type="text" placeholder="블록 제목, 기술, 기간으로 검색" />
            </label>
            <select class="select select-inline">
              <option>전체 템플릿</option>
              <option>경력</option>
              <option>포트폴리오</option>
              <option>언어능력</option>
              <option>기술스택</option>
            </select>
          </div>

          <div class="blocks">
            <BlockCard v-for="block in blocks" :key="block.id" :block="block" mode="manage" />
          </div>
        </div>
      </div>

      <div class="stack">
        <TemplateGrid :templates="templates" />

        <div class="card">
          <div class="card-header">
            <div>
              <h3>구현 메모</h3>
              <p>Flask/Jinja에서 Vue로 바뀌면서 화면은 SPA가 되고, API는 Functions로 분리됩니다.</p>
            </div>
          </div>
          <ul class="list-clean">
            <li><strong>pages/</strong> · 화면 단위 페이지 컴포넌트</li>
            <li><strong>components/</strong> · 카드, 미리보기, 광고 슬롯 등 공통 UI</li>
            <li><strong>netlify/functions/</strong> · Neon 연결 API</li>
            <li><strong>src/styles/style.css</strong> · 공통 스타일</li>
          </ul>
        </div>
      </div>
    </div>

    <AdSlot position="bottom" label="페이지 하단 광고 슬롯" />
  </div>
</template>

<script setup>
import AdSlot from "../components/AdSlot.vue";
import BlockCard from "../components/BlockCard.vue";
import PageHero from "../components/PageHero.vue";
import ProfileCard from "../components/ProfileCard.vue";
import StatCard from "../components/StatCard.vue";
import TemplateGrid from "../components/TemplateGrid.vue";
import { blocks, profile, templates } from "../lib/mockData";
</script>
