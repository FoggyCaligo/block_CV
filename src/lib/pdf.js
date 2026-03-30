import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { getResumePayload } from "./store";

function blockHtml(block) {
  if (block.template === "basic") {
    return `
      <section style="margin-top:18px;">
        <div style="font-size:15px;font-weight:700;color:#143057;">${block.title || "제목 없음"}</div>
        ${block.subtitle ? `<div style="margin-top:5px;font-size:12px;color:#60748d;">${block.subtitle}</div>` : ""}
        ${block.body ? `<div style="margin-top:8px;font-size:13px;line-height:1.8;color:#1f2a37;white-space:pre-wrap;">${block.body}</div>` : ""}
      </section>`;
  }
  if (block.template === "experience") {
    return `
      <section style="margin-top:18px;">
        <div style="font-size:15px;font-weight:700;color:#143057;">${block.title || "경력"}</div>
        ${block.items.map((item) => `
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid #edf4fb;">
            <div style="font-size:13px;font-weight:700;color:#143057;">${item.subtitle || "소제목"}</div>
            <div style="margin-top:6px;font-size:13px;line-height:1.8;color:#1f2a37;white-space:pre-wrap;">${item.content || ""}</div>
          </div>`).join("")}
      </section>`;
  }
  if (["award", "certificate", "language"].includes(block.template)) {
    const headers = {
      award: ["수상명", "주최", "날짜"],
      certificate: ["자격명", "발급기관", "취득일"],
      language: ["언어", "등급", "취득일"]
    }[block.template];
    const cells = {
      award: ["awardName", "organizer", "date"],
      certificate: ["certificateName", "issuer", "date"],
      language: ["language", "grade", "date"]
    }[block.template];
    return `
      <section style="margin-top:18px;">
        <div style="font-size:15px;font-weight:700;color:#143057;">${block.title || "표 형식 블록"}</div>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:12px;">
          <thead>
            <tr>${headers.map((header) => `<th style="border:1px solid #dbe7f4;padding:8px 10px;background:#f5f9ff;text-align:left;">${header}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${block.rows.map((row) => `<tr>${cells.map((key) => `<td style="border:1px solid #dbe7f4;padding:8px 10px;">${row[key] || ""}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </section>`;
  }
  if (block.template === "skill") {
    return `
      <section style="margin-top:18px;">
        <div style="font-size:15px;font-weight:700;color:#143057;">${block.title || "기술스택"}</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
          ${block.skills.map((skill) => `<span style="display:inline-flex;padding:7px 10px;border-radius:999px;background:#e8f1ff;color:#1d4ed8;border:1px solid #c8dbff;font-size:12px;font-weight:700;">${skill.label}</span>`).join("")}
        </div>
      </section>`;
  }
  return "";
}

function buildHtml(payload) {
  const profile = payload.profile || { name: "", tel: "", email: "", location: "" };
  return `
    <div style="width:794px;background:#fff;padding:40px;font-family:'Noto Sans KR',Arial,sans-serif;color:#1f2a37;">
      <div style="display:grid;grid-template-columns:120px 1fr;gap:20px;padding-bottom:24px;border-bottom:1px solid #dde8f4;">
        <div style="width:120px;height:160px;border-radius:20px;border:1px dashed #a9c4e6;background:#f8fbff;display:flex;align-items:center;justify-content:center;font-size:12px;color:#6884a4;">사진</div>
        <div>
          <div style="font-size:32px;font-weight:800;color:#102543;">${profile.name || payload.title || "이력서"}</div>
          <div style="margin-top:14px;font-size:13px;line-height:1.9;color:#4e647e;">
            ${profile.tel ? `Tel · ${profile.tel}<br>` : ""}
            ${profile.email ? `Email · ${profile.email}<br>` : ""}
            ${profile.location ? `${profile.location}` : ""}
          </div>
        </div>
      </div>
      ${payload.blocks.map((block) => blockHtml(block)).join("")}
      <section style="margin-top:22px;">
        <div style="font-size:15px;font-weight:700;color:#143057;">자기소개글</div>
        <div style="margin-top:10px;font-size:13px;line-height:1.9;color:#1f2a37;white-space:pre-wrap;">${payload.selfIntro || ""}</div>
      </section>
    </div>`;
}

export async function exportResumePdf(resume) {
  const payload = getResumePayload(resume);
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-99999px";
  wrapper.style.top = "0";
  wrapper.innerHTML = buildHtml(payload);
  document.body.appendChild(wrapper);

  const canvas = await html2canvas(wrapper.firstElementChild, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  const filename = `${payload.title || "resume"}.pdf`;
  pdf.save(filename);
  document.body.removeChild(wrapper);
}
