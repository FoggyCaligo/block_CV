import { json } from "./_db.js";

export default async () => {
  return json(200, { ok: true, service: "block-resume-manager-api" });
};
