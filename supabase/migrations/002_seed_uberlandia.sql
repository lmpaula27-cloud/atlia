-- ============================================================
-- ATLIA — Seed de dados: Prefeitura de Uberlândia (demo)
-- Município ID: 00000000-0000-0000-0000-000000000001
-- ============================================================

-- ── SECRETARIAS ──────────────────────────────────────────────
insert into secretarias (id, municipio_id, nome, sigla, responsavel, cor) values
  ('00000000-0000-0000-0001-000000000001','00000000-0000-0000-0000-000000000001','Secretaria de Obras e Infraestrutura',    'SMOBI', 'João Silva',     '#1F3864'),
  ('00000000-0000-0000-0001-000000000002','00000000-0000-0000-0000-000000000001','Secretaria Municipal de Saúde',           'SMS',   'Maria Souza',    '#C00000'),
  ('00000000-0000-0000-0001-000000000003','00000000-0000-0000-0000-000000000001','Secretaria Municipal de Educação',        'SME',   'Carlos Lima',    '#2E75B6'),
  ('00000000-0000-0000-0001-000000000004','00000000-0000-0000-0000-000000000001','Secretaria de Urbanismo e Planejamento',  'SEURB', 'Ana Costa',      '#70AD47'),
  ('00000000-0000-0000-0001-000000000005','00000000-0000-0000-0000-000000000001','Secretaria do Trabalho e Renda',          'SETRE', 'Pedro Rocha',    '#FFC000'),
  ('00000000-0000-0000-0001-000000000006','00000000-0000-0000-0000-000000000001','Secretaria de Meio Ambiente',             'SMAM',  'Lúcia Faria',    '#538135'),
  ('00000000-0000-0000-0001-000000000007','00000000-0000-0000-0000-000000000001','Secretaria de Administração Digital',     'SAD',   'Rafael Nunes',   '#7030A0'),
  ('00000000-0000-0000-0001-000000000008','00000000-0000-0000-0000-000000000001','Secretaria de Finanças',                  'SF',    'Beatriz Alves',  '#843C0C');

-- ── EIXOS ESTRATÉGICOS ────────────────────────────────────────
insert into eixos (id, municipio_id, nome, cor, ordem) values
  ('00000000-0000-0000-0002-000000000001','00000000-0000-0000-0000-000000000001','Uberlândia Sustentável', '#1F3864', 1),
  ('00000000-0000-0000-0002-000000000002','00000000-0000-0000-0000-000000000001','Vida em Uberlândia',     '#2E75B6', 2),
  ('00000000-0000-0000-0002-000000000003','00000000-0000-0000-0000-000000000001','Espaço Uberlândia',      '#C07B00', 3),
  ('00000000-0000-0000-0002-000000000004','00000000-0000-0000-0000-000000000001','Uberlândia Humana',      '#538135', 4);

-- ── OBJETIVOS ESTRATÉGICOS ────────────────────────────────────
insert into objetivos (id, municipio_id, eixo_id, nome, pct_atual) values
  ('00000000-0000-0000-0003-000000000001','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000001','Transformar a mobilidade urbana e a infraestrutura', 44),
  ('00000000-0000-0000-0003-000000000002','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000001','Tornar os espaços públicos modernos e atrativos',    38),
  ('00000000-0000-0000-0003-000000000003','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000002','Ampliar o acesso a serviços de saúde e educação',   56),
  ('00000000-0000-0000-0003-000000000004','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000002','Valorizar a cultura, o esporte e o lazer',          51),
  ('00000000-0000-0000-0003-000000000005','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000003','Explorar oportunidades de qualificação e trabalho', 55),
  ('00000000-0000-0000-0003-000000000006','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000003','Fomentar o desenvolvimento econômico sustentável',  42),
  ('00000000-0000-0000-0003-000000000007','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000004','Garantir segurança e convivência cidadã',           38),
  ('00000000-0000-0000-0003-000000000008','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0002-000000000004','Fortalecer a gestão pública e a transparência',     61);

