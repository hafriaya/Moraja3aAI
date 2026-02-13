-- Only run these lines if you haven't yet (ignore if they error saying 'exists')
create policy "Allow all access to flashcard_sets" on public.flashcard_sets for all using (true) with check (true);
create policy "Allow all access to flashcards" on public.flashcards for all using (true) with check (true);
