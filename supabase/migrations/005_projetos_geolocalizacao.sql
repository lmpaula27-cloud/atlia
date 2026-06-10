-- ============================================================
-- ATLIA — Migração 005: Geolocalização de Projetos
-- ============================================================

alter table projetos
  add column if not exists lat    double precision,
  add column if not exists lng    double precision,
  add column if not exists bairro text;
