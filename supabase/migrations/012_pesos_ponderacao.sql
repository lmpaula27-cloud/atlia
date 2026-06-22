-- ============================================================
-- 012 — Pesos (ponderação em cascata): projeto → meta → objetivo → visão
-- ============================================================

-- 1. Colunas de peso (default 1 = todos equivalem até serem ajustados)
alter table projetos  add column if not exists peso smallint not null default 1 check (peso > 0);
alter table metas     add column if not exists peso smallint not null default 1 check (peso > 0);
alter table objetivos add column if not exists peso smallint not null default 1 check (peso > 0);

-- 2. Pesos reais dos objetivos, conforme aba "Objetivos" da planilha PLANO_GOVERNO 2025-2028
update objetivos set peso = 1  where nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.';
update objetivos set peso = 2  where nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.';
update objetivos set peso = 3  where nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.';
update objetivos set peso = 23 where nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.';
update objetivos set peso = 2  where nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.';
update objetivos set peso = 1  where nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.';
update objetivos set peso = 3  where nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.';
update objetivos set peso = 1  where nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.';
update objetivos set peso = 2  where nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.';
update objetivos set peso = 2  where nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.';
update objetivos set peso = 3  where nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.';
update objetivos set peso = 2  where nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.';

-- 3. Recalcula pct_atual das METAS: média ponderada pelo peso dos projetos vinculados
update metas m
set pct_atual = coalesce((
  select round(sum(p.pct * p.peso)::numeric / sum(p.peso))::smallint
  from projetos p
  where p.meta_id = m.id
), m.pct_atual);

-- 4. Recalcula pct_atual dos OBJETIVOS: média ponderada pelo peso das metas vinculadas
update objetivos o
set pct_atual = coalesce((
  select round(sum(m.pct_atual * m.peso)::numeric / sum(m.peso))::smallint
  from metas m
  where m.objetivo_id = o.id
), o.pct_atual);

-- 5. Conferência: atingimento ponderado da VISÃO (todos os objetivos, sem distinção de eixo)
select
  round(sum(pct_atual * peso)::numeric / sum(peso), 1) as atingimento_visao_ponderado,
  round(avg(pct_atual), 1) as atingimento_visao_media_simples
from objetivos
where municipio_id = '00000000-0000-0000-0000-000000000001';
