-- Tabela de leads capturados pela landing page pública
create table if not exists leads (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null,
  municipio  text not null,
  cargo      text,
  email      text not null,
  telefone   text,
  interesse  text not null default 'demo',   -- demo | consultoria | ambos
  status     text not null default 'novo',   -- novo | contatado | convertido | descartado
  criado_em  timestamptz not null default now()
);

alter table leads enable row level security;

-- Inserção é feita apenas pela API do servidor (service role, que ignora RLS).
-- Leitura/gestão: somente administradores autenticados.
create policy "leads_select_admin" on leads
  for select to authenticated using (auth_perfil() = 'admin');

create policy "leads_update_admin" on leads
  for update to authenticated using (auth_perfil() = 'admin');

create policy "leads_delete_admin" on leads
  for delete to authenticated using (auth_perfil() = 'admin');
