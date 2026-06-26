-- ============================================================
-- 021 — Log de auditoria (quem alterou o quê e quando)
-- Captura automaticamente, via trigger, todo insert/update/delete
-- nas entidades principais: projetos, indicadores, metas,
-- objetivos e usuarios (mudança de perfil/secretaria/ativo).
-- ============================================================

create table log_auditoria (
  id            uuid primary key default uuid_generate_v4(),
  municipio_id  uuid,
  tabela        text not null,
  registro_id   uuid not null,
  acao          text not null check (acao in ('insert', 'update', 'delete')),
  usuario_id    uuid references usuarios on delete set null,
  dados_antigos jsonb,
  dados_novos   jsonb,
  created_at    timestamptz not null default now()
);

create index idx_log_auditoria_tabela    on log_auditoria (tabela);
create index idx_log_auditoria_registro  on log_auditoria (registro_id);
create index idx_log_auditoria_municipio on log_auditoria (municipio_id);
create index idx_log_auditoria_created   on log_auditoria (created_at desc);

alter table log_auditoria enable row level security;

create policy "log_auditoria_select" on log_auditoria
  for select to authenticated
  using (municipio_id = auth_municipio_id() and auth_perfil() = 'admin');

-- ── Função de trigger genérica ──────────────────────────────
create or replace function fn_log_auditoria()
returns trigger language plpgsql security definer as $$
declare
  v_municipio_id uuid;
begin
  v_municipio_id := case when TG_OP = 'DELETE' then OLD.municipio_id else NEW.municipio_id end;

  insert into log_auditoria (municipio_id, tabela, registro_id, acao, usuario_id, dados_antigos, dados_novos)
  values (
    v_municipio_id,
    TG_TABLE_NAME,
    case when TG_OP = 'DELETE' then OLD.id else NEW.id end,
    lower(TG_OP),
    auth.uid(),
    case when TG_OP in ('UPDATE', 'DELETE') then to_jsonb(OLD) else null end,
    case when TG_OP in ('INSERT', 'UPDATE') then to_jsonb(NEW) else null end
  );

  return coalesce(NEW, OLD);
end;
$$;

-- ── Triggers nas entidades principais ────────────────────────
create trigger trg_log_projetos
  after insert or update or delete on projetos
  for each row execute function fn_log_auditoria();

create trigger trg_log_indicadores
  after insert or update or delete on indicadores
  for each row execute function fn_log_auditoria();

create trigger trg_log_metas
  after insert or update or delete on metas
  for each row execute function fn_log_auditoria();

create trigger trg_log_objetivos
  after insert or update or delete on objetivos
  for each row execute function fn_log_auditoria();

create trigger trg_log_usuarios
  after insert or update or delete on usuarios
  for each row execute function fn_log_auditoria();
