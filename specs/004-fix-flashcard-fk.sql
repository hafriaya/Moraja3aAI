-- Fix for "foreign key constraint violation" on user_id
-- We need to relax the constraint to allow Mock User IDs during development, similar to the 'exams' table.

ALTER TABLE public.flashcard_sets
DROP CONSTRAINT IF EXISTS flashcard_sets_user_id_fkey;

-- We don't add a new constraint, effectively making it a "loose reference"
-- This allows '00000000-0000-0000-0000-000000000000' to be stored.
