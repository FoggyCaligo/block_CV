import { getSql, json } from "./_db.js";

const fallback = {
  id: 1,
  title: "A회사 제출용",
  updated_at: "2026-03-30",
  profile: {
    id: 1,
    title: "기본 프로필",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hello@example.com",
    address: "서울시 관악구",
    github_url: "github.com/example",
    short_intro: "구조와 문서를 중시하는 지원자"
  },
  self_intro_text:
    "지원 동기와 본인의 강점을 해당 제출 목적에 맞게 자연스럽게 연결하는 긴 텍스트가 들어가는 자리입니다.",
  items: [
    {
      id: 1,
      template_type: "portfolio",
      display_type: "title_content",
      title: "주문 관리 웹앱",
      subtitle: "관리자 화면 설계 및 주문 흐름 개선 중심 포트폴리오",
      content_json: { bullets: ["주요 기능, 역할, 결과를 묶어서 설명"] }
    },
    {
      id: 2,
      template_type: "language",
      display_type: "chart",
      title: "언어능력 · 외국어 역량",
      subtitle: "차트형",
      content_json: {
        items: [
          { name: "영어", level: "B2", score: 78 },
          { name: "일본어", level: "N3", score: 55 }
        ]
      }
    }
  ]
};

export default async (request) => {
  if (request.httpMethod !== "GET") {
    return json(405, { message: "Method Not Allowed" });
  }

  const id = new URL(request.url).searchParams.get("id");

  try {
    const sql = getSql();
    const resumeRows = await sql`
      SELECT
        r.id,
        r.title,
        r.self_intro_text,
        r.updated_at,
        p.id AS profile_id,
        p.title AS profile_title,
        p.name,
        p.phone,
        p.email,
        p.address,
        p.github_url,
        p.short_intro
      FROM resumes r
      LEFT JOIN profiles p ON p.id = r.profile_id
      WHERE r.id = ${id}
      LIMIT 1
    `;

    if (!resumeRows.length) {
      return json(404, { message: "Resume not found" });
    }

    const resume = resumeRows[0];

    const items = await sql`
      SELECT
        cb.id,
        cb.template_type,
        cb.display_type,
        cb.title,
        cb.subtitle,
        cb.content_json,
        ri.sort_order
      FROM resume_items ri
      JOIN content_blocks cb ON cb.id = ri.content_block_id
      WHERE ri.resume_id = ${id}
      ORDER BY ri.sort_order ASC, ri.id ASC
    `;

    return json(200, {
      item: {
        id: resume.id,
        title: resume.title,
        updated_at: resume.updated_at,
        self_intro_text: resume.self_intro_text,
        profile: {
          id: resume.profile_id,
          title: resume.profile_title,
          name: resume.name,
          phone: resume.phone,
          email: resume.email,
          address: resume.address,
          github_url: resume.github_url,
          short_intro: resume.short_intro
        },
        items
      }
    });
  } catch (error) {
    return json(200, { item: fallback, fallback: true, error: error.message });
  }
};
