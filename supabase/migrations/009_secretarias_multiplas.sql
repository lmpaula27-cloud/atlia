-- ============================================================
-- 009 — Acesso a múltiplas secretarias por usuário
--        + fechamento de brechas RLS (marcos, medições,
--          eixos, objetivos, secretarias)
-- ============================================================

-- ── 1. Tabela de vínculo usuário ↔ secretarias ──────────────
create table if not exists usuarios_secretarias (
  usuario_id    uuid not null references usuarios    on delete cascade,
  secretaria_id uuid not null references secretarias on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (usuario_id, secretaria_id)
);

alter table usuarios_secretarias enable row level security;

-- Cada usuário vê seus próprios vínculos; admin vê e gerencia todos
create policy "usec_select" on usuarios_secretarias
  for select to authenticated
  using (usuario_id = auth.uid() or auth_perfil() = 'admin');

create policy "usec_insert" on usuarios_secretarias
  for insert to authenticated
  with check (auth_perfil() = 'admin');

create policy "usec_delete" on usuarios_secretarias
  for delete to authenticated
  using (auth_perfil() = 'admin');

-- ── 2. Migra os vínculos existentes (1 secretaria por usuário) ──
insert into usuarios_secretarias (usuario_id, secretaria_id)
select id, secretaria_id from usuarios
where secretaria_id is not null
on conflict do nothing;

-- ── 3. Função: o usuário logado tem acesso à secretaria? ────
create or replace function auth_tem_secretaria(sid uuid)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from usuarios_secretarias
    where usuario_id = auth.uid() and secretaria_id = sid
  )
$$;

-- ── 4. Atualiza políticas de PROJETOS (multi-secretaria) ────
drop policy if exists "proj_insert" on projetos;
create policy "proj_insert" on projetos
  for insert
  with check (
    municipio_id = auth_municipio_id()
    and (
      auth_perfil() = 'admin'
      or (auth_perfil() = 'gestor' and auth_tem_secretaria(secretaria_id))
    )
  );

drop policy if exists "proj_update" on projetos;
create policy "proj_update" on projetos
  for update
  using  (municipio_id = auth_municipio_id())
  with check (
    auth_perfil() = 'admin'
    or (auth_perfil() = 'gestor' and auth_tem_secretaria(secretaria_id))
  );

-- ── 5. Atualiza políticas de INDICADORES (multi-secretaria) ─
drop policy if exists "ind_insert" on indicadores;
create policy "ind_insert" on indicadores
  for insert
  with check (
    municipio_id = auth_municipio_id()
    and (
      auth_perfil() = 'admin'
      or (auth_perfil() = 'gestor' and auth_tem_secretaria(secretaria_id))
    )
  );

drop policy if exists "ind_update" on indicadores;
create policy "ind_update" on indicadores
  for update
  using  (municipio_id = auth_municipio_id())
  with check (
    auth_perfil() = 'admin'
    or (auth_perfil() = 'gestor' and auth_tem_secretaria(secretaria_id))
  );

-- ── 6. Fecha brecha: MARCOS (escrita só admin ou gestor da secretaria do projeto)
drop policy if exists "marco_via_projeto" on marcos;

create policy "marco_select" on marcos
  for select
  using (projeto_id in (select id from projetos where municipio_id = auth_municipio_id()));

create policy "marco_write" on marcos
  for insert
  with check (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(p.secretaria_id)))
    )
  );

create policy "marco_update" on marcos
  for update
  using (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(p.secretaria_id)))
    )
  );

create policy "marco_delete" on marcos
  for delete
  using (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(p.secretaria_id)))
    )
  );

-- ── 7. Fecha brecha: MEDIÇÕES (idem, via indicador) ─────────
drop policy if exists "medicao_via_indicador" on medicoes_indicadores;

create policy "medicao_select" on medicoes_indicadores
  for select
  using (indicador_id in (select id from indicadores where municipio_id = auth_municipio_id()));

create policy "medicao_write" on medicoes_indicadores
  for insert
  with check (
    exists (
      select 1 from indicadores i
      where i.id = indicador_id
        and i.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(i.secretaria_id)))
    )
  );

create policy "medicao_update" on medicoes_indicadores
  for update
  using (
    exists (
      select 1 from indicadores i
      where i.id = indicador_id
        and i.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(i.secretaria_id)))
    )
  );

create policy "medicao_delete" on medicoes_indicadores
  for delete
  using (
    exists (
      select 1 from indicadores i
      where i.id = indicador_id
        and i.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(i.secretaria_id)))
    )
  );

-- ── 8. Fecha brecha: EIXOS, OBJETIVOS e SECRETARIAS (escrita só admin)
drop policy if exists "eixo_municipio" on eixos;
create policy "eixo_select" on eixos
  for select using (municipio_id = auth_municipio_id());
create policy "eixo_insert" on eixos
  for insert with check (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "eixo_update" on eixos
  for update using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "eixo_delete" on eixos
  for delete using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

drop policy if exists "objetivo_municipio" on objetivos;
create policy "obj_select" on objetivos
  for select using (municipio_id = auth_municipio_id());
create policy "obj_insert" on objetivos
  for insert with check (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "obj_update" on objetivos
  for update using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "obj_delete" on objetivos
  for delete using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

drop policy if exists "secretaria_municipio" on secretarias;
create policy "sec_select" on secretarias
  for select using (municipio_id = auth_municipio_id());
create policy "sec_insert" on secretarias
  for insert with check (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "sec_update" on secretarias
  for update using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');
create policy "sec_delete" on secretarias
  for delete using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

-- ── 9. Conferência ──────────────────────────────────────────
select u.nome, count(us.secretaria_id) as secretarias_vinculadas
from usuarios u
left join usuarios_secretarias us on us.usuario_id = u.id
group by u.nome
order by u.nome;
