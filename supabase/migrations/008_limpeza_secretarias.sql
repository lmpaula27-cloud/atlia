-- ============================================================
-- 008 — Limpeza das secretarias de demonstração
-- Redireciona indicadores e usuários das 8 secretarias fictícias
-- do seed para as secretarias reais da carga, e remove as antigas.
-- ============================================================

-- Função auxiliar local: id da secretaria nova pelo nome
-- (uso inline via subselect para manter o script simples)

-- 1. Redireciona INDICADORES
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Infraestrutura' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000001';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Saúde' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000002';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Educação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000003';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejamento Urbano' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000004';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento Econômico e Inovação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000005';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gestão Ambiental' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000006';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Administração' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000007';
update indicadores set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Finanças' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000008';

-- 2. Redireciona USUÁRIOS (gestores vinculados a secretaria antiga)
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Infraestrutura' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000001';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Saúde' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000002';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Educação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000003';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejamento Urbano' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000004';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento Econômico e Inovação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000005';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gestão Ambiental' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000006';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Administração' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000007';
update usuarios set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Finanças' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000008';

-- 3. Redireciona eventuais PROJETOS remanescentes (segurança)
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Infraestrutura' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000001';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Saúde' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000002';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Educação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000003';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejamento Urbano' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000004';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento Econômico e Inovação' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000005';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gestão Ambiental' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000006';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Administração' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000007';
update projetos set secretaria_id = (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Finanças' limit 1)
  where secretaria_id = '00000000-0000-0000-0001-000000000008';

-- 4. Remove as secretarias de demonstração
delete from secretarias where id in (
  '00000000-0000-0000-0001-000000000001',
  '00000000-0000-0000-0001-000000000002',
  '00000000-0000-0000-0001-000000000003',
  '00000000-0000-0000-0001-000000000004',
  '00000000-0000-0000-0001-000000000005',
  '00000000-0000-0000-0001-000000000006',
  '00000000-0000-0000-0001-000000000007',
  '00000000-0000-0000-0001-000000000008'
);

-- 5. Aplica cores e siglas nas secretarias reais (visual dos gráficos)
update secretarias set cor = '#C00000', sigla = 'SMS'     where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Saúde';
update secretarias set cor = '#2E75B6', sigla = 'SME'     where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Educação';
update secretarias set cor = '#1F3864', sigla = 'SEINFRA' where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Infraestrutura';
update secretarias set cor = '#538135', sigla = 'SEGAM'   where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gestão Ambiental';
update secretarias set cor = '#843C0C', sigla = 'SEFIN'   where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Finanças';
update secretarias set cor = '#7030A0', sigla = 'SMA'     where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Administração';
update secretarias set cor = '#FFC000', sigla = 'SEDEI'   where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento Econômico e Inovação';
update secretarias set cor = '#70AD47', sigla = 'SEPLAN'  where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejamento Urbano';
update secretarias set cor = '#C55A11', sigla = 'SETTRAN' where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Settran';
update secretarias set cor = '#4472C4', sigla = 'SEDES'   where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento Social';

-- 6. Conferência: não deve sobrar nenhuma secretaria 'Secretaria ...'
select id, nome, sigla from secretarias
where municipio_id = '00000000-0000-0000-0000-000000000001'
order by nome;
