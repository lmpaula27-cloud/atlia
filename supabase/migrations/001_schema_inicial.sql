-- ============================================================
-- ATLIA — Schema Inicial
-- Multi-tenant: cada município é um tenant isolado por RLS
-- ============================================================

-- ── EXTENSÕES ────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── ENUMS ────────────────────────────────────────────────────
create type status_projeto   as enum ('nao_iniciado','em_andamento','atencao','atrasado','concluido');
create type prioridade_tipo  as enum ('alta','media','baixa');
create type tipo_ganho       as enum ('N/A','Operacional','Financeiro','Econômico');
create type status_marco     as enum ('pendente','em_andamento','concluido','atrasado');
create type perfil_usuario   as enum ('admin','gestor','visualizador');
create type plano_municipio  as enum ('starter','plus','pro');

-- ============================================================
-- 1. MUNICÍPIOS (tenants)
-- ============================================================
create table municipios (
  id           uuid primary key default uuid_generate_v4(),
  nome         text not null,
  estado       char(2) not null,
  populacao    integer,
  plano        plano_municipio not null default 'starter',
  ativo        boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- 2. USUÁRIOS (perfis vinculados ao auth.users)
-- ============================================================
create table usuarios (
  id             uuid primary key references auth.users on delete cascade,
  municipio_id   uuid not null references municipios on delete cascade,
  nome           text not null,
  cargo          text,
  perfil         perfil_usuario not null default 'visualizador',
  ativo          boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- 3. SECRETARIAS
-- ============================================================
create table secretarias (
  id             uuid primary key default uuid_generate_v4(),
  municipio_id   uuid not null references municipios on delete cascade,
  nome           text not null,
  sigla          text,
  responsavel    text,
  cor            text default '#2E75B6',
  ativa          boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- 4. EIXOS ESTRATÉGICOS
-- ============================================================
create table eixos (
  id             uuid primary key default uuid_generate_v4(),
  municipio_id   uuid not null references municipios on delete cascade,
  nome           text not null,
  descricao      text,
  cor            text default '#1F3864',
  ordem          smallint not null default 1,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- 5. OBJETIVOS ESTRATÉGICOS
-- ============================================================
create table objetivos (
  id             uuid primary key default uuid_generate_v4(),
  municipio_id   uuid not null references municipios on delete cascade,
  eixo_id        uuid not null references eixos on delete cascade,
  nome           text not null,
  descricao      text,
  pct_atual      smallint not null default 0 check (pct_atual between 0 and 100),
  created_at     timestamptz not null default now()
);

-- ============================================================
-- 6. PROJETOS
-- ============================================================
create table projetos (
  id             uuid primary key default uuid_generate_v4(),
  municipio_id   uuid not null references municipios on delete cascade,
  secretaria_id  uuid references secretarias on delete set null,
  objetivo_id    uuid references objetivos on delete set null,
  responsavel_id uuid references usuarios on delete set null,

  nome           text not null,
  descricao      text,
  status         status_projeto not null default 'nao_iniciado',
  prioridade     prioridade_tipo not null default 'media',
  tipo_ganho     tipo_ganho not null default 'N/A',

  orcamento      numeric(15,2) not null default 0,
  executado      numeric(15,2) not null default 0,
  pct            smallint not null default 0 check (pct between 0 and 100),

  data_inicio    date,
  data_fim       date,
  tags           text[] default '{}',

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ============================================================
-- 7. MARCOS (milestones)
-- ============================================================
create table marcos (
  id               uuid primary key default uuid_generate_v4(),
  projeto_id       uuid not null references projetos on delete cascade,
  titulo           text not null,
  descricao        text,
  data_prevista    date,
  data_conclusao   date,
  status           status_marco not null default 'pendente',
  pct              smallint not null default 0 check (pct between 0 and 100),
  ordem            smallint not null default 1,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- 8. HISTÓRICO DE PROJETOS
-- ============================================================
create table historico_projetos (
  id           uuid primary key default uuid_generate_v4(),
  projeto_id   uuid not null references projetos on delete cascade,
  usuario_id   uuid references usuarios on delete set null,
  tipo         text not null,   -- 'status','orcamento','marco','comentario'
  descricao    text not null,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- 9. INDICADORES (KPIs)
-- ============================================================
create table indicadores (
  id             uuid primary key default uuid_generate_v4(),
  municipio_id   uuid not null references municipios on delete cascade,
  secretaria_id  uuid references secretarias on delete set null,
  nome           text not null,
  descricao      text,
  unidade        text not null default '%',   -- '%','un','R$','min', etc.
  meta           numeric(15,2) not null default 100,
  valor_atual    numeric(15,2) not null default 0,
  menor_melhor   boolean not null default false,
  ano_referencia smallint not null default extract(year from now())::smallint,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ============================================================
-- 10. MEDIÇÕES MENSAIS DE INDICADORES
-- ============================================================
create table medicoes_indicadores (
  id             uuid primary key default uuid_generate_v4(),
  indicador_id   uuid not null references indicadores on delete cascade,
  mes            smallint not null check (mes between 1 and 12),
  ano            smallint not null,
  valor          numeric(15,2) not null,
  created_at     timestamptz not null default now(),
  unique (indicador_id, mes, ano)
);

-- ============================================================
-- ÍNDICES
-- ============================================================
create index idx_usuarios_municipio    on usuarios    (municipio_id);
create index idx_secretarias_municipio on secretarias (municipio_id);
create index idx_eixos_municipio       on eixos       (municipio_id);
create index idx_objetivos_eixo        on objetivos   (eixo_id);
create index idx_projetos_municipio    on projetos    (municipio_id);
create index idx_projetos_secretaria   on projetos    (secretaria_id);
create index idx_projetos_status       on projetos    (status);
create index idx_marcos_projeto        on marcos      (projeto_id);
create index idx_historico_projeto     on historico_projetos (projeto_id);
create index idx_indicadores_municipio on indicadores (municipio_id);

-- ============================================================
-- ROW LEVEL SECURITY (isolamento multi-tenant)
-- ============================================================
alter table municipios           enable row level security;
alter table usuarios             enable row level security;
alter table secretarias          enable row level security;
alter table eixos                enable row level security;
alter table objetivos            enable row level security;
alter table projetos             enable row level security;
alter table marcos               enable row level security;
alter table historico_projetos   enable row level security;
alter table indicadores          enable row level security;
alter table medicoes_indicadores enable row level security;

-- Função auxiliar: retorna o municipio_id do usuário logado
create or replace function auth_municipio_id()
returns uuid language sql stable security definer as $$
  select municipio_id from usuarios where id = auth.uid()
$$;

-- Políticas: cada usuário só vê dados do seu município
create policy "municipio_proprio"     on municipios           for all using (id = auth_municipio_id());
create policy "usuario_proprio_mun"   on usuarios             for all using (municipio_id = auth_municipio_id());
create policy "secretaria_municipio"  on secretarias          for all using (municipio_id = auth_municipio_id());
create policy "eixo_municipio"        on eixos                for all using (municipio_id = auth_municipio_id());
create policy "objetivo_municipio"    on objetivos            for all using (municipio_id = auth_municipio_id());
create policy "projeto_municipio"     on projetos             for all using (municipio_id = auth_municipio_id());
create policy "marco_via_projeto"     on marcos               for all using (projeto_id in (select id from projetos where municipio_id = auth_municipio_id()));
create policy "historico_via_projeto" on historico_projetos   for all using (projeto_id in (select id from projetos where municipio_id = auth_municipio_id()));
create policy "indicador_municipio"   on indicadores          for all using (municipio_id = auth_municipio_id());
create policy "medicao_via_indicador" on medicoes_indicadores for all using (indicador_id in (select id from indicadores where municipio_id = auth_municipio_id()));

-- ============================================================
-- TRIGGER: updated_at automático
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_municipios_updated  before update on municipios  for each row execute function set_updated_at();
create trigger trg_projetos_updated    before update on projetos     for each row execute function set_updated_at();
create trigger trg_indicadores_updated before update on indicadores  for each row execute function set_updated_at();

-- ============================================================
-- DADOS SEED — Município demo (Uberlândia)
-- (Execute depois de criar o primeiro usuário via auth)
-- ============================================================
insert into municipios (id, nome, estado, populacao, plano) values
  ('00000000-0000-0000-0000-000000000001', 'Prefeitura Municipal de Uberlândia', 'MG', 706597, 'pro');
