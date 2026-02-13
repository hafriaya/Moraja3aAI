-- Enable vector extension for embeddings
create extension if not exists vector;

-- Create Study Materials Table
create table public.study_materials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid, -- Loose reference to auth.users to allow Mock User ID
  title text not null,
  original_file_url text,
  processed_text_content text,
  created_at timestamp with time zone default now()
);

-- Create Document Sections Table (for RAG)
create table public.document_sections (
  id uuid default gen_random_uuid() primary key,
  material_id uuid references public.study_materials on delete cascade,
  content_chunk text not null,
  embedding vector(1536)
);

-- Create Exams Table
create table public.exams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid, -- Loose reference
  material_source_id uuid references public.study_materials on delete set null,
  title text not null,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  status text check (status in ('generating', 'ready', 'completed')),
  score integer,
  created_at timestamp with time zone default now(),
  user_answers jsonb -- For storing user submissions
);

-- Create Questions Table
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references public.exams on delete cascade,
  question_text text not null,
  options jsonb, -- Array of strings or objects
  correct_answer text not null,
  explanation text,
  order_index integer
);

-- Profiles
create table public.profiles (
  id uuid primary key, -- References auth.users
  full_name text,
  role text,
  avatar_url text, -- New
  grade_level text, -- New
  created_at timestamp with time zone default now()
);

-- Notifications
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  message text not null,
  type text check (type in ('info', 'success', 'warning', 'error')) default 'info',
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Flashcard Sets
create table public.flashcard_sets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid, -- "Loose reference" to allow Mock User ID (Foreign Key removed)
  exam_source_id uuid references public.exams(id), -- Linked to the exam result
  title text not null,
  created_at timestamp with time zone default now()
);

-- Flashcards
create table public.flashcards (
  id uuid default gen_random_uuid() primary key,
  set_id uuid references public.flashcard_sets(id) on delete cascade,
  front text not null, -- The Question/Concept
  back text not null,  -- The Answer/Definition
  is_mastered boolean default false
);

-- RLS Policies (Open for Dev - Secure later!)
alter table public.study_materials enable row level security;
alter table public.document_sections enable row level security;
alter table public.exams enable row level security;
alter table public.questions enable row level security;
alter table public.profiles enable row level security;
alter table public.notifications enable row level security;
alter table public.flashcard_sets enable row level security;
alter table public.flashcards enable row level security;

-- Policy: Allow all for now (simulating "public" access for dev)
create policy "Allow all access to study_materials" on public.study_materials for all using (true) with check (true);
create policy "Allow all access to exams" on public.exams for all using (true) with check (true);
create policy "Allow all access to questions" on public.questions for all using (true) with check (true);
create policy "Allow all access to profiles" on public.profiles for all using (true) with check (true);
create policy "Allow all access to notifications" on public.notifications for all using (true) with check (true);

-- Drop restrictive policies if they exist (to avoid conflicts in future runs, though duplicate policy names usually error)
-- We will just add the permissive ones. Postgres policies are OR-ed.
create policy "Allow all access to flashcard_sets" on public.flashcard_sets for all using (true) with check (true);
create policy "Allow all access to flashcards" on public.flashcards for all using (true) with check (true);
create policy "Allow all access to document_sections" on public.document_sections for all using (true) with check (true);
