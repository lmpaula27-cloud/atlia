-- ============================================================
-- 010 — Metas Estratégicas (entre Objetivos e Projetos)
-- ============================================================

create table if not exists metas (
  id           uuid primary key default uuid_generate_v4(),
  municipio_id uuid not null references municipios on delete cascade,
  objetivo_id  uuid not null references objetivos  on delete cascade,
  nome         text not null,
  descricao    text,
  pct_atual    smallint not null default 0 check (pct_atual between 0 and 100),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table metas enable row level security;

create policy "meta_select" on metas
  for select using (municipio_id = auth_municipio_id());

create policy "meta_insert" on metas
  for insert with check (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

create policy "meta_update" on metas
  for update using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

create policy "meta_delete" on metas
  for delete using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

-- Vínculo opcional de projeto a uma meta específica (além do objetivo já existente)
alter table projetos
  add column if not exists meta_id uuid references metas on delete set null;