-- ── PROJETOS ─────────────────────────────────────────────────
insert into projetos (id, municipio_id, secretaria_id, objetivo_id, nome, descricao, status, prioridade, tipo_ganho, pct, orcamento, executado, data_inicio, data_fim, tags) values
  (
    '00000000-0000-0000-0004-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0001-000000000001',
    '00000000-0000-0000-0003-000000000001',
    'Recapeamento Asfáltico — Zona Norte',
    'Recuperação e recapeamento da malha viária da Zona Norte, contemplando 42 km de vias em estado crítico de conservação. O projeto abrange os bairros Tibery, Planalto, Dom Almir e Joana Darc, com impacto direto em 85.000 habitantes.',
    'em_andamento', 'alta', 'Operacional', 68,
    2800000, 1900000, '2025-03-01', '2026-08-30',
    array['Mobilidade','Infraestrutura','Zona Norte','Obras']
  ),
  (
    '00000000-0000-0000-0004-000000000002',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0001-000000000002',
    '00000000-0000-0000-0003-000000000003',
    'UBS Jardim das Palmeiras',
    'Construção de nova Unidade Básica de Saúde no bairro Jardim das Palmeiras, com capacidade para 400 atendimentos diários. A unidade contará com consultórios médicos, odontológicos, sala de vacinas, farmácia básica e área de observação.',
    'atencao', 'alta', 'Operacional', 32,
    1500000, 480000, '2025-06-15', '2026-06-15',
    array['Saúde','UBS','Zona Sul','Construção']
  ),
  (
    '00000000-0000-0000-0004-000000000003',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0001-000000000003',
    '00000000-0000-0000-0003-000000000004',
    'Sistema de Monitoramento Escolar',
    'Implantação de sistema digital integrado de monitoramento de frequência, desempenho e alertas em todas as 87 escolas da rede municipal. Inclui painéis de gestão para diretores, secretários e Secretaria de Educação.',
    'em_andamento', 'media', 'Econômico', 81,
    420000, 340000, '2025-01-02', '2026-12-15',
    array['Educação','Tecnologia','Digital','Gestão Escolar']
  ),
  (
    '00000000-0000-0000-0004-000000000004',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0001-000000000004',
    '00000000-0000-0000-0003-000000000002',
    'Revitalização da Praça Central',
    'Reforma completa da Praça Tubal Vilela (Centro), incluindo nova pavimentação, paisagismo, iluminação LED, coreto, playground inclusivo, área fitness e wi-fi público.',
    'atrasado', 'alta', 'N/A', 15,
    680000, 102000, '2025-09-01', '2026-04-01',
    array['Urbanismo','Praça','Centro','Lazer']
  ),
  (
    '00000000-0000-0000-0004-000000000005',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0001-000000000005',
    '00000000-0000-0000-0003-000000000005',
    'Programa Emprego e Renda 2026',
    'Programa integrado de qualificação profissional e geração de emprego, com oferta de 3.200 vagas em cursos técnicos, feiras de emprego mensais, conexão com empresas parceiras e apoio ao microempreendedorismo.',
    'em_andamento', 'media', 'Econômico', 55,
    350000, 192500, '2026-01-15', '2026-12-31',
    array['Trabalho','Emprego','Qualificação','Renda']
  );

