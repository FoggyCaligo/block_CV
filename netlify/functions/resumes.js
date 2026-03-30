import { getSql, json } from "./_db.js";

const fallback = [
  { id: 1, title: "A회사 제출용", updated_at: "2026-03-30", block_count: 5, profile_title: "기본 프로필" },
  { id: 2, title: "공통형 이력서", updated_at: "2026-03-29", block_count: 4, profile_title: "기본 프로필" },
  { id: 3, title: "포트폴리오 강조형", updated_at: "2026-03-27", block_count: 6, profile_title: "기본 프로필" }
];

export default async (request) => {
  if (request.httpMethod !== "GET") {
    return json(405, { message: "Method Not Allowed" });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      SELECT
        r.id,
        r.title,
        r.updated_at,
        COALESCE(p.title, '기본 프로필') AS profile_title,
        COUNT(ri.id)::int AS block_count
      FROM resumes r
      LEFT JOIN profiles p ON p.id = r.profile_id
      LEFT JOIN resume_items ri ON ri.resume_id = r.id
      GROUP BY r.id, p.title
      ORDER BY r.updated_at DESC
    `;
    return json(200, { items: rows });
  } catch (error) {
    return json(200, { items: fallback, fallback: true, error: error.message });
  }
};
