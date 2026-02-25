-- CareerLover Database Schema for Neon
-- PostgreSQL 16+
-- 
-- INSTRUCTIONS:
-- 1. Go to https://neon.tech and create a new project
-- 2. Copy your connection string (it will look like: postgresql://user:password@host/database)
-- 3. Open the Neon SQL Editor in your project dashboard
-- 4. Paste this entire file and click "Run"
-- 5. Copy the connection string to your .env.local as DATABASE_URL

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For password hashing

-- ============================================
-- TABLES
-- ============================================

-- Users table (OAuth authentication via Neon Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image VARCHAR(500), -- OAuth profile picture
  credits INTEGER DEFAULT 2,
  is_premium BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Sessions are managed by Neon Auth, no sessions table needed

-- Roadmaps table
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('entrepreneur', 'job_seeker')),
  intensity VARCHAR(50) NOT NULL CHECK (intensity IN ('chill', 'regular', 'intense')),
  target_role VARCHAR(255) NOT NULL,
  duration_months DECIMAL(4,2) NOT NULL,
  current_skills TEXT[],
  content JSONB NOT NULL,
  is_custom_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ATS analyses table
CREATE TABLE ats_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_filename VARCHAR(255),
  resume_text TEXT, -- Store extracted text instead of file URL
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  analysis_result JSONB NOT NULL,
  job_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table (pre-curated + AI-suggested)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('course', 'video', 'article', 'tool', 'book', 'template')),
  url VARCHAR(1000) NOT NULL,
  platform VARCHAR(100),
  is_free BOOLEAN DEFAULT TRUE,
  price DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  tags TEXT[] NOT NULL,
  difficulty VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'all')),
  rating DECIMAL(3,2),
  thumbnail_url VARCHAR(500),
  author VARCHAR(255),
  duration_hours DECIMAL(6,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit transactions table
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('roadmap_generation', 'ats_analysis', 'credit_purchase', 'initial_credits')),
  credits_changed INTEGER NOT NULL,
  credits_after INTEGER NOT NULL,
  payment_id VARCHAR(255),
  amount_paid DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX idx_roadmaps_type ON roadmaps(type);
CREATE INDEX idx_ats_analyses_user_id ON ats_analyses(user_id);
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_is_free ON resources(is_free);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Update users.updated_at on UPDATE
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Update roadmaps.updated_at on UPDATE
CREATE TRIGGER update_roadmaps_updated_at
  BEFORE UPDATE ON roadmaps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA (Optional - Pre-curated Resources)
-- ============================================

-- You can add some initial resources here if needed
-- Example:
-- INSERT INTO resources (title, description, type, url, platform, is_free, tags, difficulty)
-- VALUES ('Learn React', 'Official React documentation', 'article', 'https://react.dev', 'React', true, ARRAY['react', 'frontend'], 'beginner');

-- ============================================
-- VERIFICATION
-- ============================================

-- Run this to verify all tables were created successfully:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Expected output: ats_analyses, credit_transactions, resources, roadmaps, sessions, users