-- ── MARCOS ───────────────────────────────────────────────────
insert into marcos (id, projeto_id, titulo, descricao, data_prevista, data_conclusao, status, pct, ordem) values
  -- Projeto 1: Recapeamento
  ('00000000-0000-0000-0005-000000000101','00000000-0000-0000-0004-000000000001','Levantamento e projeto executivo','Mapeamento de todas as vias e elaboração do projeto técnico','2025-02-28','2025-02-20','concluido',100,1),
  ('00000000-0000-0000-0005-000000000102','00000000-0000-0000-0004-000000000001','Licitação e contratação de empresa','Processo licitatório e assinatura de contrato com empresa executora','2025-04-30','2025-04-15','concluido',100,2),
  ('00000000-0000-0000-0005-000000000103','00000000-0000-0000-0004-000000000001','Execução — Fase 1 (Tibery e Planalto)','Recapeamento de 18 km nos bairros Tibery e Planalto','2025-08-31','2025-09-10','concluido',100,3),
  ('00000000-0000-0000-0005-000000000104','00000000-0000-0000-0004-000000000001','Execução — Fase 2 (Dom Almir e Joana D.)','Recapeamento de 24 km nos bairros Dom Almir e Joana Darc','2026-02-28',null,'em_andamento',55,4),
  ('00000000-0000-0000-0005-000000000105','00000000-0000-0000-0004-000000000001','Sinalização horizontal e vertical','Pintura de faixas, instalação de placas e demarcações de segurança','2026-06-30',null,'pendente',0,5),
  ('00000000-0000-0000-0005-000000000106','00000000-0000-0000-0004-000000000001','Vistoria final e entrega','Inspeção técnica, relatório final e cerimônia de entrega à comunidade','2026-08-30',null,'pendente',0,6),
  -- Projeto 2: UBS
  ('00000000-0000-0000-0005-000000000201','00000000-0000-0000-0004-000000000002','Projeto arquitetônico aprovado','Aprovação do projeto pela Vigilância Sanitária e CREA','2025-07-30','2025-07-25','concluido',100,1),
  ('00000000-0000-0000-0005-000000000202','00000000-0000-0000-0004-000000000002','Terraplanagem e fundação','Preparação do terreno, demolição de estrutura existente e fundação','2025-09-30','2025-10-15','concluido',100,2),
  ('00000000-0000-0000-0005-000000000203','00000000-0000-0000-0004-000000000002','Estrutura e alvenaria','Levantamento da estrutura de concreto e alvenaria','2026-01-31',null,'atrasado',45,3),
  ('00000000-0000-0000-0005-000000000204','00000000-0000-0000-0004-000000000002','Instalações e acabamento','Instalações elétricas, hidráulicas e revestimentos','2026-04-30',null,'pendente',0,4),
  ('00000000-0000-0000-0005-000000000205','00000000-0000-0000-0004-000000000002','Equipamentos e mobiliário','Compra e instalação de equipamentos médicos e mobiliário','2026-05-31',null,'pendente',0,5),
  ('00000000-0000-0000-0005-000000000206','00000000-0000-0000-0004-000000000002','Vistoria e inauguração','Vistoria sanitária, habilitação e inauguração da UBS','2026-06-15',null,'pendente',0,6),
  -- Projeto 3: Sistema Escolar
  ('00000000-0000-0000-0005-000000000301','00000000-0000-0000-0004-000000000003','Definição de requisitos e RFP','Levantamento de necessidades e publicação de RFP para contratação','2025-01-31','2025-01-28','concluido',100,1),
  ('00000000-0000-0000-0005-000000000302','00000000-0000-0000-0004-000000000003','Contratação e kickoff','Seleção de fornecedor e reunião de início do projeto','2025-02-28','2025-03-05','concluido',100,2),
  ('00000000-0000-0000-0005-000000000303','00000000-0000-0000-0004-000000000003','Desenvolvimento do sistema','Desenvolvimento das funcionalidades principais pela equipe de TI','2025-07-31','2025-07-20','concluido',100,3),
  ('00000000-0000-0000-0005-000000000304','00000000-0000-0000-0004-000000000003','Piloto em 10 escolas','Implantação e validação em 10 escolas selecionadas','2025-09-30','2025-09-28','concluido',100,4),
  ('00000000-0000-0000-0005-000000000305','00000000-0000-0000-0004-000000000003','Rollout em todas as 87 escolas','Implantação completa e treinamento de gestores e professores','2026-08-31',null,'em_andamento',65,5),
  ('00000000-0000-0000-0005-000000000306','00000000-0000-0000-0004-000000000003','Relatório de impacto e encerramento','Avaliação de resultados e documentação do projeto','2026-12-15',null,'pendente',0,6),
  -- Projeto 4: Praça Central
  ('00000000-0000-0000-0005-000000000401','00000000-0000-0000-0004-000000000004','Projeto paisagístico e aprovação','Elaboração e aprovação do projeto pela Câmara de Vereadores','2025-10-31','2025-10-28','concluido',100,1),
  ('00000000-0000-0000-0005-000000000402','00000000-0000-0000-0004-000000000004','Demolição e preparação do terreno','Retirada de estruturas antigas e nivelamento','2025-11-30','2025-12-20','concluido',100,2),
  ('00000000-0000-0000-0005-000000000403','00000000-0000-0000-0004-000000000004','Pavimentação e drenagem','Execução de novo piso, sarjetas e sistema de drenagem pluvial','2026-01-31',null,'atrasado',20,3),
  ('00000000-0000-0000-0005-000000000404','00000000-0000-0000-0004-000000000004','Paisagismo e mobiliário urbano','Plantio de mudas, gramado, bancos e lixeiras','2026-03-15',null,'pendente',0,4),
  ('00000000-0000-0000-0005-000000000405','00000000-0000-0000-0004-000000000004','Iluminação, playground e wi-fi','Instalação de luminárias LED, playground inclusivo e rede wi-fi','2026-03-31',null,'pendente',0,5),
  ('00000000-0000-0000-0005-000000000406','00000000-0000-0000-0004-000000000004','Inauguração','Evento de entrega para a comunidade','2026-04-01',null,'pendente',0,6),
  -- Projeto 5: Emprego e Renda
  ('00000000-0000-0000-0005-000000000501','00000000-0000-0000-0004-000000000005','Mapeamento de demandas do mercado','Pesquisa com 200 empresas sobre vagas e perfil profissional','2026-01-31','2026-01-28','concluido',100,1),
  ('00000000-0000-0000-0005-000000000502','00000000-0000-0000-0004-000000000005','Parceria com instituições de ensino','Termos de cooperação com SENAI, SENAC e UFU','2026-02-28','2026-02-25','concluido',100,2),
  ('00000000-0000-0000-0005-000000000503','00000000-0000-0000-0004-000000000005','1ª rodada de cursos (jan–abr)','800 vagas em 12 cursos técnicos + 2 feiras de emprego','2026-04-30','2026-04-28','concluido',100,3),
  ('00000000-0000-0000-0005-000000000504','00000000-0000-0000-0004-000000000005','2ª rodada de cursos (mai–ago)','1.200 vagas em 18 cursos + programa de microempreendedorismo','2026-08-31',null,'em_andamento',45,4),
  ('00000000-0000-0000-0005-000000000505','00000000-0000-0000-0004-000000000005','3ª rodada e encerramento (set–dez)','1.200 vagas e relatório de impacto final','2026-12-31',null,'pendente',0,5);

