-- Bucket público para fotos de perfil e banner
insert into storage.buckets (id, name, public)
values ('profile-assets', 'profile-assets', true)
on conflict (id) do nothing;

-- Tabela para guardar URLs atuais de fotos de perfil e banner
create table if not exists public.profile_assets (
  id uuid primary key default gen_random_uuid(),
  profile_url text,
  banner_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profile_assets enable row level security;

-- Função genérica para updated_at (caso ainda não exista)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para manter updated_at em profile_assets
create trigger profile_assets_set_updated_at
before update on public.profile_assets
for each row
execute function public.update_updated_at_column();

-- Políticas RLS: leitura e escrita liberadas (não há dados sensíveis aqui)
create policy "Profile assets are readable by anyone"
on public.profile_assets
for select
using (true);

create policy "Profile assets can be inserted by anyone"
on public.profile_assets
for insert
with check (true);

create policy "Profile assets can be updated by anyone"
on public.profile_assets
for update
using (true)
with check (true);

-- Policies de storage para o bucket profile-assets
create policy "Public can view profile assets"
on storage.objects
for select
using (bucket_id = 'profile-assets');

create policy "Public can upload profile assets"
on storage.objects
for insert
with check (bucket_id = 'profile-assets');

create policy "Public can update profile assets"
on storage.objects
for update
using (bucket_id = 'profile-assets')
with check (bucket_id = 'profile-assets');
