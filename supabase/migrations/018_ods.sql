-- ============================================================
-- 018 — ODS (Objetivos de Desenvolvimento Sustentável da ONU)
-- vínculo N:N com metas estratégicas
-- ============================================================

create table if not exists ods (
  id     uuid primary key default uuid_generate_v4(),
  numero smallint not null unique check (numero between 1 and 17),
  nome   text not null,
  cor    text not null
);

insert into ods (numero, nome, cor) values
  (1,  'Erradicação da Pobreza',                       '#E5243B'),
  (2,  'Fome Zero e Agricultura Sustentável',           '#DDA63A'),
  (3,  'Saúde e Bem-Estar',                             '#4C9F38'),
  (4,  'Educação de Qualidade',                         '#C5192D'),
  (5,  'Igualdade de Gênero',                           '#FF3A21'),
  (6,  'Água Potável e Saneamento',                     '#26BDE2'),
  (7,  'Energia Limpa e Acessível',                     '#FCC30B'),
  (8,  'Trabalho Decente e Crescimento Econômico',      '#A21942'),
  (9,  'Indústria, Inovação e Infraestrutura',          '#FD6925'),
  (10, 'Redução das Desigualdades',                     '#DD1367'),
  (11, 'Cidades e Comunidades Sustentáveis',            '#FD9D24'),
  (12, 'Consumo e Produção Responsáveis',               '#BF8B2E'),
  (13, 'Ação Contra a Mudança Global do Clima',         '#3F7E44'),
  (14, 'Vida na Água',                                  '#0A97D9'),
  (15, 'Vida Terrestre',                                '#56C02B'),
  (16, 'Paz, Justiça e Instituições Fortes',            '#00689D'),
  (17, 'Parcerias e Meios de Implementação',            '#19486A')
on conflict (numero) do nothing;

-- Leitura livre para qualquer usuário autenticado (tabela de referência, sem dado sensível)
alter table ods enable row level security;
create policy "ods_select" on ods for select to authenticated using (true);

-- ── Vínculo N:N meta ↔ ODS ──────────────────────────────────
create table if not exists metas_ods (
  meta_id    uuid not null references metas on delete cascade,
  ods_id     uuid not null references ods    on delete cascade,
  created_at timestamptz not null default now(),
  primary key (meta_id, ods_id)
);

alter table metas_ods enable row level security;

create policy "metas_ods_select" on metas_ods
  for select to authenticated
  using (meta_id in (select id from metas));

create policy "metas_ods_insert" on metas_ods
  for insert to authenticated
  with check (auth_perfil() = 'admin');

create policy "metas_ods_delete" on metas_ods
  for delete to authenticated
  using (auth_perfil() = 'admin');