-- ── HISTÓRICO DE PROJETOS ─────────────────────────────────────
insert into historico_projetos (projeto_id, usuario_id, tipo, descricao, created_at) values
  ('00000000-0000-0000-0004-000000000001',null,'marco',    'Projeto executivo aprovado pelo Conselho Municipal de Obras',      '2025-02-20 10:00:00'),
  ('00000000-0000-0000-0004-000000000001',null,'contrato', 'Contrato assinado com Construtora Vias Ltda. — R$ 2.800.000',       '2025-04-15 14:00:00'),
  ('00000000-0000-0000-0004-000000000001',null,'marco',    'Fase 1 concluída: 18 km recapeados',                                '2025-09-10 16:00:00'),
  ('00000000-0000-0000-0004-000000000001',null,'status',   'Status atualizado para Em andamento',                               '2026-01-15 09:00:00'),
  ('00000000-0000-0000-0004-000000000002',null,'status',   'Ordem de serviço emitida — projeto iniciado',                       '2025-06-15 08:00:00'),
  ('00000000-0000-0000-0004-000000000002',null,'marco',    'Alvará de construção emitido pela Vigilância Sanitária',            '2025-07-25 11:00:00'),
  ('00000000-0000-0000-0004-000000000002',null,'alerta',   'Marco 2.3 com 15 dias de atraso — chuvas intensas',                 '2025-10-20 09:00:00'),
  ('00000000-0000-0000-0004-000000000002',null,'status',   'Status alterado para Atenção — ritmo de obra abaixo do previsto',   '2026-01-10 10:00:00'),
  ('00000000-0000-0000-0004-000000000003',null,'status',   'Projeto iniciado',                                                  '2025-01-02 08:00:00'),
  ('00000000-0000-0000-0004-000000000003',null,'contrato', 'Contrato assinado com TechEdu Ltda. — R$ 420.000',                  '2025-03-05 14:00:00'),
  ('00000000-0000-0000-0004-000000000003',null,'marco',    'Piloto concluído com 98% de aprovação pelos diretores',             '2025-09-28 17:00:00'),
  ('00000000-0000-0000-0004-000000000003',null,'status',   'Rollout iniciado — treinamento de 340 gestores',                    '2026-01-15 09:00:00'),
  ('00000000-0000-0000-0004-000000000004',null,'status',   'Projeto iniciado',                                                  '2025-09-01 08:00:00'),
  ('00000000-0000-0000-0004-000000000004',null,'contrato', 'Empresa contratada: UrbanVerde Obras',                              '2025-11-10 10:00:00'),
  ('00000000-0000-0000-0004-000000000004',null,'alerta',   'Marco 4.3 está 5 dias atrasado',                                   '2026-01-05 08:00:00'),
  ('00000000-0000-0000-0004-000000000004',null,'status',   'Status alterado para Atrasado — problemas com fornecedor',          '2026-01-20 11:00:00'),
  ('00000000-0000-0000-0004-000000000005',null,'status',   'Programa iniciado',                                                 '2026-01-15 08:00:00'),
  ('00000000-0000-0000-0004-000000000005',null,'marco',    '1ª rodada concluída: 783 pessoas empregadas até junho',             '2026-04-28 17:00:00'),
  ('00000000-0000-0000-0004-000000000005',null,'relatorio','Relatório trimestral gerado automaticamente',                       '2026-05-01 08:00:00');

