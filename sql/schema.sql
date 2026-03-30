CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL DEFAULT '기본 프로필',
  photo_url TEXT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(120),
  address TEXT,
  github_url TEXT,
  blog_url TEXT,
  portfolio_url TEXT,
  short_intro TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id SERIAL PRIMARY KEY,
  template_type VARCHAR(50) NOT NULL,
  display_type VARCHAR(30) NOT NULL,
  title VARCHAR(160) NOT NULL,
  subtitle VARCHAR(200),
  tags_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE SET NULL,
  self_intro_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resume_items (
  id SERIAL PRIMARY KEY,
  resume_id INTEGER NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  content_block_id INTEGER NOT NULL REFERENCES content_blocks(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_blocks_template_type ON content_blocks(template_type);
CREATE INDEX IF NOT EXISTS idx_resume_items_resume_id ON resume_items(resume_id);
