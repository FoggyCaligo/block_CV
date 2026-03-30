import { getSql, json } from "./_db.js";

const fallback = [
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
        { name: "일본어", level: "N3", score: 55 }
      ]
    }
  }
];

export default async (request) => {
  if (request.httpMethod !== "GET") {
    return json(405, { message: "Method Not Allowed" });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      SELECT id, template_type, display_type, title, subtitle, tags_json, content_json, created_at, updated_at
      FROM content_blocks
      ORDER BY updated_at DESC
    `;
    return json(200, { items: rows });
  } catch (error) {
    return json(200, { items: fallback, fallback: true, error: error.message });
  }
};