-- ── INDICADORES ──────────────────────────────────────────────
insert into indicadores (id, municipio_id, secretaria_id, nome, unidade, meta, valor_atual, menor_melhor, ano_referencia) values
  ('00000000-0000-0000-0006-000000000001','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000002','Taxa de cobertura vacinação infantil',          '%',    95,    88,    false, 2026),
  ('00000000-0000-0000-0006-000000000002','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000003','Índice de alfabetização — 3º ano EF',           '%',    90,    94,    false, 2026),
  ('00000000-0000-0000-0006-000000000003','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000001','Km de vias pavimentadas (acumulado)',            'km',  120,    87,    false, 2026),
  ('00000000-0000-0000-0006-000000000004','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000002','Tempo médio de espera em UBS',                  'min',  30,    48,    true,  2026),
  ('00000000-0000-0000-0006-000000000005','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000005','Empregos formais gerados',                      'empr',2000, 1420,    false, 2026),
  ('00000000-0000-0000-0006-000000000006','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000006','Cobertura de coleta seletiva por bairros',      '%',    80,    65,    false, 2026),
  ('00000000-0000-0000-0006-000000000007','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000007','Nota de satisfação serviços digitais (1–5)',    'pts',   4.5,   4.7,  false, 2026),
  ('00000000-0000-0000-0006-000000000008','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000008','Receita própria per capita',                    'R$', 1800, 1920,    false, 2026),
  ('00000000-0000-0000-0006-000000000009','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000003','Crianças matriculadas em tempo integral',       '%',    60,    54,    false, 2026),
  ('00000000-0000-0000-0006-000000000010','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000008','Índice de arrecadação de ISSQN',               '%',   100,    92,    false, 2026),
  ('00000000-0000-0000-0006-000000000011','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000002','Leitos de UTI por 10 mil hab.',                 'lts',   2.5,   1.8,  false, 2026),
  ('00000000-0000-0000-0006-000000000012','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0001-000000000001','Obras entregues no prazo',                      '%',    75,    62,    false, 2026);
