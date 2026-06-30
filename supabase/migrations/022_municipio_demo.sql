-- ============================================================
-- 022 — Município de Demonstração ("Cidade Exemplo")
-- Ambiente fictício e isolado para demos comerciais, separado
-- dos dados reais de Uberlândia. Usa um municipio_id próprio —
-- a RLS já garante isolamento total automaticamente.
-- ============================================================

-- UUID fixo e reconhecível, fácil de identificar/limpar depois
-- 00000000-0000-0000-0000-000000000099

-- ── 1. Município ─────────────────────────────────────────────
insert into municipios (id, nome, estado, populacao, plano, ativo, prefeito, site, email_contato, telefone, endereco, mandato_inicio, mandato_fim, missao, visao, valores)
values (
  '00000000-0000-0000-0000-000000000099',
  'Cidade Exemplo', 'MG', 150000, 'pro', true,
  'Prefeito(a) Fictício(a)', 'www.cidadeexemplo.mg.gov.br', 'contato@cidadeexemplo.mg.gov.br',
  '(34) 3000-0000', 'Praça Central, 100 — Centro',
  '2025-01-01', '2028-12-31',
  'Promover uma gestão pública eficiente, transparente e centrada no cidadão, com qualidade de vida e desenvolvimento sustentável para todos.',
  'Consolidar, até 2028, Cidade Exemplo como referência regional em gestão pública inteligente, infraestrutura de qualidade e bem-estar social.',
  array['Transparência', 'Eficiência', 'Inovação', 'Sustentabilidade', 'Compromisso com o cidadão']
)
on conflict (id) do update set nome = excluded.nome;

-- ── 2. Secretarias ───────────────────────────────────────────
insert into secretarias (municipio_id, nome, sigla, responsavel, cor, ativa) values
  ('00000000-0000-0000-0000-000000000099', 'Administração',           'SMA',     'Carlos Mendes',      '#1F3864', true),
  ('00000000-0000-0000-0000-000000000099', 'Saúde',                   'SMS',     'Ana Paula Ribeiro',  '#C00000', true),
  ('00000000-0000-0000-0000-000000000099', 'Educação',                'SME',     'Roberto Lima',       '#2E75B6', true),
  ('00000000-0000-0000-0000-000000000099', 'Infraestrutura e Obras',  'SEINFRA', 'Marcos Andrade',     '#C07B00', true),
  ('00000000-0000-0000-0000-000000000099', 'Meio Ambiente',           'SEMA',    'Juliana Costa',      '#538135', true);

-- ── 3. Eixos estratégicos ────────────────────────────────────
insert into eixos (municipio_id, nome, descricao, cor, ordem) values
  ('00000000-0000-0000-0000-000000000099', 'Cidade Eficiente',            'Modernização da gestão pública e da administração municipal.', '#1F3864', 1),
  ('00000000-0000-0000-0000-000000000099', 'Vida e Bem-Estar',            'Saúde, educação e qualidade de vida da população.',              '#2E75B6', 2),
  ('00000000-0000-0000-0000-000000000099', 'Infraestrutura e Mobilidade', 'Obras viárias, mobilidade urbana e transporte público.',         '#C07B00', 3),
  ('00000000-0000-0000-0000-000000000099', 'Desenvolvimento Sustentável', 'Saneamento básico e sustentabilidade ambiental.',                 '#538135', 4);

