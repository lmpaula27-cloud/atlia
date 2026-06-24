-- ============================================================
-- 015 — Visualizador restrito por secretaria
-- Hoje qualquer usuário do município vê todos os projetos/indicadores,
-- independente do perfil. Gestor já só EDITA a própria secretaria
-- (migration 009). Agora o visualizador também só VÊ as secretarias
-- vinculadas a ele em usuarios_secretarias. Admin e gestor continuam
-- vendo tudo (gestor pode precisar de contexto de outras secretarias).
-- ============================================================

drop policy if exists "proj_select" on projetos;
create policy "proj_select" on projetos
  for select
  using (
    municipio_id = auth_municipio_id()
    and (auth_perfil() <> 'visualizador' or auth_tem_secretaria(secretaria_id))
  );

drop policy if exists "ind_select" on indicadores;
create policy "ind_select" on indicadores
  for select
  using (
    municipio_id = auth_municipio_id()
    and (auth_perfil() <> 'visualizador' or auth_tem_secretaria(secretaria_id))
  );

-- marco_select e medicao_select (migration 009) consultam projetos/indicadores
-- via subquery — herdam automaticamente a restrição acima.
