<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">BR</div>
        <h1>{{ appName }}</h1>
        <p>블록형 이력서 관리 서비스 · Vue + Netlify + Neon</p>
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
          이 버전은 Vue 정적 프론트와 Netlify Functions API 구조를 전제로 작성되었습니다.
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
    description: "프로필과 내용 블록 원재료 관리",
    to: "/blocks"
  },
  {
    number: 2,
    title: "이력서 조합 & 저장",
    description: "블록 선택, 순서 변경, 자기소개서 작성",
    to: "/composer"
  },
  {
    number: 3,
    title: "저장된 이력서 관리",
    description: "제목 중심 버전 목록 관리",
    to: "/resumes"
  }
];
</script>
