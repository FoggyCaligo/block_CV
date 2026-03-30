import { computed, reactive } from "vue";

let idSeq = 1;
const nextId = () => idSeq++;
const nextRowId = () => idSeq++;

export const templateCatalog = [
  { key: "basic", name: "기본형", description: "제목 + 소제목 + 내용" },
  { key: "experience", name: "경력 템플릿", description: "소제목 + 내용이 여러 개 들어가는 형식" },
  { key: "award", name: "수상내역 템플릿", description: "고정 컬럼 표 형식" },
  { key: "certificate", name: "자격증 템플릿", description: "고정 컬럼 표 형식" },
  { key: "language", name: "언어능력 템플릿", description: "고정 컬럼 표 형식" },
  { key: "skill", name: "기술스택 템플릿", description: "요소를 여러 개 추가하는 형식" }
];

function createEmptyProfile(title = "새 기본정보") {
  return {
    id: nextId(),
    title,
    photo: "",
    name: "",
    tel: "",
    email: "",
    location: ""
  };
}

function createBlockByTemplate(templateKey) {
  switch (templateKey) {
    case "experience":
      return {
        id: nextId(),
        template: "experience",
        title: "",
        items: [
          { id: nextRowId(), subtitle: "", content: "" }
        ]
      };
    case "award":
      return {
        id: nextId(),
        template: "award",
        title: "",
        rows: [
          { id: nextRowId(), awardName: "", organizer: "", date: "" }
        ]
      };
    case "certificate":
      return {
        id: nextId(),
        template: "certificate",
        title: "",
        rows: [
          { id: nextRowId(), certificateName: "", issuer: "", date: "" }
        ]
      };
    case "language":
      return {
        id: nextId(),
        template: "language",
        title: "",
        rows: [
          { id: nextRowId(), language: "", grade: "", date: "" }
        ]
      };
    case "skill":
      return {
        id: nextId(),
        template: "skill",
        title: "",
        pendingSkill: "",
        skills: []
      };
    default:
      return {
        id: nextId(),
        template: "basic",
        title: "",
        subtitle: "",
        body: ""
      };
  }
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

export const state = reactive({
  profiles: [],
  blocks: [],
  resumes: [],
  editorProfileId: null,
  composer: {
    editingResumeId: null,
    title: "",
    profileId: null,
    blockIds: [],
    selfIntro: ""
  }
});

export const stats = {
  profileCount: computed(() => state.profiles.length),
  blockCount: computed(() => state.blocks.length),
  templateCount: computed(() => templateCatalog.length),
  resumeCount: computed(() => state.resumes.length)
};

export function addProfile() {
  const profile = createEmptyProfile(`기본정보 ${state.profiles.length + 1}`);
  state.profiles.push(profile);
  state.editorProfileId = profile.id;
  if (!state.composer.profileId) state.composer.profileId = profile.id;
  return profile;
}

export function removeProfile(id) {
  state.profiles = state.profiles.filter((item) => item.id !== id);
  if (state.editorProfileId === id) {
    state.editorProfileId = state.profiles[0]?.id ?? null;
  }
  if (state.composer.profileId === id) {
    state.composer.profileId = state.profiles[0]?.id ?? null;
  }
}

export function selectEditorProfile(id) {
  state.editorProfileId = id;
}

export function addBlock(templateKey) {
  const block = createBlockByTemplate(templateKey);
  state.blocks.push(block);
  return block;
}

export function removeBlock(id) {
  state.blocks = state.blocks.filter((item) => item.id !== id);
  state.composer.blockIds = state.composer.blockIds.filter((blockId) => blockId !== id);
}

export function moveBlock(id, direction) {
  const index = state.blocks.findIndex((item) => item.id === id);
  if (index < 0) return;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= state.blocks.length) return;
  const cloneBlocks = [...state.blocks];
  [cloneBlocks[index], cloneBlocks[target]] = [cloneBlocks[target], cloneBlocks[index]];
  state.blocks = cloneBlocks;
}

export function addExperienceItem(block) {
  block.items.push({ id: nextRowId(), subtitle: "", content: "" });
}

export function removeExperienceItem(block, rowId) {
  block.items = block.items.filter((row) => row.id !== rowId);
  if (!block.items.length) addExperienceItem(block);
}

export function addTableRow(block) {
  const rowTemplates = {
    award: { awardName: "", organizer: "", date: "" },
    certificate: { certificateName: "", issuer: "", date: "" },
    language: { language: "", grade: "", date: "" }
  };
  block.rows.push({ id: nextRowId(), ...rowTemplates[block.template] });
}

export function removeTableRow(block, rowId) {
  block.rows = block.rows.filter((row) => row.id !== rowId);
  if (!block.rows.length) addTableRow(block);
}

export function addSkill(block) {
  const value = block.pendingSkill?.trim();
  if (!value) return;
  block.skills.push({ id: nextRowId(), label: value });
  block.pendingSkill = "";
}

export function removeSkill(block, skillId) {
  block.skills = block.skills.filter((item) => item.id !== skillId);
}

export function resetComposer() {
  state.composer.editingResumeId = null;
  state.composer.title = "";
  state.composer.profileId = state.profiles[0]?.id ?? null;
  state.composer.blockIds = [];
  state.composer.selfIntro = "";
}

export function selectComposerProfile(profileId) {
  state.composer.profileId = profileId;
}

export function addBlockToComposer(blockId) {
  if (!state.composer.blockIds.includes(blockId)) {
    state.composer.blockIds.push(blockId);
  }
}

export function removeBlockFromComposer(blockId) {
  state.composer.blockIds = state.composer.blockIds.filter((id) => id !== blockId);
}

export function moveComposerBlock(blockId, direction) {
  const index = state.composer.blockIds.findIndex((id) => id === blockId);
  if (index < 0) return;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= state.composer.blockIds.length) return;
  const copy = [...state.composer.blockIds];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  state.composer.blockIds = copy;
}

export function saveComposer() {
  const payload = {
    id: state.composer.editingResumeId ?? nextId(),
    title: state.composer.title.trim() || `이력서 ${state.resumes.length + 1}`,
    profileId: state.composer.profileId,
    blockIds: [...state.composer.blockIds],
    selfIntro: state.composer.selfIntro,
    updatedAt: new Date().toLocaleString("ko-KR")
  };

  const index = state.resumes.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    state.resumes[index] = payload;
  } else {
    state.resumes.unshift(payload);
  }
  state.composer.editingResumeId = payload.id;
  return payload;
}

export function loadResumeToComposer(resumeId) {
  const found = state.resumes.find((item) => item.id === resumeId);
  if (!found) return null;
  state.composer.editingResumeId = found.id;
  state.composer.title = found.title;
  state.composer.profileId = found.profileId;
  state.composer.blockIds = [...found.blockIds];
  state.composer.selfIntro = found.selfIntro;
  return found;
}

export function getProfileById(id) {
  return state.profiles.find((item) => item.id === id) ?? null;
}

export function getBlockById(id) {
  return state.blocks.find((item) => item.id === id) ?? null;
}

export function getComposerBlocks() {
  return state.composer.blockIds.map(getBlockById).filter(Boolean);
}

export function getResumePayload(resume) {
  const data = resume || {
    title: state.composer.title,
    profileId: state.composer.profileId,
    blockIds: state.composer.blockIds,
    selfIntro: state.composer.selfIntro
  };
  return {
    title: data.title,
    profile: getProfileById(data.profileId),
    blocks: data.blockIds.map(getBlockById).filter(Boolean),
    selfIntro: data.selfIntro
  };
}

resetComposer();
