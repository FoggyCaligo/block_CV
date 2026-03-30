<template>
  <div class="page active">
    <AdSlot position="top" label="페이지 상단 광고 슬롯" />

    <PageHero
      kicker="Screen 2"
      title="이력서 조합 & 저장"
      description="좌측 블록 선택, 우측 이력서 조합, 자기소개서 직접 작성 구조입니다."
    >
      <template #actions>
        <button class="btn secondary">임시저장</button>
        <button class="btn primary">이력서 저장</button>
      </template>
    </PageHero>

    <div class="layout-2col">
      <div class="left-pane">
        <div class="card">
          <div class="card-header">
            <div>
              <h3>사용 가능한 블록</h3>
              <p>좌측에서 필요한 블록을 골라 우측 이력서에 추가합니다.</p>
            </div>
            <div class="filter-row">
              <span class="chip">전체</span>
              <span class="chip">경력</span>
              <span class="chip">포트폴리오</span>
              <span class="chip">언어능력</span>
            </div>
          </div>

          <div class="toolbar">
            <label class="search">
              <span>🔎</span>
              <input type="text" placeholder="추가할 블록 검색" />
            </label>
          </div>

          <div class="blocks">
            <article class="block-card">
              <div class="block-top">
                <div>
                  <h4 class="block-title">기본 프로필</h4>
                  <p class="block-sub">사진 + 개인정보 · 상단 고정 블록</p>
                </div>
                <button class="btn primary btn-inline">+ 추가</button>
              </div>
            </article>

            <BlockCard v-for="block in blocks" :key="block.id" :block="block" mode="select" />
          </div>
        </div>
      </div>

      <div class="right-pane">
        <div class="card">
          <div class="card-header">
            <div>
              <h3>현재 만들고 있는 이력서</h3>
              <p>프로필 1개, 내용 블록 여러 개, 자기소개서로 구성합니다.</p>
            </div>
          </div>

          <div class="composer-title">
            <input class="input" value="A회사 제출용 이력서" />
          </div>

          <div class="section-shell">
            <h4>1. 사진 + 개인정보</h4>
            <p>이 영역은 상단 고정이며, 하나의 프로필만 선택됩니다.</p>
            <div class="slot-fixed">
              <div class="selected-item">
                <div>
                  <strong>기본 프로필</strong>
                  <span>사진 포함 / GitHub 링크 포함 / 한 줄 소개 포함</span>
                </div>
                <button class="small-btn remove">교체</button>
              </div>
            </div>
          </div>

          <div class="section-shell">
            <h4>2. 내용 블록</h4>
            <p>여러 블록을 추가할 수 있으며, 순서를 바꿔 최종 이력서를 구성합니다.</p>
            <div class="slot-list">
              <div v-for="item in selectedItems" :key="item.id" class="selected-item">
                <div>
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.display_type }} · 현재 조합에 포함됨</span>
                </div>
                <div class="reorder">
                  <button class="small-btn">↑</button>
                  <button class="small-btn">↓</button>
                  <button class="small-btn remove">−</button>
                </div>
              </div>
            </div>
          </div>

          <div class="section-shell">
            <h4>3. 자기소개서</h4>
            <p>자기소개서는 버전별로 직접 작성합니다.</p>
            <div class="self-intro-box">
              <textarea class="textarea">
지원 동기와 본인의 강점을 해당 제출 목적에 맞게 자연스럽게 연결하는 긴 텍스트가 들어가는 자리입니다. 실제 구현에서는 입력 상태를 local state로 들고 있다가 저장 시 resumes.self_intro_text로 전송하면 됩니다.
              </textarea>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h3>미리보기</h3>
              <p>편집 화면 안에서도 최종 PDF에 가까운 결과를 빠르게 확인합니다.</p>
            </div>
          </div>

          <div class="preview-tabs">
            <button class="preview-tab active">편집 보기</button>
            <button class="preview-tab">미리보기</button>
          </div>

          <ResumePreview :resume="previewResume" />
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
import ResumePreview from "../components/ResumePreview.vue";
import { blocks, profile } from "../lib/mockData";

const selectedItems = blocks;
const previewResume = {
  id: 999,
  title: "미리보기 이력서",
  profile,
  items: blocks,
  self_intro_text:
    "지원 동기와 강점을 자연스럽게 연결하는 긴 텍스트가 들어가는 자리입니다."
};
</script>
