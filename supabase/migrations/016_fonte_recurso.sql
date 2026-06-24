-- ============================================================
-- 016 — Fonte de recurso do projeto (gestão de custo, item 4 do backlog)
-- ============================================================

alter table projetos add column if not exists fonte_recurso text;
