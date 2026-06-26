-- ============================================================
-- 020 — Diário de bordo: RLS granular para historico_projetos
-- Hoje a policy é "for all" sem distinção de perfil — qualquer
-- usuário do município (inclusive visualizador) pode escrever.
-- Agora só admin ou o gestor da secretaria do projeto podem
-- registrar/editar atualizações; exclusão fica restrita a admin.
-- ============================================================

drop policy if exists "historico_via_projeto" on historico_projetos;

create policy "historico_select" on historico_projetos
  for select
  using (projeto_id in (select id from projetos where municipio_id = auth_municipio_id()));

create policy "historico_insert" on historico_projetos
  for insert
  with check (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(p.secretaria_id)))
    )
  );

create policy "historico_update" on historico_projetos
  for update
  using (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and (auth_perfil() = 'admin' or (auth_perfil() = 'gestor' and auth_tem_secretaria(p.secretaria_id)))
    )
  );

create policy "historico_delete" on historico_projetos
  for delete
  using (
    exists (
      select 1 from projetos p
      where p.id = projeto_id
        and p.municipio_id = auth_municipio_id()
        and auth_perfil() = 'admin'
    )
  );
