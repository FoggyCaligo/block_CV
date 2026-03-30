export const profile = {
  id: 1,
  title: "기본 프로필",
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hello@example.com",
  address: "서울시 관악구",
  github_url: "github.com/example",
  blog_url: "blog.example.com",
  portfolio_url: "portfolio.example.com",
  short_intro: "구조와 문서를 중시하는 지원자"
};

export const templates = [
  { key: "experience", name: "경력 템플릿", description: "회사명, 직무, 기간, 주요 업무, 성과 입력" },
  { key: "portfolio", name: "포트폴리오 템플릿", description: "프로젝트명, 역할, 링크, 결과 중심 입력" },
  { key: "education", name: "학력 템플릿", description: "학교명, 전공, 기간, 졸업 여부 입력" },
  { key: "award", name: "수상내역 템플릿", description: "수상명, 주최, 날짜, 설명 입력" },
  { key: "language", name: "언어능력 템플릿", description: "언어명, 수준, 점수/등급 입력" },
  { key: "skill", name: "기술스택 템플릿", description: "기술명, 숙련도, 사용기간 입력" }
];

export const blocks = [
  {
    id: 1,
    template_type: "portfolio",
    display_type: "title_content",
    title: "주문 관리 웹앱",
    subtitle: "관리자 화면 설계 및 주문 흐름 개선 중심 포트폴리오",
    tags_json: ["포트폴리오", "React", "관리자 UI"],
    content_json: {
      bullets: ["주요 기능, 역할, 결과를 묶어서 설명", "링크와 사용 기술 포함"]
    }
  },
  {
    id: 2,
    template_type: "language",
    display_type: "chart",
    title: "언어능력 · 외국어 역량",
    subtitle: "차트형",
    tags_json: ["언어능력", "차트형"],
    content_json: {
      items: [
        { name: "영어", level: "B2", score: 78 },
        { name: "일본어", level: "N3", score: 55 },
        { name: "한국어", level: "C2", score: 96 }
      ]
    }
  },
  {
    id: 3,
    template_type: "experience",
    display_type: "title_content",
    title: "경력 · ABC Studio",
    subtitle: "2024.08 ~ 2026.01",
    tags_json: ["경력", "프론트엔드"],
    content_json: {
      bullets: ["운영 중인 서비스의 UI 개선", "기능 유지보수 및 운영 이슈 대응"]
    }
  }
];

export const resumes = [
  {
    id: 1,
    title: "A회사 제출용",
    updated_at: "2026-03-30",
    block_count: 5,
    profile_title: "기본 프로필",
    profile: profile,
    self_intro_text:
      "지원 동기와 강점을 해당 제출 목적에 맞게 자연스럽게 연결하는 긴 텍스트가 들어가는 자리입니다.",
    items: [blocks[0], blocks[2], blocks[1]]
  },
  {
    id: 2,
    title: "공통형 이력서",
    updated_at: "2026-03-29",
    block_count: 4,
    profile_title: "기본 프로필",
    profile: profile,
    self_intro_text: "여러 제출처에 두루 사용할 수 있는 공통형 자기소개서입니다.",
    items: [blocks[2], blocks[0]]
  },
  {
    id: 3,
    title: "포트폴리오 강조형",
    updated_at: "2026-03-27",
    block_count: 6,
    profile_title: "기본 프로필",
    profile: profile,
    self_intro_text: "포트폴리오를 먼저 배치한 상세한 자기소개서입니다.",
    items: [blocks[0], blocks[1]]
  }
];
