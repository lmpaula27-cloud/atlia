-- ============================================================
-- ATLIA — Migração 004: Missão, Visão e Valores do Município
-- ============================================================

alter table municipios
  add column if not exists missao  text,
  add column if not exists visao   text,
  add column if not exists valores text[];
