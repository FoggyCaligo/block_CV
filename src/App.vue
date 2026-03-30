<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">BR</div>
        <h1>{{ appName }}</h1>
        <p>문서처럼 입력하고, 버전별로 저장하고, 다시 조합해서 쓰는 이력서 관리기</p>
      </div>

      <nav class="nav-group">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-btn"
          active-class="active"
        >
          <div class="nav-icon">{{ item.number }}</div>
          <div class="nav-copy">
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </div>
        </RouterLink>
      </nav>

      <div class="sidebar-foot">
        <p>
          좌측 네이비 네비게이션은 유지하고, 본문은 서비스 UI와 문서 입력 UI를
          분리해서 구성했습니다.
        </p>
      </div>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
const appName = import.meta.env.VITE_APP_NAME || "블록형 이력서 관리기";

const navItems = [
  {
    number: 1,
    title: "내용 블록 관리",
    description: "기본정보, 내용, 자기소개글을 직접 입력",
    to: "/blocks"
  },
  {
    number: 2,
    title: "이력서 조합 & 저장",
    description: "좌측 제목 선택, 우측 실제 문서 조합",
    to: "/composer"
  },
  {
    number: 3,
    title: "저장된 이력서 관리",
    description: "수직 리스트, 수정 진입, PDF 출력",
    to: "/resumes"
  }
];
</script>