-- ── 4. Objetivos estratégicos (2 por eixo) ──────────────────
insert into objetivos (municipio_id, eixo_id, nome, descricao, pct_atual, peso)
  select '00000000-0000-0000-0000-000000000099', e.id, v.nome, v.descricao, v.pct, v.peso
  from (values
    ('Cidade Eficiente', 'Modernizar a gestão pública com digitalização de serviços', 'Ampliar o uso de tecnologia para simplificar o acesso a serviços municipais.', 50, 2),
    ('Cidade Eficiente', 'Aumentar a transparência e a eficiência na execução orçamentária', 'Fortalecer o controle e a publicidade dos gastos públicos.', 52, 1),
    ('Vida e Bem-Estar', 'Ampliar o acesso a serviços de saúde de qualidade', 'Reduzir filas e tempos de espera na rede municipal de saúde.', 47, 3),
    ('Vida e Bem-Estar', 'Melhorar os indicadores educacionais do município', 'Elevar a qualidade do ensino na rede municipal.', 57, 2),
    ('Infraestrutura e Mobilidade', 'Expandir e qualificar a infraestrutura viária', 'Pavimentação, recapeamento e manutenção de vias urbanas.', 37, 2),
    ('Infraestrutura e Mobilidade', 'Melhorar a mobilidade urbana e o transporte público', 'Modernizar a frota e ampliar a malha cicloviária.', 17, 1),
    ('Desenvolvimento Sustentável', 'Ampliar a cobertura de saneamento básico', 'Esgotamento sanitário e abastecimento de água tratada.', 52, 2),
    ('Desenvolvimento Sustentável', 'Fortalecer a sustentabilidade ambiental do município', 'Áreas verdes, coleta seletiva e gestão de resíduos.', 45, 1)
  ) as v(eixo_nome, nome, descricao, pct, peso)
  join eixos e on e.municipio_id = '00000000-0000-0000-0000-000000000099' and e.nome = v.eixo_nome;

-- ── 5. Metas estratégicas (2 por objetivo) ──────────────────
insert into metas (municipio_id, objetivo_id, nome, descricao, pct_atual, peso)
  select '00000000-0000-0000-0000-000000000099', o.id, v.nome, v.descricao, v.pct, v.peso
  from (values
    ('Modernizar a gestão pública com digitalização de serviços', 'Digitalizar 80% dos serviços públicos municipais até 2027', 'Migração de processos presenciais para canais digitais.', 45, 2),
    ('Modernizar a gestão pública com digitalização de serviços', 'Implantar sistema integrado de gestão de processos administrativos', 'Unificação de sistemas internos da prefeitura.', 60, 1),
    ('Aumentar a transparência e a eficiência na execução orçamentária', 'Reduzir em 20% o tempo médio de execução orçamentária', 'Agilizar empenho, liquidação e pagamento de despesas.', 30, 1),
    ('Aumentar a transparência e a eficiência na execução orçamentária', 'Publicar painel de transparência com atualização mensal', 'Portal público com dados financeiros atualizados.', 75, 1),
    ('Ampliar o acesso a serviços de saúde de qualidade', 'Reduzir o tempo médio de espera em UBS para até 30 minutos', 'Reorganização de fluxos de atendimento na rede básica.', 40, 2),
    ('Ampliar o acesso a serviços de saúde de qualidade', 'Ampliar em 25% a cobertura de atenção primária à saúde', 'Expansão de equipes e unidades de saúde da família.', 55, 2),
    ('Melhorar os indicadores educacionais do município', 'Elevar o IDEB médio da rede municipal', 'Programas de reforço e formação continuada de professores.', 35, 2),
    ('Melhorar os indicadores educacionais do município', 'Garantir 100% das crianças de 4-5 anos matriculadas em pré-escola', 'Expansão de vagas na educação infantil.', 80, 1),
    ('Expandir e qualificar a infraestrutura viária', 'Pavimentar 50km de vias urbanas até 2028', 'Programa de pavimentação asfáltica em bairros periféricos.', 25, 2),
    ('Expandir e qualificar a infraestrutura viária', 'Recuperar 100% das pontes e viadutos em estado crítico', 'Reforma estrutural de pontes identificadas em laudo técnico.', 50, 1),
    ('Melhorar a mobilidade urbana e o transporte público', 'Implantar 15km de ciclovias na malha urbana', 'Nova infraestrutura cicloviária integrada ao transporte público.', 20, 1),
    ('Melhorar a mobilidade urbana e o transporte público', 'Renovar 100% da frota de transporte público coletivo', 'Substituição de veículos por modelos acessíveis e mais eficientes.', 15, 1),
    ('Ampliar a cobertura de saneamento básico', 'Ampliar a cobertura de coleta de esgoto para 90% dos domicílios', 'Expansão da rede coletora de esgoto sanitário.', 65, 2),
    ('Ampliar a cobertura de saneamento básico', 'Reduzir o índice de perdas na distribuição de água', 'Modernização da rede de abastecimento e telemetria.', 40, 1),
    ('Fortalecer a sustentabilidade ambiental do município', 'Aumentar em 30% a área de cobertura vegetal urbana', 'Plantio e requalificação de áreas verdes e praças.', 35, 1),
    ('Fortalecer a sustentabilidade ambiental do município', 'Implantar programa municipal de coleta seletiva em 100% dos bairros', 'Expansão progressiva da coleta seletiva porta a porta.', 55, 1)
  ) as v(objetivo_nome, nome, descricao, pct, peso)
  join objetivos o on o.municipio_id = '00000000-0000-0000-0000-000000000099' and o.nome = v.objetivo_nome;

