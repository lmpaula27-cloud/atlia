-- ============================================================
-- 017 — Gestor pode ver vínculos de usuários da própria secretaria
-- Sem isso, o gestor só via seus próprios vínculos em
-- usuarios_secretarias, e a lista de usuários em Configurações
-- não conseguia resolver as secretarias de outros usuários
-- (visualizadores, outros gestores) da mesma secretaria.
-- ============================================================

drop policy if exists "usec_select" on usuarios_secretarias;
create policy "usec_select" on usuarios_secretarias
  for select to authenticated
  using (
    usuario_id = auth.uid()
    or auth_perfil() = 'admin'
    or (auth_perfil() = 'gestor' and auth_tem_secretaria(secretaria_id))
  );
