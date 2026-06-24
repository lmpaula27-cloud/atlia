-- ============================================================
-- 014 — Remove os indicadores de demonstração (seed da migration 002)
-- Nunca foram substituídos por dados reais; a tabela e o formulário
-- continuam disponíveis para cadastro de indicadores reais.
-- ============================================================

delete from medicoes_indicadores
where indicador_id in (select id from indicadores where id::text like '00000000-0000-0000-0006-%');

delete from indicadores
where id::text like '00000000-0000-0000-0006-%';
