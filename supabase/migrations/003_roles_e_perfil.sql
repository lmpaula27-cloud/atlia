-- ============================================================
-- ATLIA — Migração 003: Roles por Secretaria + Perfil Extra
-- ============================================================

-- ── 1. secretaria_id em usuarios ─────────────────────────────
alter table usuarios
  add column if not exists secretaria_id uuid references secretarias(id) on delete set null;

-- ── 2. Colunas extras em municipios ─────────────────────────
alter table municipios
  add column if not exists prefeito       text,
  add column if not exists site           text,
  add column if not exists email_contato  text,
  add column if not exists telefone       text,
  add column if not exists endereco       text,
  add column if not exists mandato_inicio date,
  add column if not exists mandato_fim    date;

-- ── 3. Funções auxiliares para RLS ──────────────────────────
create or replace function auth_perfil()
returns text language sql stable security definer as $$
  select perfil::text from usuarios where id = auth.uid()
$$;

create or replace function auth_secretaria_id()
returns uuid language sql stable security definer as $$
  select secretaria_id from usuarios where id = auth.uid()
$$;

-- ── 4. RLS granular para projetos ───────────────────────────
-- Remove política genérica "for all"
drop policy if exists "projeto_municipio" on projetos;

-- SELECT: qualquer usuário do município vê todos os projetos
create policy "proj_select" on projetos
  for select
  using (municipio_id = auth_municipio_id());

-- INSERT: admin cria para qualquer secretaria; gestor só para a própria
create policy "proj_insert" on projetos
  for insert
  with check (
    municipio_id = auth_municipio_id()
    and (
      auth_perfil() = 'admin'
      or (auth_perfil() = 'gestor' and secretaria_id = auth_secretaria_id())
    )
  );

-- UPDATE: todos do município podem tentar; check garante que gestor só edita a própria
create policy "proj_update" on projetos
  for update
  using  (municipio_id = auth_municipio_id())
  with check (
    auth_perfil() = 'admin'
    or (auth_perfil() = 'gestor' and secretaria_id = auth_secretaria_id())
  );

-- DELETE: somente admin
create policy "proj_delete" on projetos
  for delete
  using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

-- ── 5. RLS granular para indicadores ────────────────────────
drop policy if exists "indicador_municipio" on indicadores;

create policy "ind_select" on indicadores
  for select
  using (municipio_id = auth_municipio_id());

create policy "ind_insert" on indicadores
  for insert
  with check (
    municipio_id = auth_municipio_id()
    and (
      auth_perfil() = 'admin'
      or (auth_perfil() = 'gestor' and secretaria_id = auth_secretaria_id())
    )
  );

create policy "ind_update" on indicadores
  for update
  using  (municipio_id = auth_municipio_id())
  with check (
    auth_perfil() = 'admin'
    or (auth_perfil() = 'gestor' and secretaria_id = auth_secretaria_id())
  );

create policy "ind_delete" on indicadores
  for delete
  using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

-- ── 6. Seed: atualizar usuário demo com perfil admin ─────────
-- (execute manualmente após confirmar o auth.uid() do usuário demo)
-- update usuarios set perfil = 'admin' where id = '<seu-user-id>';
