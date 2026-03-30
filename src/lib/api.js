const jsonHeaders = {
  "Content-Type": "application/json"
};

async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: jsonHeaders,
    ...options
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function getBlocks() {
  return request("/blocks");
}

export function getResumes() {
  return request("/resumes");
}

export function getResume(id) {
  return request(`/resume-detail?id=${id}`);
}
