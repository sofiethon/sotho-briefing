-- Issue 2: Eigene Quiz-Bilder der Designerin
-- Einmal im Supabase-Dashboard unter „SQL Editor“ einfügen und auf „Run“ klicken.

-- 1. Tabelle: ein Eintrag pro Quiz-Bild
create table if not exists public.quiz_bilder (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  bild_pfad text not null,
  temperatur text not null check (temperatur in ('warm', 'kühl')),
  material text not null check (material in ('natürlich', 'elegant')),
  fuelle text not null check (fuelle in ('schlicht', 'lebendig')),
  created_at timestamptz not null default now()
);

-- 2. Regeln (Row Level Security): Quiz ist öffentlich lesbar, ändern darf nur die Besitzerin
alter table public.quiz_bilder enable row level security;

create policy "Quiz-Bilder sind für alle lesbar"
  on public.quiz_bilder for select
  to anon, authenticated
  using (true);

create policy "Designerin legt eigene Bilder an"
  on public.quiz_bilder for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Designerin löscht eigene Bilder"
  on public.quiz_bilder for delete
  to authenticated
  using (auth.uid() = user_id);

-- 3. Speicherplatz für die Bilddateien (öffentlich lesbar, nur Bilder, höchstens 5 MB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quiz-bilder', 'quiz-bilder', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "Designerin lädt in den eigenen Ordner hoch"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'quiz-bilder' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Designerin löscht Dateien im eigenen Ordner"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'quiz-bilder' and (storage.foldername(name))[1] = auth.uid()::text);