-- ── 6. Projetos (2 por meta, vinculados à meta e à secretaria correspondente) ──
insert into projetos (municipio_id, secretaria_id, objetivo_id, meta_id, nome, descricao, status, prioridade, tipo_ganho, pct, peso, data_inicio, data_fim, orcamento, executado, fonte_recurso, tags, bairro)
  select
    '00000000-0000-0000-0000-000000000099',
    (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000099' and nome = v.secretaria),
    m.objetivo_id,
    m.id,
    v.nome, v.descricao, v.status::status_projeto, v.prioridade::prioridade_tipo, v.tipo_ganho::tipo_ganho, v.pct, v.peso,
    v.data_inicio::date, v.data_fim::date, v.orcamento, v.executado, v.fonte, v.tags, v.bairro
  from (values
    ('Digitalizar 80% dos serviços públicos municipais até 2027', 'Administração', 'Implantar protocolo digital para requerimentos administrativos', 'Reduzir o tempo de abertura e tramitação de processos junto à prefeitura.', 'em_andamento', 'alta', 'Operacional', 55, 2, '2025-02-01', '2026-12-15', 850000, 420000, 'Recurso próprio', array['Digitalização','Administração'], 'Centro'),
    ('Digitalizar 80% dos serviços públicos municipais até 2027', 'Administração', 'Disponibilizar emissão de certidões 100% online', 'Eliminar a necessidade de atendimento presencial para certidões simples.', 'nao_iniciado', 'media', 'Operacional', 0, 1, '2026-03-01', '2027-06-30', 320000, 0, null, array['Digitalização'], 'Centro'),
    ('Implantar sistema integrado de gestão de processos administrativos', 'Administração', 'Unificar sistemas de protocolo, compras e patrimônio', 'Integração das bases de dados internas da administração.', 'em_andamento', 'alta', 'Financeiro', 60, 2, '2025-01-15', '2026-08-30', 1200000, 760000, 'PMAT', array['Gestão Interna'], 'Centro'),
    ('Implantar sistema integrado de gestão de processos administrativos', 'Administração', 'Capacitar servidores no novo sistema integrado', 'Treinamento contínuo das equipes para uso pleno do sistema.', 'concluido', 'media', 'N/A', 100, 1, '2025-01-15', '2025-09-30', 95000, 95000, null, array['Capacitação'], 'Centro'),

    ('Reduzir em 20% o tempo médio de execução orçamentária', 'Administração', 'Reestruturar fluxo de empenho e liquidação de despesas', 'Mapeamento e simplificação das etapas do processo de pagamento.', 'atencao', 'alta', 'Operacional', 35, 1, '2025-04-01', '2026-12-31', 180000, 70000, null, array['Orçamento'], 'Centro'),
    ('Reduzir em 20% o tempo médio de execução orçamentária', 'Administração', 'Implantar dashboard de acompanhamento orçamentário', 'Painel interno para gestores acompanharem execução em tempo real.', 'nao_iniciado', 'media', 'N/A', 0, 1, '2026-06-01', '2027-03-31', 150000, 0, null, array['Orçamento'], 'Centro'),
    ('Publicar painel de transparência com atualização mensal', 'Administração', 'Lançar Portal da Transparência 2.0', 'Nova versão do portal com dados abertos e atualização automática.', 'concluido', 'alta', 'Operacional', 100, 1, '2025-01-01', '2025-07-31', 210000, 205000, 'Recurso próprio', array['Transparência'], 'Centro'),
    ('Publicar painel de transparência com atualização mensal', 'Administração', 'Capacitar equipe de comunicação para atualização do portal', 'Rotina mensal de checagem e publicação de dados.', 'em_andamento', 'baixa', 'N/A', 70, 1, '2025-08-01', '2026-12-31', 40000, 28000, null, array['Transparência'], 'Centro'),

    ('Reduzir o tempo médio de espera em UBS para até 30 minutos', 'Saúde', 'Reorganizar agendamento eletrônico nas UBS', 'Implantação de marcação de consultas por aplicativo e totem.', 'em_andamento', 'alta', 'Operacional', 45, 2, '2025-03-01', '2026-12-31', 420000, 190000, 'Recurso próprio', array['Saúde','Atendimento'], 'Jardim das Flores'),
    ('Reduzir o tempo médio de espera em UBS para até 30 minutos', 'Saúde', 'Ampliar equipe de triagem nas unidades de maior demanda', 'Contratação e remanejamento de profissionais de enfermagem.', 'atrasado', 'alta', 'N/A', 20, 2, '2025-01-01', '2025-12-31', 680000, 340000, null, array['Saúde'], 'Vila Nova'),
    ('Ampliar em 25% a cobertura de atenção primária à saúde', 'Saúde', 'Construir nova UBS no bairro Vila Nova', 'Nova unidade básica de saúde para reduzir sobrecarga das vizinhas.', 'em_andamento', 'alta', 'N/A', 50, 2, '2025-02-01', '2027-02-28', 2400000, 1100000, 'Convênio Estadual', array['Saúde','Obras'], 'Vila Nova'),
    ('Ampliar em 25% a cobertura de atenção primária à saúde', 'Saúde', 'Implantar equipes de Saúde da Família em novos territórios', 'Expansão da Estratégia Saúde da Família para áreas descobertas.', 'concluido', 'alta', 'N/A', 100, 2, '2025-01-01', '2025-10-31', 560000, 555000, null, array['Saúde'], 'Jardim das Flores'),

    ('Elevar o IDEB médio da rede municipal', 'Educação', 'Programa de reforço escolar em língua portuguesa e matemática', 'Aulas de apoio extracurricular para estudantes com defasagem.', 'em_andamento', 'alta', 'N/A', 40, 2, '2025-02-01', '2026-12-15', 380000, 160000, null, array['Educação'], 'Centro'),
    ('Elevar o IDEB médio da rede municipal', 'Educação', 'Formação continuada de professores da rede municipal', 'Capacitação pedagógica anual para todo o corpo docente.', 'em_andamento', 'media', 'N/A', 30, 1, '2025-03-01', '2027-12-31', 220000, 65000, 'Recurso próprio', array['Educação','Capacitação'], 'Centro'),
    ('Garantir 100% das crianças de 4-5 anos matriculadas em pré-escola', 'Educação', 'Construir duas novas creches municipais', 'Ampliação de vagas na educação infantil em bairros prioritários.', 'em_andamento', 'alta', 'N/A', 65, 2, '2025-01-15', '2027-06-30', 3200000, 2080000, 'FUNDEB', array['Educação','Obras'], 'Vila Nova'),
    ('Garantir 100% das crianças de 4-5 anos matriculadas em pré-escola', 'Educação', 'Ampliar transporte escolar para áreas rurais', 'Renovação e ampliação da frota de transporte escolar.', 'concluido', 'media', 'N/A', 100, 1, '2025-01-01', '2025-08-31', 480000, 475000, null, array['Educação'], 'Zona Rural'),

    ('Pavimentar 50km de vias urbanas até 2028', 'Infraestrutura e Obras', 'Pavimentação asfáltica no bairro Jardim das Flores', 'Recapeamento e pavimentação de ruas sem asfalto.', 'em_andamento', 'alta', 'N/A', 35, 2, '2025-04-01', '2027-03-31', 2800000, 980000, 'Convênio Federal', array['Infraestrutura','Pavimentação'], 'Jardim das Flores'),
    ('Pavimentar 50km de vias urbanas até 2028', 'Infraestrutura e Obras', 'Recapeamento de vias do centro histórico', 'Manutenção asfáltica das principais vias comerciais.', 'nao_iniciado', 'media', 'N/A', 0, 1, '2026-05-01', '2027-12-31', 1100000, 0, null, array['Infraestrutura'], 'Centro'),
    ('Recuperar 100% das pontes e viadutos em estado crítico', 'Infraestrutura e Obras', 'Reforma estrutural da Ponte do Rio Verde', 'Recuperação estrutural identificada em laudo de engenharia.', 'atrasado', 'alta', 'N/A', 30, 2, '2025-01-01', '2025-12-31', 1900000, 650000, 'Convênio Estadual', array['Infraestrutura','Obras'], 'Zona Rural'),
    ('Recuperar 100% das pontes e viadutos em estado crítico', 'Infraestrutura e Obras', 'Inspeção técnica de pontes e viadutos do município', 'Diagnóstico estrutural completo da malha viária.', 'concluido', 'media', 'N/A', 100, 1, '2025-01-01', '2025-05-31', 120000, 118000, null, array['Infraestrutura'], 'Centro'),

    ('Implantar 15km de ciclovias na malha urbana', 'Infraestrutura e Obras', 'Construção de ciclovia na Avenida Principal', 'Nova infraestrutura cicloviária ligando bairros ao centro.', 'nao_iniciado', 'media', 'N/A', 0, 1, '2026-08-01', '2027-12-31', 1450000, 0, null, array['Mobilidade'], 'Centro'),
    ('Implantar 15km de ciclovias na malha urbana', 'Infraestrutura e Obras', 'Sinalização e integração de ciclofaixas existentes', 'Melhoria de sinalização viária para ciclistas.', 'em_andamento', 'baixa', 'N/A', 40, 1, '2025-06-01', '2026-12-31', 180000, 70000, null, array['Mobilidade'], 'Centro'),
    ('Renovar 100% da frota de transporte público coletivo', 'Infraestrutura e Obras', 'Aquisição de ônibus acessíveis para o transporte coletivo', 'Substituição gradual da frota por veículos com acessibilidade.', 'nao_iniciado', 'alta', 'Financeiro', 10, 2, '2026-01-01', '2028-06-30', 4500000, 0, 'Financiamento BNDES', array['Mobilidade'], 'Centro'),
    ('Renovar 100% da frota de transporte público coletivo', 'Infraestrutura e Obras', 'Estudo de viabilidade para nova concessão de transporte', 'Diagnóstico técnico e jurídico para nova licitação de transporte.', 'em_andamento', 'media', 'N/A', 25, 1, '2025-09-01', '2026-06-30', 90000, 30000, null, array['Mobilidade'], 'Centro'),

    ('Ampliar a cobertura de coleta de esgoto para 90% dos domicílios', 'Infraestrutura e Obras', 'Expansão da rede coletora de esgoto na Vila Nova', 'Implantação de coletor tronco e ligações domiciliares.', 'em_andamento', 'alta', 'N/A', 55, 2, '2025-02-01', '2027-02-28', 3600000, 1900000, 'Convênio Federal', array['Saneamento','Obras'], 'Vila Nova'),
    ('Ampliar a cobertura de coleta de esgoto para 90% dos domicílios', 'Infraestrutura e Obras', 'Construção de estação de tratamento de esgoto', 'Nova ETE para atender o crescimento populacional da região.', 'em_andamento', 'alta', 'N/A', 40, 2, '2025-03-01', '2027-09-30', 8500000, 2900000, 'Convênio Estadual', array['Saneamento'], 'Zona Rural'),
    ('Reduzir o índice de perdas na distribuição de água', 'Infraestrutura e Obras', 'Implantar telemetria na rede de abastecimento', 'Monitoramento remoto de pressão e vazão da rede de água.', 'em_andamento', 'media', 'Financeiro', 50, 1, '2025-04-01', '2026-10-31', 1200000, 580000, null, array['Saneamento'], 'Centro'),
    ('Reduzir o índice de perdas na distribuição de água', 'Infraestrutura e Obras', 'Programa de troca de hidrômetros antigos', 'Substituição de hidrômetros com mais de 10 anos de uso.', 'concluido', 'media', 'Financeiro', 100, 1, '2025-01-01', '2025-11-30', 540000, 538000, null, array['Saneamento'], 'Jardim das Flores'),

    ('Aumentar em 30% a área de cobertura vegetal urbana', 'Meio Ambiente', 'Plantio de mudas em praças e canteiros centrais', 'Programa de arborização urbana com espécies nativas.', 'em_andamento', 'media', 'N/A', 45, 1, '2025-03-01', '2026-12-31', 220000, 95000, null, array['Meio Ambiente'], 'Centro'),
    ('Aumentar em 30% a área de cobertura vegetal urbana', 'Meio Ambiente', 'Requalificação do Parque Municipal', 'Revitalização paisagística e infraestrutura do parque central.', 'nao_iniciado', 'baixa', 'N/A', 0, 1, '2026-09-01', '2027-12-31', 650000, 0, null, array['Meio Ambiente'], 'Centro'),
    ('Implantar programa municipal de coleta seletiva em 100% dos bairros', 'Meio Ambiente', 'Expansão da coleta seletiva para bairros periféricos', 'Ampliação progressiva das rotas de coleta seletiva porta a porta.', 'em_andamento', 'media', 'Operacional', 60, 1, '2025-02-01', '2026-12-31', 480000, 270000, 'Recurso próprio', array['Meio Ambiente','Resíduos'], 'Vila Nova'),
    ('Implantar programa municipal de coleta seletiva em 100% dos bairros', 'Meio Ambiente', 'Campanha de educação ambiental nas escolas', 'Ações educativas sobre separação e destinação de resíduos.', 'concluido', 'baixa', 'N/A', 100, 1, '2025-01-01', '2025-06-30', 60000, 59000, null, array['Meio Ambiente','Educação'], 'Centro')
  ) as v(meta_nome, secretaria, nome, descricao, status, prioridade, tipo_ganho, pct, peso, data_inicio, data_fim, orcamento, executado, fonte, tags, bairro)
  join metas m on m.municipio_id = '00000000-0000-0000-0000-000000000099' and m.nome = v.meta_nome;

-- ── 7. Indicadores de desempenho ─────────────────────────────
insert into indicadores (municipio_id, secretaria_id, nome, unidade, meta, valor_atual, menor_melhor, ano_referencia)
  select '00000000-0000-0000-0000-000000000099',
    (select id from secretarias where municipio_id = '00000000-0000-0000-0000-000000000099' and nome = v.secretaria),
    v.nome, v.unidade, v.meta, v.valor_atual, v.menor_melhor, 2026
  from (values
    ('Saúde',                  'Tempo médio de espera em UBS',              'min', 30,   42,   true),
    ('Saúde',                  'Cobertura de Atenção Primária à Saúde',     '%',   80,   62,   false),
    ('Educação',               'IDEB médio da rede municipal',              'pts', 6.5,  5.4,  false),
    ('Educação',               'Crianças de 4-5 anos matriculadas',         '%',   100,  78,   false),
    ('Infraestrutura e Obras', 'Vias urbanas pavimentadas (acumulado)',     'km',  50,   18,   false),
    ('Infraestrutura e Obras', 'Índice de perdas na distribuição de água',  '%',   25,   34,   true),
    ('Meio Ambiente',          'Cobertura de coleta seletiva por bairros',  '%',   100,  48,   false),
    ('Administração',         'Processos administrativos digitalizados',   '%',   80,   46,   false)
  ) as v(secretaria, nome, unidade, meta, valor_atual, menor_melhor);

-- ── 8. Conferência ────────────────────────────────────────────
select 'secretarias' as tabela, count(*) from secretarias where municipio_id = '00000000-0000-0000-0000-000000000099'
union all select 'eixos',       count(*) from eixos       where municipio_id = '00000000-0000-0000-0000-000000000099'
union all select 'objetivos',   count(*) from objetivos   where municipio_id = '00000000-0000-0000-0000-000000000099'
union all select 'metas',       count(*) from metas       where municipio_id = '00000000-0000-0000-0000-000000000099'
union all select 'projetos',    count(*) from projetos    where municipio_id = '00000000-0000-0000-0000-000000000099'
union all select 'indicadores', count(*) from indicadores where municipio_id = '00000000-0000-0000-0000-000000000099';
