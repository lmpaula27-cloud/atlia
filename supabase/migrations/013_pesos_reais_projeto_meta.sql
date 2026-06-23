-- ============================================================
-- 013 — Pesos reais de Projeto e Meta (aba "Geral", colunas
--        "Peso (Projeto)" e "Peso (Metas)")
-- 303 metas com peso, 488 projetos com peso
-- ============================================================

-- 0. A planilha real tem projetos com peso 0 (sem relevância para a meta) —
--    relaxa a constraint para permitir
alter table projetos drop constraint if exists projetos_peso_check;
alter table projetos add constraint projetos_peso_check check (peso >= 0);

-- 1. Peso das METAS (relativo ao objetivo)
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar de forma sustentável a geração de receitas próprias por meio da estruturação e execução de projetos de PPPs, concessões e demais modelagens, visando ganho econômico ou financeiro de R$ 500 milhões de receita municipal até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Proposta de estruturação do núcleo de compras das autarquias indiretas da Prefeitura Municipal de Uberlândia'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantação da nova ETE (margem esquerda)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Utilizar o Plano Diretor de Drenagem para elaboração de 7 projetos estratégicos para os grandes problemas de drenagem (Morumbi, Córrego do Óleo, Córregos Liso/Lobo/Buritizinho, Córrego Lajeado e Córrego Campo Alegre).'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construção de dois novos centros de reservação nos bairros Ipanema e Alvorada.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construção e reformas de prédios públicos, atendendo as demandas ligadas ao saneamento, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Soluções para aumentar o desvio do que vai para o aterro - tratamento dos resíduos sólidos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar estrutura de governança e escritório de gerenciamento de projetos e processos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reabilitar a ETE Uberabinha'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Melhorar os indicadores de Extravasamento e Refluxo de Esgoto Redução média de 8% ao ano'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Entrega de 2 projetos de engenharia para contenção de grandes erosões.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantação do Programa de Redução de Perdas'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Expansão de telemetria nos hidrômetros 8.000 hidrômetros/ano'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Melhoria na gestão de custos operacionais (foco em redução) Redução em 5% do custo unitário operacional da produção e distribuição de água. Redução em 5% do custo unitário operacional da coleta/afastamento/tratamento de esgoto.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 50% o índice de reciclagem em Uberlândia até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Arrecadar ou economizar 400Mi até dez/2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Alcançar e manter, até 2026, eficácia mínima anual de 83% no atendimento das Ordens de Serviço da administração municipal, com metas progressivas por nível de complexidade, conforme o programa “Zelo por Uberlândia” do PPA 2026–2029.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar até dezembro de 2026 um sistema digital de gestão das Ordens de Serviço que permita controle em tempo real, relatórios automatizados e apoio à tomada de decisão.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Publicar e manter atualizado, até 31/12/2025, o Catálogo de Serviços Técnicos da EMAM (1ª Edição) como instrumento oficial de padronização, gestão de ordens de serviço e articulação interinstitucional, assegurando sua revisão anual.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a necessidade, até 2035.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Qualificação profissional e trabalho decente - Realização de 6 dias de campo na área de fruticultura'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 30% a quantidade de unidades demonstrativas'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar um ambiente para preservação de todas as plantas em extinção principalmente do cerrado brasileiro.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantação de uma agroindústria para fins didáticos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 30% a quantidade de alunos nas escolinhas'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar a frequência no parque e poliesportivos até 2027.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Treinamentos técnicos para os servidores da área administrativa da Futel'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar a quantidade em 20% de paratletas ao ano.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Melhorar o Nivel do Pro Gestao - Nivel 3'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Otimizar 100% do processo via implatação de software previdenciário'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar o crédito consignado para diminuir a taxa dos nossos segurados e aumentar a rentabilidade do IPREMU'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Revisão e Otimização dos processos em todas as áreas do IPREMU'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o atendimento presencial descentralizado por meio de duas ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar 03 (três) câmaras técnicas setoriais e 02 (duas) comissões temáticas até 31/12/2025.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar 02 (duas) ferramentas com o objetivo de monitoramento do mercado de consumo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar 10 (dez) ações (cursos, projetos, campanhas e atividades para disseminação da educação para o consumo) até 30/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir em 90% o consumo de papel.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Erradicar os espaços para armazenamento de arquivos 25 m².'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar nova legislação Procon e publicação da lei no diário oficial do municipio.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o número de fornecedores qualificados para receber o "Selo de Qualidade de Boas práticas" por meio de execução de 5 etapas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar e aperfeiçoar 80% os servidores públicos do Procon até 31/12/2027.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar e modernizar a fiscalização do PROCON por meio de três ações estratégicas'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir a taxa de processos referente a discriminação nas relações de consumo por meio de 3 ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar o grau de satisfação do servidor por meio de execução de 5 ações.(Realizar pesquisa de satisfação antes e depois do periodo definido)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar 260 pontos de wi-fi nos equipamentos públicos conforme planejado na primeira fase.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aculturar e Implantar a IA em 6 (Seis) Soluções.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar o DEC em todas as Secretarias e Orgãos de Autarquia'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar 5.000 (cinco Mil) Soluções de IoT'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar em Cibersegurança os alunos da rede municipal e menores atendidos em equipamentos da Sec. Desenvolvimento Social (NAICA).'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Continuidade de processos de aderência de LGPD em 100% dos Sistemas gerenciados pela Prodaub.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construção da Sede da Prodaub no Polo Tecnológico.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atualizar ambiente Tecnológico da PMU'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reestruturar a rede de fibra óptica (Projeto Olho Vivo)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Apoiar até 1.200 mulheres em programas de capacitação para geração de renda, até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir 20 bilhões de reais de novos investimentos privados no município em 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 20% a contribuição no PIB de o município de Uberlândia, do segmento de bares, restaurantes, hotéis e similares.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar 100 empresas de micro e pequeno porte em produtividade, qualidade, sustentabilidade e inovação'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar 2.000 atendimentos da Sala do Empreendedor até 2028 (média de 50 atendimentos por mês).'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Regulamentar o uso de Sandbox Regulatório em o município de Uberlândia por meio de decreto municipal, implementando uma cultura de experimentação regulatória e ao menos 2 projetos-piloto publicados.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar até 100 empresas na utilização de Inteligência Artificial para melhoria dos negócios, por segmento de atuação'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar o status de o município de Uberlândia como cidade global,atraindo 10 empresas internacionais e colocar em prática 10 acordos de cidades irmãs até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar o ambiente de negócio e capacitar pelo menos 3.000 micro e pequenas empresas em o município de Uberlândia em gestão, competitividade, melhoria de processos e inovação até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar os compradores da Prefeitura e os MEIs para uso da plataforma e cadastrar cerca de 200 MEIs até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir 5 bilhões de reais em atração de investimentos em 2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Polo tecnológico: Transformar o Polo Tecnológico em um ambiente dinâmico e completo para inovação e crescimento empresarial por meio de três iniciativas: entrega de escrituras para 14 empresas adquirentes dos lotes, instituição da governança do Comitê Gestor do Inova Uberlândia e criação da Associação de Proprietários do loteamento.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'AVANÇA UBERLÂNDIA: Ampliar ações de recapeamento e recuperação de malha viária à médio e longo prazo por meio de pelo menos 02 ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'AVANÇA UBERLÂNDIA: Melhorar as ações de manutenção asfáltica a curto e médio prazo, através de pelo menos 03 ações.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a disponibilidade, até 2035.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Elaboração de paineis indicadores e processos de melhoria contínua dentro da Secretaria de Infraestrutura, até 2026;'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construção e reformas de prédios públicos, atendendo as demandas das Secretarias envolvidas com saúde, educação e assistência social, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar 2 Conselhos Tutelares até 2028. (regulatório)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar os serviços de atendimento a pessoa idosa em 20% até 2032'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o número de unidades do CRAS em 15% até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar para 8.000 o número de jovens e adultos qualificadas e ou requalificadas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir o cumprimento das diretrizes da Politicia Nacional de Educação Permanente do SUAS'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Viabilizar a criação de Fab Labs (Laboratório de Fabricação) estimulando a inovação e aprendizado prático em um espaço colaborativo, em 02 unidades do Centros Profissionalizantes (UdiTech) e em 04 unidades dos Naica''''s até 2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Disponibilizar 1.000 vagas de emprego de alto valor agregado (acima de R$5.500,00), oferecidas pela Unidade SINE Uberlândia até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 10% o número de vagas para o Serviço de Acolhimento Institucional de crianças, adolescentes e jovens até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atualizar e/ou normatizar 10 legislações referentes aos serviços, programas, projetos e benefícios de assistência social ofertados pelo município, até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar um fluxo sistematizado para integração das secretarias de Saúde e de Desenvolvimento Social para informações e atendimento'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Redução em 50% do tempo do processo de aprovação de loteamentos de Habitação de Interesse Social'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar um painel de acompanhamento do processo de aprovação de loteamentos envolvendo todas as secretarias responsáveis pela aprovação.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumento de 30% em receita através da modernização do processo de parcelamento do solo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar Instituto de Planejamento Urbano - planejamento do crescimento e desenvolvimento e da cidade'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 30% a criação de novas empresas atráves da flexibilização da lei de uso e ocupação do solo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Redução de 15 dias no processo de aprovação de projeto arquitetônico'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar a disponibilidade em 15% de áreas de habitação de interesse social.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar comitê de Viabilidade de implatação de equipamentos públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementação de leis para regulamentar a restruturação do centro da cidade.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar as áreas de varrição e a frequência em áreas com alta circulação'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Contribuir para a limpeza urbana com o descarte ambientalmente correto com a operação de 15 Ecopontos até Dez/2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar estudo técnico de viabilidade para a implantação do sistema de iluminação pública subterrânea em, no mínimo, 6 pontos estratégicos localizados nos principais trevos e rodovias de acesso ao Município de Uberlândia. A iniciativa visa aumentar a segurança viária, valorizar os acessos urbanos e promover a modernização e a melhoria estética dos espaços públicos. O estudo deverá ser concluído até dezembro de 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar, revitalizar e manter a pintura de 80% dos meio-fios da cidade de Uberlândia, com foco na segurança viária, melhoria da mobilidade urbana e embelezamento da cidade'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar e viabilizar a varrição 100% mecanizada nos canteiros centrais e expandir em mais 20% a varrição manual nas vias públicas do Município de Uberlândia, aliada à realização de estudos e à implantação da capina mecanizada. A iniciativa tem como objetivo modernizar, ampliar e reduzir custos dos serviços de limpeza urbana, promovendo mais eficiência operacional, sustentabilidade, agilidade e melhoria na qualidade dos espaços públicos, além de garantir maior produtividade na manutenção das áreas urbanas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar estudos técnicos e viabilizar a implantação de aproximadamente 200 novos pontos de iluminação pública em locais previamente identificados e aprovados, contemplando ambos os lados das vias. A ação visa ampliar em 20% a cobertura da rede de iluminação pública no município, contribuindo para o aumento da segurança, a valorização dos espaços urbanos e a melhoria do conforto e da qualidade de vida da população, com execução no período de janeiro de 2026 a dezembro de 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e viabilizar, anualmente, a implantação do projeto de iluminação natalina no Município de Uberlândia, contemplando, no mínimo, 13 espaços públicos por ano — incluindo praças, avenidas, prédios públicos, rotatórias e pontos turísticos — totalizando no minimo 52 locais decorados no período de 2025 a 2028. A iniciativa tem como objetivo valorizar os espaços urbanos, fomentar o comércio local, fortalecer o espírito natalino e promover a ocupação segura e atrativa da cidade durante o período festivo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar e modernizar a infraestrutura de dois cemitérios municipais de Uberlândia, com foco na melhoria da capacidade de atendimento, conforto e qualidade dos serviços funerários prestados à população, incluindo a ampliação de 600 vagas de arrendamento no Cemitério Campo do Bom Pastor.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolver ações de capacitação e promover a humanização no atendimento para 70% dos servidores da SESURB, com o objetivo de aprimorar a qualidade dos serviços, elevar a satisfação dos usuários e fortalecer a eficiência, o comprometimento e a excelência no desempenho das atividades.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar a reforma de aproximadamente do imóvel localizado na Av. Rondon Pacheco, nº 5000, e promover a transferência integral da Secretaria Municipal de Serviços Urbanos (SESURB) para esse local, visando ampliar em 50% o espaço físico atualmente disponível, adequar as condições de atendimento ao público e integrar fisicamente todos os setores da secretaria. A ação tem como objetivo promover maior eficiência operacional, melhor organização dos processos internos e mais conforto para servidores e cidadãos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Concluir a reforma do Camelódromo Municipal da Av. Floriano Peixoto, abrangendo 100% da revitalização das instalações, e viabilizar, por meio da análise e aprovação do COMPHAC, a reforma do Ambulódromo da Praça Jaci de Assis, contemplando a recuperação de, no mínimo, 20% das áreas comuns. Essas ações visam melhorar as condições de infraestrutura, garantir um ambiente adequado e seguro para os comerciantes e frequentadores, e promover a valorização dos espaços públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir os impactos ambientais da mobilidade urbana, com 50% da frota de transporte público e credenciado composta por veículos de baixa emissão até 2035, contribuindo para a melhoria da qualidade do ar.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir acessibilidade em cruzamentos semaforizados, com implantação progressiva de botoeiras sonoras e acessíveis em 100% dos semáfaros até 2030, promovendo inclusão de pessoas com deficiência.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso e a eficiência do transporte público com a implantação da integração modal e temporal em 100% do sistema até 2035'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Modernizar 100% da rede semafórica com tecnologia digital e inteligência artificial até 2030'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar a percepção de segurança para 60% e confiabilidade para 70% do transporte coletivo entre os usuários. (Fonte: pesquisa de satisfação anual com usuários)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir integridade do programa Tarifa Zero Estudantil com índice de fraude inferior a 0,1%.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e atrair investimentos para o sistema de transporte coletivo por meio da concessão de espaços publicitários em pontos de parada e logradouros até 2026, reinvestindo 80% no sistema de transporte coletivo e viário.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar a oferta e a organização do serviço de táxi no município, garantindo melhor cobertura e atendimento à população por meio da regularização de 377 vagas até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2027.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar e qualificar a infraestrutura de calçadas em 02 localidades para promover deslocamentos mais sustentáveis e seguros.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprovar o Plano de Mobilidade Urbana, garantindo que as decisões de médio e longo prazo estejam alinhadas às necessidades atuais da cidade e às diretrizes de desenvolvimento sustentável até final de 2027'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar 4000 Vagas de estacionamento rotativo visando promover o uso racional do espaço urbano em áreas de alta demanda, priorizando rotatividade, manutenção contínua e melhor uso do solo urbano.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a mobilidade urbana e a infraestrutura para garantir acessibilidade e integração entre regiões.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Automatizar 10 dos processos da Secretaria de Administração, eliminando fluxos manuais e promovendo maior eficiência, rastreabilidade e agilidade nos serviços até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Cumprir 100% das obrigações legais relacionadas à implantação do Regime de Previdência Complementar até 31/12/2025.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir que 100% dos novos servidores participem de treinamento integrativo nos primeiros 30 dias de exercício.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir que 70% dos usuários internos, estejam capacitados e utilizem os serviços digitais disponíveis até 31/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Digitalizar 100% dos processos de compras, contratos e licitações até 31/12/2026, promovendo transparência, agilidade e controle institucional.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover, até 31/12/2027, ações contínuas de capacitação, informação, valorização e cuidado com a saúde mental dos servidores públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Automatizar 100% dos processos logísticos por meio da implementação de sistema de gestão integrado.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Digitalizar 100% dos processos de Sindicância, Processo Administrativo Disciplinar (PAD) e Investigação por meio do sistema e-PAD até 31/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fortalecer, até 31/12/2026, a cultura de integridade, ética pública e prevenção ao assédio moral, sexual e à discriminação no serviço público municipal, por meio da capacitação de servidores, orientação da alta gestão e implantação de política institucional, alcançando pelo menos 20% dos servidores de cada Secretaria e 100% dos gestores públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Alcançar 30% de utilização de agentes de inteligência artificial (IA) em processos repetitivos das Diretorias e do Núcleo de Protocolo até 31/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Adquirir ou implementar sistema digital integrado aos processos administrativos para automatizar as avaliações de desempenho dos servidores, até 31/12/2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar 100% do prontuário clínico digital e perícia médica até 31/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Revisar os Planos de Cargos e Carreiras (Leis 11.966/2014 e 11.967/2014) alinhando-os ao Plano de Governo até 31/12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gerenciar 100% dos bens imóveis municipais por meio de Sistema Integrado de Gestão Patrimonial até 31/12/2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar 02 (dois) dias do evento do Circuito de Pesca Esportiva Triângulo Mineiro – Edição Uberlândia 2026, promovendo a prática da pesca esportiva, o turismo local e o desenvolvimento econômico e ambiental da região.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir a manutenção e conservação integral (100%) das estradas vicinais, pontes e mata-burros do município, incluindo o alargamento de 3 pontes de concreto e a elevação do greide em 60 km de vias rurais anualmente, assegurando drenagem eficiente, estabilidade estrutural e condições adequadas para o tráfego e escoamento da produção.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar a inclusão produtiva e a sustentabilidade de, no mínimo, 80% dos produtores atendidos pela assistência técnica no Programa Novo Agro.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a orientação de 35% dos estabelecimentos registrados, visando à diminuição das autuações decorrentes de infrações sanitárias.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Otimizar o processo de governança das feiras livres através de 3 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar as feiras livres em polos de turismo sustentável e cultura local, elevando em 25% o índice de atratividade responsável, que considera visitação turística, práticas ambientais e avaliação positiva dos consumidores.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar um programa de expensão gradual das feiras com consultas públicas, diagnóstico técnico das estruturas e instalação progressiva de melhorias como acessibildiade,sinalização permanente e canais diretos de comunicação com moradores.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fortalecer a atuação institucional do agronegócio no município por meio da capacitação técnica de 600 produtores rurais, ampliando a oferta, a eficiência e a visibilidade dos serviços prestados pela Secretaria.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Incluir 70% das escolas rurais no Projeto Educa Agro, promovendo educação agropecuária e saúde animal para melhorar a qualidade de vida no campo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a vacinação de 700 bezerras contra a Brucelose.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Incentivar o agronegócio, apoiando a criação e regularização ambiental e sanitária de pelo menos 5 novos empreendimentos sustentáveis no setor rural.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Impulsionar o desenvolvimento e expansão de pelo menos 12 agroindústrias locais, gerando empregos, agregando valor aos produtos rurais e promovendo formalização, inovação produtiva e acesso a novos mercados.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 8 encontros técnicos e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir a execução plena e qualificada dos programas PMAE e PAA até 31/12/2026, com 100% da execução dos recursos do MDS (PAA) e captação superior a 45% dos recursos disponíveis do FNDE (PMAE), fortalecendo a agricultura familiar e o atendimento às escolas e entidades socioassistenciais.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a gestão do Curral Municipal, garantindo 90% do cumprimento da lei, com foco em eficiência, transparência e impacto social.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar melhorias na segurança do curral municipal para prevenir furtos, visando a redução de 30% na quantidade de ocorrências, garantindo controle de acesso, proteção das instalações e maior segurança na guarda dos animais e equipamentos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 20% a capacidade produtiva e comercial dos agricultores familiares de Uberlândia até 2026, com foco na qualificação da produção, melhoria da infraestrutura de armazenagem e maior inserção no mercado institucional.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 25% os atendimentos técnicos da SMAGRO até 31/12/2026, com foco no fortalecimento dos programas de motomecanização, conservação de solo, reforma de pastagens, silagem e preparo de solo, beneficiando diretamente ao menos 150 produtores rurais.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Qualificar de forma contínua os produtores e colaboradores vinculados à SMAGRO, com a oferta mínima de 4 cursos técnicos por ano até 2026, voltados à operação de máquinas, manejo sustentável, produção e gestão rural.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Instalar ao menos 2 unidades estratégicas de infraestrutura para o agronegócio, como frigoríficos, visando a geração de emprego.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a vacinação contra Brucelose em bezerras, alcançando um aumento de 10% no número de animais vacinados em relação ao ano anterior.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Otimização de 100% dos processo de atendimento ao público.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Alteração no modelo de licitação de publicidade visando o aumento da produtividade de pelo menos 25%.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reestruturação de 100% dos canais de comunicação.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir a aderência de 100% referente aos eixos do Programa de Integridade'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Adesão de 50% dos CIGPs dos órgãos e entidades municipais.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover 04 ações de capacitação em gestão e fiscalização contratual, visando aprimorar o conhecimento dos servidores e a qualidade da execução dos contratos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realização de 02 eventos/capacitações com os servidores municipais'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Publicação de um ato normativo de atualização ao Decreto nº 18.810/2020 que regulamenta a organização e o funcionamento da Ouvidoria do Município'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o alcance de servidores em 50% na adesão ao evento "Semana da Integridade e Transparência"'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Automatizar e implantar um sistema para o processo de acesso à informação'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Manutenção dos 95,9% de pontuação no PNTP (Selo Diamante)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realização da primeira avaliação de um Programa de Integridade apresentado por empresa contratada'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Avaliação de 100% dos Serviços Públicos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realização 06 de eventos com alunos das escolas municipais.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantação da gestão de riscos estratégicos em 100% das Secretarias'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir a execução de, no mínimo, 15% das metas do Plano Municipal de Cultura 2024–2033 até 2028, mediante priorização formal e início da execução das ações previstas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o fomento à produção cultural, aumentando em até 20% o apoio financeiro a projetos culturais locais até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Colocar em funcionamento o Teatro Municipal Grande Otelo até 2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar pelo menos 2 novas unidades do Centro de Artes e Esportes Unificados (CEUs) até 2029, ampliando a infraestrutura cultural nas regiões de maior vulnerabilidade.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a preservação de 70% do acervo de bens oficialmente protegidos no Município até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 20% as ações dos Programas "Cidade da Música", "Cultura na Comunidade" e do Programa de Apoio a Comunidade'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 10% as ações de valorização da cultura urbana e artesanato.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir descentralização e itinerância de ações culturais em pelo menos 60% das regiões do Município, incluindo Zona Rural e Distritos até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a acessibilidade universal na cultura com ações em no minimo 50% dos equipamentos culturais administrados pela SMCT'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Instalar sinalização histórica e turística padronizada em pelo menos 100% dos bens tombados até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promoção do Turismo Rural e Ecoturismo através do mapeamento dos atrativos naturais do Municpio e desenvolvimento de no mínimo 3 roteiros turisticos até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover no mínimo 4 capacitações em arte digital até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar programa de monitoramento de dados turísticos até 2027'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar a plataforma de mapeamento de dados culturais do Município, pela qual serão mapeados agentes, espaços culturais, projetos e eventos culturais até 2027'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitar e certificar no minimo 200 agentes turísticos e guias locais até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 20% as ações do Programa de Promoção de Ações Afirmativas em Prol da Comunidade Afro'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Expandir ações do Programa Ler com Prazer, ampliando em até 30% o público beneficiado'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliação da capacitação cultural através da implementação de ações do Programa Qualificando Saberes, beneficiando pelo menos 300 pessoas anualmente'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar ações de Educação Patrimonial do Programa de Preservação do Patrimônio Histórico e Cultural, alcançando pelo menos 1.000 alunos da rede pública por ano'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar 3 Escolas de tempo integral de ensino fundamental até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Proporcionar ambiente mais propício para a aprendizagem em 100% das unidades escolares municipais até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover políticas de inclusão e redução das desigualdades sociais e étnico raciais com ações que reflitam na melhoria (qualquer %) no desempenho dos estudantes para assegurar a condicionalidade 3 do VAAR até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar e implantar pelo menos 2 trilhas de conhecimento para capacitar os Servidores em temas relevantes com o foco em melhorar os processos internos, alcançando mínimo de 70% do público alvo até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar parcerias com as universidades para fomentar o conhecimento com o objetivo de contribuir com os desafios da adm pública (TCC e Teses) em pelo menos 50 projetos iniciados até 2027.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar 9 EMEIs até até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir a meta (7.0 para anos iniciais e 6,5 para anos finais) do IDEB prevista para a rede municipal até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estruturar modelo de atendimento integrado às crianças das escolas de tempo integral em atividades que envolvam as secretarias de Educação, FUTEL, Desenvolvimento Social e Cultura.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar do Observatório do Mercado Imobiliário, integrando ferramentas já disponíveis; como ortofoto por georeferenciamento, planta genérica de valores, geração de laudos, simulação de valores imobiliários, entre outros.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estruturação da Gestão Tributária, a partir de implantação de instrumentos de inteligência tributária, fiscalização educativa, integração de sistemas e monitoramento de resultados.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Acompanhar e cumprir as alterações do ISSQN/IBS conforme cronograma da Reforma Tributária.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Proporcionar acesso ao contribuinte, dos meios de pagamento disponíveis na Rede Bancária; como PIX, CHEKOUT e outros,para todos os fatos geradores.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Concluir melhorias sistema Web Demonstrativos Fiscais'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar o Programa de Educação Financeira nas instituições de Ensino.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar a automação da Conciliação Bancária; possibilitando conferência digital entre extratos bancários e relatórios contábeis; porporcionando rapidez, segurança e precisão na apuração dos saldos bancários.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Revisar e atualizar o Código Tributário e taxas Municipais, conforme os fundamentos da Reforma Tributária, EC 132/2023.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a capacitação anual de no mínimo 100 servidores de Uberlândia e municípios da região nos princípios contábeis, de custos e de governança, consolidando o papel de Uberlândia como polo de integração e desenvolvimento regional.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso à informação pública e a transparência ativa e passiva facilitando a participação cidadã por meio de 10 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Posicionar Uberlândia entre os 10 primeiros lugares do "Ranking da Qualidade da Informação Contábil" no Siconfi” da Secretaria do Tesouro Nacional (STN)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Revisar a composição dos Fatos Geradores municipais; impostos e taxas'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir o tempo de processo de comunicação com o contribuinte em aproximadamente 25 dias, impactando positivamente no processo de arrecadação.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Securitização de 100% da carteira de recebíveis de Uberlândia até 2026. A meta proposta depende de estudos e análises'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir o CAPAG B até Dezembro de 2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 50% o acesso ao programa de tradução simultânea para surdos e mudos nos espaços públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 50% as adesões formais e a participação efetivado do Município em colegiados, entidades intermunicipais e instâncias federativas, fortalecendo sua inserção institucional e acesso a políticas públicas intergovernamentais.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Gerir os contratos de Tecnologia da Informação e Comunicação da Prefeitura de Uberlândia, garantindo disponibilidade, segurança e suporte aos sistemas corporativos, com índice geral de desempenho dos serviços ≥ 99%, assegurando a continuidade dos serviços públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir 100% do Processo de Atendimento a Comunidade direcionando as demandas para as Secretarias responsáveis e dando conhecimento do andamento do Processo ao cidadão.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar e consolidar, até o final de 2026, um processo contínuo de escuta ativa e diálogo estruturado com 90% dos setores territoriais definidos, integrando as demandas comunitárias mapeadas ao planejamento das políticas públicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Manter em 100% o nível de conformidade documental e cadastral do Município nas plataformas de habilitação para transferências voluntárias.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Elaborar propostas e acompanhar sua execução junto as Secretarias finalisticas, assegurando que 100% dos convênios e emendas estejam com documentação e execução fisico-financeira adequada, conforme os parâmetros estabelecidos pelos órgãos concedentes.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolver até 2027 métodos de acompanhamento que auxiliem no controle da manutenção da frota municipal e elevem a eficiência operacional, por meio da execução sistemática das manutenções preventivas, redução de retrabalhos e aumento da disponibilidade dos veículos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'É necessário criar nova META do Planejamento Estratégico e incluí-la nesse campo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar 1 inventário de emissão de gases de efeito estufa (GEE) no âmbito da Administração Pública Municipal.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar o Plano de Arborização Urbana como política de proteção, controle e conservação do meio ambiente, visando adensar as áreas verdes nos espaços públicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar primeiro ciclo de certificação de "Selo Uberlândia Mais Sustentável".'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar primeiro ciclo de certificação de "Selo Pet" em Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Assumir 2 novas classes de licenciamento ambiental para empreendimentos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar 2 eventos com foco em sustentabilidade.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Identificar, por meio da realização de 1 hackathon a cada ano, soluções para desafios ambientais no âmbito do Município de Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar em 50% a participação em programas de educação ambiental no Município.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar o Programa Municipal Integrado de Bem Estar Animal de Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar um sistema de indicadores ambientais públicos do Município de Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Proporcionar, pelo menos, 3 capacitações e atualizações aos servidores públicos que atuam na Secretaria.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Alcançar 20% dos irrigantes atráves do programa voltado à eficiência da irrigação em propriedades rurais do Município de Uberlândia.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolver e apoiar 3 projetos de recuperação de áreas de preservação permanente degradadas em área urbana e rural.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Planejar e estruturar o crescimento urbano e rural com sustentabilidade e justiça territorial.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar o Programa Municipal Integrado para monitoramento e melhoria da qualidade do ar e da diminuição de ruídos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Elaborar, orçar, validar propostas e disponibilizar 20 projetos de arquitetura e paisagismo para implantação e contemplação dos espaços públicos, como praças e parques, visando a execução quando da disponibilidade financeira.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Identificar novo(s) ambiente(s) adequado(s) para transferência de 100% da fauna do Zoológico Municipal (Zoo).'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar e fortalecer as ações da Escola de Governo, para qualificar a atuação dos servidores em cargo de gestão em pelo menos 3 Áreas de Conhecimento, utilizando ferramenta de LMS.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Preparar a PMU para utilizar a metodologia BIM em 100% dos projetos de construção civil.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ser referência no uso de IA no setor público através da implantação de um Centro de Gestão e Estudos Estratégicos, conforme MCTI - PBIA 2024-2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a Governança de Dados conforme a Lei Geral de Proteção de Dados Pessoais (LGPD) por meio de 3 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar e Manter o Planejamento Estratégico de forma sistêmica por meio de 5 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Facilitar o acesso à informação, ampliar a transparência e fortalecer integração entre as Secretarias e Orgãos de Autarquia por meio de 5 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Elevar o nível de maturidade em gerenciamento de projetos da prefeitura e autarquias até dez/2027'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar ferramenta de workflow e automatizar os processos core da prefeitura até dez 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Automatizar o processo de acompanhamento dos indicadores de desempenho da Atenção Primária à Saúde (APS), reduzindo o tempo necessário para sua execução em 83% até dezembro de 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolver 12 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Garantir inclusão social e direitos para todas as pessoas, com foco em populações vulneráveis.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar o receituário eletrônico em X unidades de saúde até o final de 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estabelecer parceria com pelo menos com duas instituições de ensino (pública ou privada) para desenvolver projetos que gerem soluções aplicáveis às necessidades do município através de TCCs e/ou TESES de Mestrado ou Doutorado.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estabelecer Arquitetura de Inteligência de Dados da PMU viabilizando DW´s, Datalake´s e IAs por meio de 3 ações estratégicas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Contratar 10 mil moradias nos próximos 4 anos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Regularizar 7 mil moradias nos próximos 4 anos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Otimização e Automação de 100% dos Processos Internos do Cadastro Habitacional.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Enviar propostas, para 100% dos programas disponíveis, conforme análise de viabilidade para o munícipio, via União e Estado até 2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estabelecer uma nova Sede da Secretaria Municipal da Juventude'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Beneficiar e desenvolver jovens que estejam cursando ensino superior ou técnico, com a contratação de 95% das vagas ofertadas de estágio.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Desenvolvimento pessoal e familiar do estagiário, atingir um indice de desenvolvimento pessoal de 80%'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Inserir estagiários no mercado de trabalho ao finalizar o programa de estágios, com uma taxa de empregabilidade de 70%.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar o 11° Congresso Municipal da Juventude'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar a economia criativa, o turismo e o agronegócio como vetores de crescimento sustentável.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar o 1º Aulão do ENEM da Juventude'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir o número de 4000 alunos atendidos pelo programa JuventUDI em Foco.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar a 1ª Semana da Juventude para servidores de até 30 anos'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implementar o Programa da Prefeitura de Intercâmbio de Lingua Inglesa para Jovens'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar 1° maratona municipal de programação da Prefeitura de Uberlândia'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Explorar oportunidades de qualificação e trabalho para fortalecer o desenvolvimento local.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Criar o Programa Clube de Benefícios (Para estagiários e servidores da Prefeitura de Uberlândia)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar o 2º Aulão do ENEM da Juventude'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar Semana da Juventude 2026'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar e capacitar os servidores para uma prefeitura mais eficiente e conectada.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar Central de Conciliação com o foco em redução 5% das judicializações dos casos de indenização contra o Município.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Arrecadar 10% do estoque de Dívida Ativa'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir para 80% o índice de não recebiveis da Dívida Ativa.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Integrar os Sistemas da PRODAUB (SIAT e eDocs) com EGPJ com o foco em: 1- Aumentar a produtividade em 40% 2- Reduzir o tempo de análise 40%'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 5%, em relação ao ano anterior, o número de consultas com especialistas ofertadas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Atingir os indices da Atenção Primária conforme Metas do Ministério da Saúde'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar o número de inspeções sanitárias conforme o risco dos estabelecimentos para atingir o total de 70% dos estabelecimentos cadastrados inspecionados pela VISA até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar anualmente 5% da cobertura da Atenção Primária no Município.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Reduzir o percentual de cesáreas realizadas no Hospital Municipal e HC/UFU em para menor que 30% até 12/2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construir 10 Unidades Básicas de Saúde da Família - UBSFs funcionando em imóveis próprios até 12/2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar em 5% ao ano o quantitativo de análises da qualidade da água até 12/2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar visitas para eliminação do aedes aegypti em 80% do quantitativo de imóveis por ciclo (4 ciclos por ano)'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Construir a sede própria do CEREST'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantação da telemedicina até 06/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar a cobertura da Saúde Bucal na Atenção Primária em 2,5% ao ano até 2029.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Capacitação de 50% dos profissionais da Rede para aprimoramento ao cuidado com o usúario até 12/2026.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Expansão/Implantação SAMU 192'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Promover a habilitação de pelo menos 3 unidades de saúde em UPAs'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o acesso a serviços de saúde, educação e assistência com qualidade e humanização.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implemetar sistema de alerta de risco hidrológico Avenida Rondon Pacheco. (100% implementado em até 12 meses).'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Tornar os espaços públicos modernos, atrativos e sustentáveis, promovendo qualidade de vida, moradia digna e regularizada.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fortalecimento e Expansão do Sistema de Monitoramento de Áreas de Risco em Uberlândia: Ampliação da Cobertura em 20% até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Ampliar o Anel de Segurança, expandindo e aprimorando o sistema de videomonitoramento por meio da implantação de câmeras inteligentes e recursos analíticos baseados em inteligência artificial, aumentando em 50% o número de equipamentos na zona urbana e em 50% na área rural até 2028, com o objetivo de reduzir os índices de criminalidade e aumentar a sensação de segurança da população nas áreas monitoradas.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Estruturar, até 31/12/2028, o Plano Municipal de Políticas sobre Drogas (PLAMAD) e ampliar as ações de prevenção, por meio da realização de pelo menos 2 diagnósticos, 5 campanhas públicas, 5 eventos formativos e 1 estudo de viabilidade para implantação do CREAD.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aumentar o monitoramento dos equipamentos e prédios públicos, elevando em 50% a cobertura de câmeras de vigilância inteligentes e sistemas de segurança integrados com inteligência artificial até 2028.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fortalecer, até 31/12/2028, a capacidade de planejamento, articulação e atuação integrada do município na prevenção à violência e criminalidade, com a realização de ao menos 8 diagnósticos semestrais, 8 reuniões intersetoriais, 4 eventos de articulação institucional, 4 pesquisas de percepção da segurança e a implantação de 2 programas estratégicos.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Implantar, até 31/12/2028, o Sistema Municipal de Prevenção à Violência de Uberlândia, composto pelo Plano Municipal de Segurança Pública, estruturas de governança, programa de prevenção nas escolas e estudo de viabilidade para criação da Guarda Civil Municipal.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Articular a integração entre os órgãos e fortalecer a participação comunitária nas ações de Defesa Civil para aumentar a resiliência e a prevenção de desastres em 100% das áreas de risco identificadas até 2028'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Valorizar a cultura, o esporte, o lazer e a segurança cidadã como pilares de qualidade de vida.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Realizar os ciclos anuais de certificação das instituições com o ''''Selo Uberlândia Mais Sustentável'''', ampliando em 20% o número de organizações certificada em relação ao ano anterior.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Fomentar o ambiente de negócios, o empreendedorismo e a inovação nos bairros e territórios.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Elaborar Plano Climático do município de Uberlândia, com base no inventário de emissões de GEE, estabelecendo metas de redução e adaptação, e garantindo a participação de 70% dos setores econômicos e sociais relevantes no processo.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Aprimorar a governança, a transparência e a cultura de resultados na administração municipal.' limit 1);
update metas set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Disponibilizar ferramenta digital "Calendário Ambiental de Uberlândia" oportunizando a participação e colaboração da comunidade e demais atores.'
  and objetivo_id = (select id from objetivos where municipio_id = '00000000-0000-0000-0000-000000000001' and nome = 'Transformar a gestão pública com inovação, digitalização e foco no cidadão.' limit 1);

-- 2. Peso dos PROJETOS (relativo à meta) — match exato pela descrição completa salva
--    Ignora valores fora da escala real (0-10); são artefatos de outras colunas (ex.: valores financeiros)
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Revitalização, manutenção e conservação das praças centrais

Meta estratégica: Ampliar de forma sustentável a geração de receitas próprias por meio da estruturação e execução de projetos de PPPs, concessões e demais modelagens, visando ganho econômico ou financeiro de R$ 500 milhões de receita municipal até 2028.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concessão do direito de uso do nome e marca do patrocinador no naming oficial do equipamento, com diretrizes de identidade visual e aprovação prévia

Meta estratégica: Ampliar de forma sustentável a geração de receitas próprias por meio da estruturação e execução de projetos de PPPs, concessões e demais modelagens, visando ganho econômico ou financeiro de R$ 500 milhões de receita municipal até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Proposta de estruturação do núcleo de compras das autarquias indiretas da Prefeitura Municipal de Uberlândia

Meta estratégica: Proposta de estruturação do núcleo de compras das autarquias indiretas da Prefeitura Municipal de Uberlândia';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Iniciar a implantação do projeto para garantir esgoto tratado até 2060, equilibrando com a garantia de abastecimento de água alcançada com a ETA Capim Branco.

Meta estratégica: Implantação da nova ETE (margem esquerda)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver e implantar Plano Municipal de Drenagem para combater o impacto de mudanças climáticas e alagamentos.

Meta estratégica: Utilizar o Plano Diretor de Drenagem para elaboração de 7 projetos estratégicos para os grandes problemas de drenagem (Morumbi, Córrego do Óleo, Córregos Liso/Lobo/Buritizinho, Córrego Lajeado e Córrego Campo Alegre).';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir Centro de Reservação e Bombeamento do Ipanema e do Alvorada

Meta estratégica: Construção de dois novos centros de reservação nos bairros Ipanema e Alvorada.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir novo Centro de Reservação do Bairro Laranjeiras

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas ligadas ao saneamento, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar e modernizar a coleta de resíduos sólidos (comum e seletiva)

Meta estratégica: Soluções para aumentar o desvio do que vai para o aterro - tratamento dos resíduos sólidos';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar estrutura de governança e escritório de gerenciamento de projetos e processos

Meta estratégica: Criar estrutura de governança e escritório de gerenciamento de projetos e processos';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reabilitar a ETE Uberabinha

Meta estratégica: Reabilitar a ETE Uberabinha';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhorar os indicadores de Extravasamento e Refluxo de Esgoto

Meta estratégica: Melhorar os indicadores de Extravasamento e Refluxo de Esgoto Redução média de 8% ao ano';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaboração de projeto de engenharia e execução das grandes erosões da Nossa Senhora das Graças

Meta estratégica: Entrega de 2 projetos de engenharia para contenção de grandes erosões.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação do Programa de Redução de Perdas

Meta estratégica: Implantação do Programa de Redução de Perdas';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estruturar projeto para implantar 10.000 telemetria para o ano de 2025

Meta estratégica: Expansão de telemetria nos hidrômetros 8.000 hidrômetros/ano';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhoria na gestão de custos operacionais (foco em eficiência e produtividade)

Meta estratégica: Melhoria na gestão de custos operacionais (foco em redução) Redução em 5% do custo unitário operacional da produção e distribuição de água. Redução em 5% do custo unitário operacional da coleta/afastamento/tratamento de esgoto.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar em 50% o índice de reciclagem em Uberlândia até 2028

Meta estratégica: Aumentar em 50% o índice de reciclagem em Uberlândia até 2028';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Projeto para viabilizar as ligações de água/esgoto em regiões que hoje possuem ligações irregulares e possuem processo de reurb em andamento.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Adequação dos programas para adesão dos Mutuários ao novo SIAT (reprogramação de REFIN do antigo sistema HABITA) junto à Caixa Econômica Federal - CEF

Meta estratégica: Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Digitalização dos documentos do acervo da EMAM, para fins de acesso à informação.

Meta estratégica: Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criação do inventário digital completo e atualizado dos imóveis/lotes pertencentes à EMAM.

Meta estratégica: Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Alcançar e manter, até 2026, eficácia mínima anual de 83% no atendimento das Ordens de Serviço da administração municipal, com metas progressivas por nível de complexidade, conforme o programa “Zelo por Uberlândia” do PPA 2026–2029.

Meta estratégica: Alcançar e manter, até 2026, eficácia mínima anual de 83% no atendimento das Ordens de Serviço da administração municipal, com metas progressivas por nível de complexidade, conforme o programa “Zelo por Uberlândia” do PPA 2026–2029.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar até dezembro de 2026 um sistema digital de gestão das Ordens de Serviço que permita controle em tempo real, relatórios automatizados e apoio à tomada de decisão.

Meta estratégica: Implantar até dezembro de 2026 um sistema digital de gestão das Ordens de Serviço que permita controle em tempo real, relatórios automatizados e apoio à tomada de decisão.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Publicar e manter atualizado, até 31/12/2025, o Catálogo de Serviços Técnicos da EMAM (1ª Edição) como instrumento oficial de padronização, gestão de ordens de serviço e articulação interinstitucional, assegurando sua revisão anual. Processo de contratação para compra de uniformes personalizados para a equipe operacional da EMAM - Dispensa de Licitação

Meta estratégica: Publicar e manter atualizado, até 31/12/2025, o Catálogo de Serviços Técnicos da EMAM (1ª Edição) como instrumento oficial de padronização, gestão de ordens de serviço e articulação interinstitucional, assegurando sua revisão anual.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Regularizar jurídica e administrativamente as ocupações do Loteamento Leão XIII até 2026, garantindo segurança jurídica aos ocupantes e adequação à legislação urbana.

Meta estratégica: Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover a regularização fundiária do núcleo urbano de Martinésia, garantindo segurança jurídica, inclusão social e desenvolvimento ordenado da área até 2026.

Meta estratégica: Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Regularizar fundiariamente os imóveis ocupados no distrito de Miraporanga, assegurando a segurança jurídica dos moradores, ordenamento territorial e acesso à titulação definitiva até 2026.

Meta estratégica: Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Regularizar fundiariamente o núcleo urbano do distrito de Cruzeiro dos Peixotos até 2028, por meio de planejamento estruturado, articulação institucional e cumprimento progressivo das exigências legais e registrais.

Meta estratégica: Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover a regularização fundiária completa do Bairro Morumbi até 2028, assegurando segurança jurídica, planejamento técnico e articulação institucional contínua.

Meta estratégica: Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reforçar, de forma contínua, os processos de escrituração definitiva dos imóveis quitados junto à EMAM, garantindo atendimento sistemático aos mutuários e promovendo a eliminação de passivos registrais, com redução de pelo menos 80% até 2028. Retomada dos processos de Escrituração dos mutuários que quitaram os imóveis adquiridos junto à EMAM, com as devidas orientações, emissões das Guias de Escrituração e assinatura das Escrituras definitivas.

Meta estratégica: Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Projeto de Reforma da Infraestrutura física da FERUB

Meta estratégica: Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a necessidade, até 2035.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Qualificação profissional e trabalho decente - Realização de 6 dias de campo na área de fruticultura

Meta estratégica: Qualificação profissional e trabalho decente - Realização de 6 dias de campo na área de fruticultura';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar em 30% a quantidade de unidades demonstrativas

Meta estratégica: Aumentar em 30% a quantidade de unidades demonstrativas';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar um ambiente para preservação de todas as plantas em extinção principalmente do cerrado brasileiro.

Meta estratégica: Criar um ambiente para preservação de todas as plantas em extinção principalmente do cerrado brasileiro.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação de uma agroindústria para fins didáticos

Meta estratégica: Implantação de uma agroindústria para fins didáticos';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir Poliesportivo no bairro Morumbi

Meta estratégica: Aumentar em 30% a quantidade de alunos nas escolinhas';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reformar Poliesportivo no bairro Canaã

Meta estratégica: Aumentar em 30% a quantidade de alunos nas escolinhas';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Treinamentos técnicos para os servidores da área administrativa da Futel.

Meta estratégica: Treinamentos técnicos para os servidores da área administrativa da Futel';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Modernizar e Melhorar as condições dos equipamentos de treinamentos para os paratletas com o objetivo de expandir o numero de paratletas para a próxima paraolimpíadas em Los Angeles, visando um ganho no número de medalhas, consolidando Uberlândia como referência Nacional e Internacional.

Meta estratégica: Aumentar a quantidade em 20% de paratletas ao ano.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Impermeabilização da cobertura do poliesportivo Roosevelt e Patrimônio

Meta estratégica: Aumentar em 30% a quantidade de alunos nas escolinhas';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa de Expansão Patrimonial: Viabilizar projetos com construções sem custo para a administração em parcerias com empresas privadas, arrecadação de aluguéis e incorporação do patrimônio para a fundação.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Integração Urbana: Estudos de áreas essenciais para os poliesportivos, doando os remanescentes para a construção de habitação de interesse social em áreas consolidadas com infraestrutura e otimizando a manutenção dos espaços sem áreas ociosas.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa de Atualização de Ativos Imobiliários: Estudo para projeto de lei para atualização dos valores de aluguel e utilização dos espaços, objetivando ou o aumento de receita ou o pagamento dos custos de manutenção (em casos de empresas sem fins lucrativos).

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Municipal de Patrocínio de Serviços Essenciais: Viabilizar mais parcerias em troca de publicidade para os serviços essenciais, como internet, materiais esportivos, etc.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Obter a Certificação do Pró-Gestão - Nível III

Meta estratégica: Melhorar o Nivel do Pro Gestao - Nivel 3';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Otimizar 100% do processo via implantação de software previdenciário

Meta estratégica: Otimizar 100% do processo via implatação de software previdenciário';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o crédito consignado para diminuir a taxa dos nossos segurados e aumentar a rentabilidade do IPREMU

Meta estratégica: Implantar o crédito consignado para diminuir a taxa dos nossos segurados e aumentar a rentabilidade do IPREMU';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Modernizar, Padronizar e Otimizar os processos internos do Instituto.

Meta estratégica: Revisão e Otimização dos processos em todas as áreas do IPREMU';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Manter e aprimorar o Mutirão Dívida Zero, com ações educativas para combater o superendividamento.

Meta estratégica: Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer o Procon com atendimento presencial e em pontos descentralizados nos bairros.

Meta estratégica: Ampliar o atendimento presencial descentralizado por meio de duas ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar a tecnologia de Inteligência Artificial no Sistema Fale Procon até 31/12/2025.

Meta estratégica: Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aperfeiçoar o balcão de negociação de dívidas

Meta estratégica: Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar o atendimento ao Superendividado nos termos da lei 14.181/21

Meta estratégica: Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar e implementar câmaras técnicas setoriais

Meta estratégica: Implementar 03 (três) câmaras técnicas setoriais e 02 (duas) comissões temáticas até 31/12/2025.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar e implementar comissões temáticas institucionais

Meta estratégica: Implementar 03 (três) câmaras técnicas setoriais e 02 (duas) comissões temáticas até 31/12/2025.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar o Observatório das Relações de Consumo

Meta estratégica: Implementar 02 (duas) ferramentas com o objetivo de monitoramento do mercado de consumo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar 10 (dez) ações (cursos, projetos, campanhas e atividades para disseminação da educação para o consumo) até 30/12/2026.

Meta estratégica: Criar 10 (dez) ações (cursos, projetos, campanhas e atividades para disseminação da educação para o consumo) até 30/12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reduzir em 90% o consumo de papel no PROCON

Meta estratégica: Reduzir em 90% o consumo de papel.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Digitalização do Acervo Físico

Meta estratégica: Erradicar os espaços para armazenamento de arquivos 25 m².';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Inserir sistemas de senhas interligado com sistema fale Procon

Meta estratégica: Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar canal direto para dúvidas dos fornecedores e consumidores - WhatsApp

Meta estratégica: Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar integração com Secretarias e Órgão afins (Sistema, dados e etc)

Meta estratégica: Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Otimização do fluxo do processo administrativo. Integração entre PROCON e demais núcleos. (NIARCon-Procon, CEJUSC, Juizado Especial, Defensoria Pública)

Meta estratégica: Modernizar o atendimento utilizando de novas tecnologias e melhorias e otimização processo por meio de 5 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar nova legislação Procon (estruturação adm, processual e TAC)

Meta estratégica: Criar nova legislação Procon e publicação da lei no diário oficial do municipio.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar selos de qualidade para Fornecedores

Meta estratégica: Ampliar o número de fornecedores qualificados para receber o "Selo de Qualidade de Boas práticas" por meio de execução de 5 etapas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar guia de procedimento Procon com tutorial

Meta estratégica: Capacitar e aperfeiçoar 80% os servidores públicos do Procon até 31/12/2027.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhorar internet da sede do Procon móvel

Meta estratégica: Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reestruturação da Fiscalização do Procon

Meta estratégica: Ampliar e modernizar a fiscalização do PROCON por meio de três ações estratégicas';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar núcleo de combate a discriminação nas relações de consumo

Meta estratégica: Reduzir a taxa de processos referente a discriminação nas relações de consumo por meio de 3 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Bem estar dos servidores

Meta estratégica: Aumentar o grau de satisfação do servidor por meio de execução de 5 ações.(Realizar pesquisa de satisfação antes e depois do periodo definido)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o programa UBERLÂNDIA CONECTADA para disponibilizar internet Wi-fi gratuita em parques, praças, prédios públicos, unidades de saúde, escolas e frota de ônibus.

Meta estratégica: Implementar 260 pontos de wi-fi nos equipamentos públicos conforme planejado na primeira fase.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aculturar e Implantar a IA em 6 (Seis) Soluções.

Meta estratégica: Aculturar e Implantar a IA em 6 (Seis) Soluções.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o DEC em todas as Secretarias e Orgãos de Autarquia (Secretárias que geram tributos para o Município)

Meta estratégica: Implantar o DEC em todas as Secretarias e Orgãos de Autarquia';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementação de 5.000 (cinco mil) soluções de IoT para o Departamento Municipal de Água e Esgoto-DMAE.

Meta estratégica: Implementar 5.000 (cinco Mil) Soluções de IoT';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer a parceria PRODAUB/FORTINET/UFU, com as Secretarias de Educação e Desenvolvimento Social

Meta estratégica: Capacitar em Cibersegurança os alunos da rede municipal e menores atendidos em equipamentos da Sec. Desenvolvimento Social (NAICA).';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Continuidade de processos de aderência de LGPD em 100% dos Sistemas gerenciados pela Prodaub.

Meta estratégica: Continuidade de processos de aderência de LGPD em 100% dos Sistemas gerenciados pela Prodaub.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construção da Sede da Prodaub no Polo Tecnológico

Meta estratégica: Construção da Sede da Prodaub no Polo Tecnológico.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atualizar ambiente Tecnológico da PMU

Meta estratégica: Atualizar ambiente Tecnológico da PMU';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reestruturar a rede de fibra óptica (Projeto Olho Vivo)

Meta estratégica: Reestruturar a rede de fibra óptica (Projeto Olho Vivo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estimular a construção de postos de abastecimentos de veículos elétricos em pontos estratégicos da cidade

Meta estratégica: Tornar o município de Uberlândia uma das 10 cidades líderes do Brasil em número de veículos elétricos e infraestrutura de apoio até 2027';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar programas de fomento ao empreendedorismo feminino, na cidade e no campo, com ações de qualificação profissional e apoio para geração de renda, sobretudo para mulheres em situação de risco ou vítimas de violência.

Meta estratégica: Apoiar até 1.200 mulheres em programas de capacitação para geração de renda, até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Intensificar o programa de atração de investimentos privados, mantendo Uberlândia como uma das cidades que mais geram empregos no país

Meta estratégica: Atingir 20 bilhões de reais de novos investimentos privados no município em 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir a implementação do Polo Tecnológico Sul

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer vínculos com o Ecossistema de Inovação de Uberlândia, unindo empresas de tecnologia e startups para favorecer a economia criativa na cidade, em parceria com setores de inovação

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Apoiar ações inovadoras de desburocratização e de melhoria do ambiente de negócios no município, com segurança jurídica, previsibilidade e transparência

Meta estratégica: Aumentar em 20% a contribuição no PIB de o município de Uberlândia, do segmento de bares, restaurantes, hotéis e similares.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'CENTRO IA Criar um HUB DE INTELIGÊNCIA ARTIFICIAL, tornando Uberlândia como refêrencia nacional de IA, acelerando negócios e inovação

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Facilita Inovação: Impulsionar a inovação em Uberlândia por meio da divulgação de editais de fomento (FAPEMIG, Finep, Compet Minas), com apoio técnico e financeiro em parceria com o Sebrae, visando 40 submissões em 2025 e crescimento anual de 15%, além da criação de um banco público de oportunidades para fortalecer o ecossistema local.

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Educatech Uberlândia: A partir de 2026, formar uma geração de talentos em tecnologia e inteligência artificial, iniciando com 100 alunos e ampliando vagas em 20% ao ano por três anos, por meio de cursos gratuitos em parceria com instituições como Amazon, Google, Oracle e empresas tecnológicas, focados na empregabilidade e nas demandas do mercado.

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Meninas Brilhantes – Ciência e Futuro em Mãos Femininas: Realizar, anualmente, cerimônia no Dia Internacional de Mulheres e Meninas na Ciência para homenagear alunas do fundamental II e médio das escolas públicas medalhistas nas olimpíadas STEM e conectar essas jovens ao ecossistema local de inovação.

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Mais Conectividade = Garantir conectividade e inclusão digital na zona rural e distritos de Uberlândia

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Prospectar empresa de data center para instalação no município de Uberlândia.

Meta estratégica: Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Agente Local de Inovação - Produtividade: Cerca de 2400 horas em ações de consultorias para aumento de produtividade

Meta estratégica: Capacitar 100 empresas de micro e pequeno porte em produtividade, qualidade, sustentabilidade e inovação';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar o programa Descomplica Negócios para simplificar normas e processos nos segmentos de gastronomia, turismo, entretenimento e eventos, fortalecendo o ambiente de negócios e a geração de empregos.

Meta estratégica: Realizar 2.000 atendimentos da Sala do Empreendedor até 2028 (média de 50 atendimentos por mês).';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Regulamentar o uso de Sandbox Regulatório em o município de Uberlândia por meio de decreto municipal, implementando uma cultura de experimentação regulatória e ao menos 2 projetos-piloto publicados.

Meta estratégica: Regulamentar o uso de Sandbox Regulatório em o município de Uberlândia por meio de decreto municipal, implementando uma cultura de experimentação regulatória e ao menos 2 projetos-piloto publicados.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar projeto de capacitIação de Inteligência Artificial em bairros ou segmentos empresariais no município: Projeto com cerca de 400 hs de consultoria

Meta estratégica: Capacitar até 100 empresas na utilização de Inteligência Artificial para melhoria dos negócios, por segmento de atuação';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprimorar o status de o município de Uberlândia como cidade global e colocar em prática 3 acordos de cidades irmãs até 2028.

Meta estratégica: Aprimorar o status de o município de Uberlândia como cidade global,atraindo 10 empresas internacionais e colocar em prática 10 acordos de cidades irmãs até 2028.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar o Programa Uberlândia Empreendedora: Apoiar negócios, gerar impacto e transformar o futuro de Uberlândia por meio das ações da Secretaria de Desenvolvimento Econômico e Inovação

Meta estratégica: Aprimorar o ambiente de negócio e capacitar pelo menos 3.000 micro e pequenas empresas em o município de Uberlândia em gestão, competitividade, melhoria de processos e inovação até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Contrata + Brasil Gerar oportunidades de compra/venda entre agentes público e MEis

Meta estratégica: Capacitar os compradores da Prefeitura e os MEIs para uso da plataforma e cadastrar cerca de 200 MEIs até 2028';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Núcleo Estratégico de Captação: Escritório de captação de Recursos de editais.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Acelera Uberlândia: Atingir 5 bilhões de reais em atração de investimentos em 2026, antendo Uberlândia como uma das cidades que mais geram empregos no país

Meta estratégica: Atingir 5 bilhões de reais em atração de investimentos em 2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Polo tecnológico: Transformar o Polo Tecnológico em um ambiente dinâmico e completo para inovação e crescimento empresarial

Meta estratégica: Polo tecnológico: Transformar o Polo Tecnológico em um ambiente dinâmico e completo para inovação e crescimento empresarial por meio de três iniciativas: entrega de escrituras para 14 empresas adquirentes dos lotes, instituição da governança do Comitê Gestor do Inova Uberlândia e criação da Associação de Proprietários do loteamento.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir a segunda quadra de tênis e de pista de atletismo no Parque do Sabiá.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar novos poliesportivos na cidade, levando mais opções de esporte e lazer para crianças, jovens e famílias nos bairros.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir a cobertura em mais quadras poliesportivas nos bairros

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar mais 2 NAICAs, sendo uma unidade na região Norte e outra no Shopping Park.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Asfalto Novo: ampliar ações de recuperação da malha viária da cidade com recapeamento de vias em bairros e pavimentação em áreas ainda sem asfalto, dentro do Uberlândia Integrada 4 - Bairros

Meta estratégica: AVANÇA UBERLÂNDIA: Ampliar ações de recapeamento e recuperação de malha viária à médio e longo prazo por meio de pelo menos 02 ações.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir implantação de processo de retenção de água da chuva na bacia do Parque Santa Luzia e córrego Lagoinha, reduzindo o impacto de volume de água na Rondon.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar trabalho de manutenção preventivo para minimizar a incidênica de novos buracos, principalmente no período chuvoso, através da contratação do SGISV (Sistema de Gestão Integrada do Sistema Viário).

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar as ações de manutenção asfáltica a curto e médio prazo, através de pelo menos 03 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar melhorias em 03 pontes de estradas vicinais

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Executar Infraestrutura completa do Bairro Élisson Prieto.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Continuar a implantação de obras de infraestrutura no assentamento do Maná

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir reforma da ETE Uberabinha.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas ligadas ao saneamento, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir reforma do Centro Administrativo e Câmara Municipal

Meta estratégica: Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a disponibilidade, até 2035.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar estudos e projetar a expansão do Centro Administrativo e Câmara Municipal

Meta estratégica: Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a disponibilidade, até 2035.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar estudos de viabilidade e, se justificável, contratação de software de gestão pública de contratos, seus congêneres e derivados

Meta estratégica: Elaboração de paineis indicadores e processos de melhoria contínua dentro da Secretaria de Infraestrutura, até 2026;';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Avança Uberlândia: Concluir projetos de contenção de cheias nas Av. Rondon Pacheco (Córrego São Pedro), Av. Anselmo Alves dos Santos (Córrego Jataí) e Av. Profª Minervina Cândida (Córrego Tabocas)

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das Obras de Drenagem da Av. Geraldo Abraão.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço do contrato de Reestruturação de Microdrenagem Urbana.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Avança Uberlândia: Definir e captar recurso para iniciar as obras de contenção de cheias nas Av. Rondon Pacheco e Av. Anselmo Alves dos Santos.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Restaurar Redes de Drenagem da Av. Profª Minervina Cândida.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras da Galeria da Rua Haia.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras de readequação da Represa do Parque do Sabiá para amortecimento de cheias.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar a Drenagem Urbana do Município de Uberlândia por meio de pelo menos 05 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Diminuir o tempo médio de atendimento das demandas de tapa buraco de 38 para 20 dias até 2028.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar as ações de manutenção asfáltica a curto e médio prazo, através de pelo menos 03 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Diminuir o número de solicitações da ouvidoria de tapa-buraco em 5% até 2028.

Meta estratégica: AVANÇA UBERLÂNDIA: Melhorar as ações de manutenção asfáltica a curto e médio prazo, através de pelo menos 03 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Executar 100km de pavimento no Município até 2028.

Meta estratégica: AVANÇA UBERLÂNDIA: Ampliar ações de recapeamento e recuperação de malha viária à médio e longo prazo por meio de pelo menos 02 ações.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras de modernização da Av. Sideral

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras da Trincheira Alvorada

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras de duplicação da Ponte do Níquel

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras de duplicação da Av. Monsenhor Eduardo

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Emissão da Ordem de serviço das obras de duplicação do viaduto da Av. João Pessoa

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto Estrutural do Viaduto da Rua General Osório

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto da Obra de Arte Especial (OAE) do Trevo do Belvedere

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto da Obra de Arte Especial (OAE) da Av. Nicomedes Alves dos Santos x Anel Viário Sul (acesso ao bairro Shopping Park)

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto da Obra de Arte Especial (OAE) da Av. Nicomedes Alves dos Santos x Av. Pres. Médici

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto da Obra de Arte Especial (OAE) da Av. Nicomedes Alves dos Santos x Av. Francisco Galassi

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo de Viabilidade e Projeto da Obra de Arte Especial (OAE) da Av. Ver. Carlito Cordeiro x Av. Geraldo Abraão

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Monitoramento e Gestão de Interface junto ao DNIT para a Implantação da Trincheira no Trevo Osvaldo de Oliveira (Ponte do Val)

Meta estratégica: AVANÇA UBERLÂNDIA: Reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, por meio de pelo menos 14 ações até 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar Novo Complexo Social, onde funcionava a antiga universidade católica, com a Casa da Mulher, Casa dos Conselhos, Estação Juventude e espaços de atendimento social.

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das Secretarias envolvidas com saúde, educação e assistência social, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar os 4º e 5º Conselhos Tutelares para atender crianças e adolescentes com direitos violados

Meta estratégica: Implantar 2 Conselhos Tutelares até 2028. (regulatório)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a Casa Dia na Rondon

Meta estratégica: Ampliar os serviços de atendimento a pessoa idosa em 20% até 2032';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar a segunda unidade da Casa Dia

Meta estratégica: Ampliar os serviços de atendimento a pessoa idosa em 20% até 2032';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar o Busão Social com mais unidades e serviços mais completos de atendimento social e acolhimento nos bairros.

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar mais unidades do CRAS – Casas da Família, melhorando atendimento nos bairros, começando pelas regiões Norte e Oeste

Meta estratégica: Ampliar o número de unidades do CRAS em 15% até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Modernizar o Programa PRÓ-PÃO

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar ações de acolhimento, saúde e atenção à população de rua

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Expandir ações de proteção à mulher e fortalecimento da rede de apoio a mulheres em situação de risco ou vítimas de violências de qualquer natureza.

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar a Casa da Mulher itinerante com ações nos bairros junto com o Busão Social.

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar ações de Educação e Cursos Profissionalizantes, com abertura de novas unidades e novos cursos na cidade

Meta estratégica: Ampliar para 8.000 o número de jovens e adultos qualificadas e ou requalificadas.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar novos cursos profissionalizantes nas áreas de tecnologia para atrair jovens.

Meta estratégica: Ampliar para 8.000 o número de jovens e adultos qualificadas e ou requalificadas.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar/implementar sistemas de informações para tratamento dos dados dos usuários e de serviços/projetos de forma integrada em toda a Secretaria de Desenvolvimento Social até 2035.

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir a implatação dos sistemas dos NAICA''''s e CEAI´s até 2026

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar sistema de informação nos CREAS Protetivo, Socioeducativo e Idoso/Pessoa com Deficiência

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar até 2028 a Política Municipal de Educação Permanente para os trabalhadores do SUAS, em consonância com a NOB-RH/SUAS, na perspectiva da qualificação dos serviços socioassistenciais.

Meta estratégica: Garantir o cumprimento das diretrizes da Politicia Nacional de Educação Permanente do SUAS';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Viabilizar a criação de Fab Labs (Laboratório de Fabricação) estimulando a inovação e aprendizado prático em um espaço colaborativo, em 02 unidades do Centros Profissionalizantes (UdiTech) e em 04 unidades dos Naica''''s até 2026

Meta estratégica: Viabilizar a criação de Fab Labs (Laboratório de Fabricação) estimulando a inovação e aprendizado prático em um espaço colaborativo, em 02 unidades do Centros Profissionalizantes (UdiTech) e em 04 unidades dos Naica''''s até 2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Disponibilizar 1.000 vagas de emprego de alto valor agregado (acima de R$5.500,00), oferecidas pela Unidade SINE Uberlândia até 2026.

Meta estratégica: Disponibilizar 1.000 vagas de emprego de alto valor agregado (acima de R$5.500,00), oferecidas pela Unidade SINE Uberlândia até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026

Meta estratégica: Revitalizar e modernizar 15 unidades externas de atendimento da Secretaria de Desenvolvimento Social até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 10% o número de vagas para o Serviço de Acolhimento Institucional de crianças, adolescentes e jovens até 2026.

Meta estratégica: Ampliar em 10% o número de vagas para o Serviço de Acolhimento Institucional de crianças, adolescentes e jovens até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estabelecer atos normativos/regulamentadores de serviços, projetos, programas e benefícios de assistência social, de forma a assegurá-los como política de Estado.

Meta estratégica: Atualizar e/ou normatizar 10 legislações referentes aos serviços, programas, projetos e benefícios de assistência social ofertados pelo município, até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar um fluxo sistematizado para integração das secretarias de Saúde e de Desenvolvimento Social para informações e atendimento

Meta estratégica: Implantar um fluxo sistematizado para integração das secretarias de Saúde e de Desenvolvimento Social para informações e atendimento';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fundo de Amparo Judicial: Buscar junto ao Poder Judiciário, a transferência de recursos obtidos por meio de multas impostas naquele âmbito, a serem direcionadas para o custeio de políticas de Assistência Social.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Gerações Sustentáveis: Aumentar arrecadação de recursos dos Fundos da Criança/Adolescente e do Idoso para utilização em projetos permitidos pela legislação dessas políticas, visando economia do orçamento próprio.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o Prontuário Eletrônico do SUAS em 100% dos CRAS do município.

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Plataforma Parceria Transparente: Implantação de sistema/plataforma digital para acompanhamento, monitoramento e avaliação das parcerais com as Organizações da Sociedade Civil ligadas à Secretaria.

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Painel Estratégico Social: Implantação de sistema/plataforma digital pela Diretoria de Vigilância Socioassistencial para acompanhamento e gestão de dados dos serviços e programas executados pela Secretaria.

Meta estratégica: Automatizar/digitalizar 30 processos/fluxos presentes no escopo da secretaria de Desenvolvimento Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa de Capacitação Primeiro Emprego: Implantar, nos NAICAS, programa de capacitação para o primeiro emprego, com ênfase na preparação para o mercado de trabalho e inserção profissional de adolescentes e jovens.

Meta estratégica: Ampliar para 8.000 o número de jovens e adultos qualificadas e ou requalificadas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar aprovação de loteamentos na modalidade simplificada( todos os tipos de loteamentos) Projeto piloto em andamento para Habitação de Interesse Social - Alterar a legislação permitindo a aprovação para demais loteamentos

Meta estratégica: Redução em 50% do tempo do processo de aprovação de loteamentos de Habitação de Interesse Social';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar sistema "Aprova Digital" ou outro similar

Meta estratégica: Criar um painel de acompanhamento do processo de aprovação de loteamentos envolvendo todas as secretarias responsáveis pela aprovação.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Plano Diretor - Alteração da LC 523/2011 promovendo melhorias e adequações no parcelamento do solo conforme realidade atual da cidade. Estudos já inciados - encaminhar propsota após a aprovação do Plano Diretor.

Meta estratégica: Aumento de 30% em receita através da modernização do processo de parcelamento do solo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar Instituto de Planejamento Urbano - planejamento do crescimento e desenvolvimento e da cidade

Meta estratégica: Implantar Instituto de Planejamento Urbano - planejamento do crescimento e desenvolvimento e da cidade';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover a alteração da LC 525/2011(Uso e Ocupação do Solo) a fim de flexibilizar CNAES (atividades comerciais) e regiões conforme a atual realidade da cidade

Meta estratégica: Aumentar em 30% a criação de novas empresas atráves da flexibilização da lei de uso e ocupação do solo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação de Sistema de Consulta Urbanística online Fase de teste -

Meta estratégica: Redução de 15 dias no processo de aprovação de projeto arquitetônico';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Alteração da lei que permite conversão das áreas institucionais para uso de habitação de interesse social

Meta estratégica: Aumentar a disponibilidade em 15% de áreas de habitação de interesse social.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar comitê de Viabilidade de implatação de equipamentos públicos.

Meta estratégica: Criar comitê de Viabilidade de implatação de equipamentos públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementação de leis para regulamentar a restruturação do centro da cidade.

Meta estratégica: Implementação de leis para regulamentar a restruturação do centro da cidade.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhorar a varrição nas principais avenidas da cidade, com utilização de novo serviço de varrição mecanizada.

Meta estratégica: Ampliar as áreas de varrição e a frequência em áreas com alta circulação';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir, reformar e ampliar Ecopontos na cidade

Meta estratégica: Contribuir para a limpeza urbana com o descarte ambientalmente correto com a operação de 15 Ecopontos até Dez/2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Continuar os serviços de iluminação pública por LED em toda a cidade e nos acessos rodoviários aos bairros

Meta estratégica: Realizar estudo técnico de viabilidade para a implantação do sistema de iluminação pública subterrânea em, no mínimo, 6 pontos estratégicos localizados nos principais trevos e rodovias de acesso ao Município de Uberlândia. A iniciativa visa aumentar a segurança viária, valorizar os acessos urbanos e promover a modernização e a melhoria estética dos espaços públicos. O estudo deverá ser concluído até dezembro de 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o serviço de pintura mecanizada de meio-fio com utilização de tinta no Município de Uberlândia, visando otimizar a sinalização viária horizontal, aumentar a produtividade e melhorar a qualidade dos serviços prestados.

Meta estratégica: Implantar, revitalizar e manter a pintura de 80% dos meio-fios da cidade de Uberlândia, com foco na segurança viária, melhoria da mobilidade urbana e embelezamento da cidade';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação da varrição mecanizada nos canteiros centrais e vias públicas, utilizando varredeiras automotivas para complementar e otimizar os serviços de varrição manual, até dezembro de 2028

Meta estratégica: Implantar e viabilizar a varrição 100% mecanizada nos canteiros centrais e expandir em mais 20% a varrição manual nas vias públicas do Município de Uberlândia, aliada à realização de estudos e à implantação da capina mecanizada. A iniciativa tem como objetivo modernizar, ampliar e reduzir custos dos serviços de limpeza urbana, promovendo mais eficiência operacional, sustentabilidade, agilidade e melhoria na qualidade dos espaços públicos, além de garantir maior produtividade na manutenção das áreas urbanas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliação de 20% das equipes de varrição manual, garantindo a cobertura de áreas não atendidas pela mecanização e reforçando a manutenção dos espaços públicos, janeiro de 2026 a dezembro de 2028, e aumentar em 15% da capacidade de capina nas vias públicas, promovendo a modernização e otimização dos serviços de limpeza urbana, até 31 de dezembro de 2028.

Meta estratégica: Implantar e viabilizar a varrição 100% mecanizada nos canteiros centrais e expandir em mais 20% a varrição manual nas vias públicas do Município de Uberlândia, aliada à realização de estudos e à implantação da capina mecanizada. A iniciativa tem como objetivo modernizar, ampliar e reduzir custos dos serviços de limpeza urbana, promovendo mais eficiência operacional, sustentabilidade, agilidade e melhoria na qualidade dos espaços públicos, além de garantir maior produtividade na manutenção das áreas urbanas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação da capina elétrica em 100% das ruas com blocos e paralelepípedos onde a capinha mecanizada e manual não consegue atender, adotando uma solução sustentável e preservando os pavimentos, janeiro de 2026 a dezembro de 2028.

Meta estratégica: Implantar e viabilizar a varrição 100% mecanizada nos canteiros centrais e expandir em mais 20% a varrição manual nas vias públicas do Município de Uberlândia, aliada à realização de estudos e à implantação da capina mecanizada. A iniciativa tem como objetivo modernizar, ampliar e reduzir custos dos serviços de limpeza urbana, promovendo mais eficiência operacional, sustentabilidade, agilidade e melhoria na qualidade dos espaços públicos, além de garantir maior produtividade na manutenção das áreas urbanas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar 200 novos pontos de iluminação pública no Município de Uberlândia, visando ampliar a cobertura da rede de iluminação, aumentar a segurança da população e melhorar a qualidade dos espaços públicos.

Meta estratégica: Realizar estudos técnicos e viabilizar a implantação de aproximadamente 200 novos pontos de iluminação pública em locais previamente identificados e aprovados, contemplando ambos os lados das vias. A ação visa ampliar em 20% a cobertura da rede de iluminação pública no município, contribuindo para o aumento da segurança, a valorização dos espaços urbanos e a melhoria do conforto e da qualidade de vida da população, com execução no período de janeiro de 2026 a dezembro de 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar a iluminação natalina nos principais espaços públicos do Município de Uberlândia durante o período de dezembro de 2025 a dezembro de 2028.

Meta estratégica: Planejar e viabilizar, anualmente, a implantação do projeto de iluminação natalina no Município de Uberlândia, contemplando, no mínimo, 13 espaços públicos por ano — incluindo praças, avenidas, prédios públicos, rotatórias e pontos turísticos — totalizando no minimo 52 locais decorados no período de 2025 a 2028. A iniciativa tem como objetivo valorizar os espaços urbanos, fomentar o comércio local, fortalecer o espírito natalino e promover a ocupação segura e atrativa da cidade durante o período festivo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reformar os dois cemitérios municipais até dezembro de 2027 e concluir as três salas velatórias do Cemitério Campo do Bom Pastor até julho de 2025, visando melhorar a infraestrutura, a acessibilidade, o acolhimento às famílias e a qualidade dos serviços funerários prestados à população.

Meta estratégica: Ampliar e modernizar a infraestrutura de dois cemitérios municipais de Uberlândia, com foco na melhoria da capacidade de atendimento, conforto e qualidade dos serviços funerários prestados à população, incluindo a ampliação de 600 vagas de arrendamento no Cemitério Campo do Bom Pastor.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaborar e implementar Plano Anual de Capacitação para os servidores da SESURB, promovendo a realização de, no mínimo, 06 turmas de capacitação contínua, visando aprimorar a qualidade dos serviços prestados, fortalecer as competências dos servidores e qualificar o atendimento à população.

Meta estratégica: Desenvolver ações de capacitação e promover a humanização no atendimento para 70% dos servidores da SESURB, com o objetivo de aprimorar a qualidade dos serviços, elevar a satisfação dos usuários e fortalecer a eficiência, o comprometimento e a excelência no desempenho das atividades.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reformar e adequar o imóvel da Avenida Rondon Pacheco, nº 5.000, para centralização das atividades da SESURB, incluindo a elaboração de projetos, modernização das instalações, integração dos setores e execução da logística de transferência dos serviços, equipamentos e servidores.

Meta estratégica: Realizar a reforma de aproximadamente do imóvel localizado na Av. Rondon Pacheco, nº 5000, e promover a transferência integral da Secretaria Municipal de Serviços Urbanos (SESURB) para esse local, visando ampliar em 50% o espaço físico atualmente disponível, adequar as condições de atendimento ao público e integrar fisicamente todos os setores da secretaria. A ação tem como objetivo promover maior eficiência operacional, melhor organização dos processos internos e mais conforto para servidores e cidadãos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reformar o Camelódromo Municipal e viabilizar a reforma do Ambulódromo da Praça Jacy de Assis, assegurando melhorias estruturais, modernização dos espaços comerciais e qualificação do atendimento à população.

Meta estratégica: Concluir a reforma do Camelódromo Municipal da Av. Floriano Peixoto, abrangendo 100% da revitalização das instalações, e viabilizar, por meio da análise e aprovação do COMPHAC, a reforma do Ambulódromo da Praça Jaci de Assis, contemplando a recuperação de, no mínimo, 20% das áreas comuns. Essas ações visam melhorar as condições de infraestrutura, garantir um ambiente adequado e seguro para os comerciantes e frequentadores, e promover a valorização dos espaços públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a participação de frota eletrificada (motos, carros ou ônibus) a serviço do povo de Uberlândia.

Meta estratégica: Reduzir os impactos ambientais da mobilidade urbana, com 50% da frota de transporte público e credenciado composta por veículos de baixa emissão até 2035, contribuindo para a melhoria da qualidade do ar.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhorar ações e serviços de sinalização de trânsito, vertical e horizontal, em todas as regiões

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Complementar instalação de botoeiras acessíveis em semáforos

Meta estratégica: Garantir acessibilidade em cruzamentos semaforizados, com implantação progressiva de botoeiras sonoras e acessíveis em 100% dos semáfaros até 2030, promovendo inclusão de pessoas com deficiência.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar programa de Integração Temporal nos ônibus, permitindo aos usuários do SIT trocar de linha, fora dos terminais, sem pagar outra passagem por período.

Meta estratégica: Ampliar o acesso e a eficiência do transporte público com a implantação da integração modal e temporal em 100% do sistema até 2035';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar sistema de internet gratuita em 100% da frota de ônibus e nas estações

Meta estratégica: Implementar 260 pontos de wi-fi nos equipamentos públicos conforme planejado na primeira fase.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o Terminal Universitário em frente ao Uberlândia Shopping

Meta estratégica: Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Mais tecnologia e segurança no trânsito: concluir instalação de fibra ótica em toda a rede semafórica, com câmeras com Inteligência Artificial em semáforos, controlando o tempo de abertura e fechamento com mais segurança e eficiência.

Meta estratégica: Modernizar 100% da rede semafórica com tecnologia digital e inteligência artificial até 2030';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Respeite a Faixa: implantar ações educativas e de monitoramento para criar a cultura de respeito à parada para travessia em faixas de pedestres

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Educação no Trânsito: ampliar ações educativas em escolas e na Transitolândia, com foco no respeito e cultura de paz no trânsito.

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer ações preventivas a infrações de trânsito

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar a percepção de segurança para 60% e confiabilidade para 70% do transporte coletivo entre os usuários. (Fonte: pesquisa de satisfação anual com usuários)

Meta estratégica: Aumentar a percepção de segurança para 60% e confiabilidade para 70% do transporte coletivo entre os usuários. (Fonte: pesquisa de satisfação anual com usuários)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Garantir integridade do programa Tarifa Zero Estudantil com índice de fraude inferior a 0,1%.

Meta estratégica: Garantir integridade do programa Tarifa Zero Estudantil com índice de fraude inferior a 0,1%.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Valorizar e atrair investimentos para o sistema de transporte coletivo por meio da concessão de espaços publicitários em pontos de parada até 2026, reinvestindo 80% no sistema de transporte coletivo.

Meta estratégica: Valorizar e atrair investimentos para o sistema de transporte coletivo por meio da concessão de espaços publicitários em pontos de parada e logradouros até 2026, reinvestindo 80% no sistema de transporte coletivo e viário.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Expandir sistema de Corredores de Transporte Público: Corredor Sudoeste - Terminal Jardins

Meta estratégica: Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Expandir sistema de Corredores de Transporte Público: Corredor Sul - Terminal Universitário

Meta estratégica: Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Expandir sistema de Corredores de Transporte Público: Corredor Oeste - Terminal Dona Zulmira

Meta estratégica: Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a oferta e a organização do serviço de táxi no município, garantindo melhor cobertura e atendimento à população por meio da regularização de 377 vagas até 2026.

Meta estratégica: Ampliar a oferta e a organização do serviço de táxi no município, garantindo melhor cobertura e atendimento à população por meio da regularização de 377 vagas até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reduzir os impactos ambientais da mobilidade urbana, com 50% da frota de transporte público e credenciado composta por veículos de baixa emissão até 2035, contribuindo para a melhoria da qualidade do ar.

Meta estratégica: Reduzir os impactos ambientais da mobilidade urbana, com 50% da frota de transporte público e credenciado composta por veículos de baixa emissão até 2035, contribuindo para a melhoria da qualidade do ar.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reestruturação do tempo e da travessia de pedestre na Área Central (prioridade ao pedestre)

Meta estratégica: Garantir acessibilidade em cruzamentos semaforizados, com implantação progressiva de botoeiras sonoras e acessíveis em 100% dos semáfaros até 2030, promovendo inclusão de pessoas com deficiência.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Licitação Projeto Executivo e Execução Ciclovia Estrada Martinésia - Capim Branco (22km)

Meta estratégica: Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2027.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar uma ciclovia com 8 km de extensão ao longo da Estrada Pau-Furado

Meta estratégica: Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2027.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar Sistema de Compartilhamento de Bicicletas - Mínimo 30 Bicicletas (Elaboração de Estudo de Viabilidade e Projeto Básico)

Meta estratégica: Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2027.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar e qualificar a infraestrutura de calçadas em 02 localidades para promover deslocamentos mais sustentáveis e seguros.

Meta estratégica: Ampliar e qualificar a infraestrutura de calçadas em 02 localidades para promover deslocamentos mais sustentáveis e seguros.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprovar o Plano de Mobilidade Urbana, garantindo que as decisões de médio e longo prazo estejam alinhadas às necessidades atuais da cidade e às diretrizes de desenvolvimento sustentável até final de 2027

Meta estratégica: Aprovar o Plano de Mobilidade Urbana, garantindo que as decisões de médio e longo prazo estejam alinhadas às necessidades atuais da cidade e às diretrizes de desenvolvimento sustentável até final de 2027';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar Estacionamento Rotativo no Município - 4000 Vagas Hipercentro , Martins e Áreas Potênciais

Meta estratégica: Implantar 4000 Vagas de estacionamento rotativo visando promover o uso racional do espaço urbano em áreas de alta demanda, priorizando rotatividade, manutenção contínua e melhor uso do solo urbano.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomentar a Segurança Viária - Implantar Painéis de Mensagens Variáveis no Município Implantar Painel de Mensagens Variáveis na Avenida Rondon Pacheco

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomentar a Segurança Viária - Implantar Projetos Binários nos Bairros - 48 vias Elaborar e Implantar Projetos de Binários

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomentar a Segurança Viária - Reduzir em 10% o número dos acidentes de trânsito nos 10 Principais Cruzamentos (últimos 3 anos) Promover ações e serviços contínuos de sinalização de trânsito, vertical e horizontal, em todas as regiões

Meta estratégica: Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Uberlândia de Bike: concluir rede de ciclovias em todas as regiões da cidade, ligada aos terminais e principais eixos viários da cidade.

Meta estratégica: Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2027.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Publicidade nas estações dos corredores BRT - redução de 30% nos custos com manutenção das estações.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Manter espaço de diálogo e políticas de valorização do Servidor Municipal, com manutenção de direitos e ações complementares, como( Implantar a academia para o servidor público.

Meta estratégica: Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a necessidade, até 2035.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver Painel de Gestão à Vista para SMA (Absenteísmo, Afastamento, TurnOver, etc...)

Meta estratégica: Automatizar 10 dos processos da Secretaria de Administração, eliminando fluxos manuais e promovendo maior eficiência, rastreabilidade e agilidade nos serviços até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar Aposentadoria Complementar

Meta estratégica: Cumprir 100% das obrigações legais relacionadas à implantação do Regime de Previdência Complementar até 31/12/2025.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Automatizar 10 dos processos da Secretaria de Administração, eliminando fluxos manuais e promovendo maior eficiência, rastreabilidade e agilidade nos serviços até 2026.

Meta estratégica: Automatizar 10 dos processos da Secretaria de Administração, eliminando fluxos manuais e promovendo maior eficiência, rastreabilidade e agilidade nos serviços até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Treinamento Integrativo (Proporcionar uma integração completa para novos colaboradores, apresentando a cultura, processos e expectativas, para que se sintam acolhidos e preparados desde o início.)

Meta estratégica: Garantir que 100% dos novos servidores participem de treinamento integrativo nos primeiros 30 dias de exercício.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Garantir que 70% dos usuários internos, estejam capacitados e utilizem os serviços digitais disponíveis até 31/12/2026.

Meta estratégica: Garantir que 70% dos usuários internos, estejam capacitados e utilizem os serviços digitais disponíveis até 31/12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Modernizar, padronizar e digitalizar os processos de compras, licitações e gestão contratual por meio da integração de sistemas específicos, promovendo maior eficiência, transparência, controle e aderência às exigências legais, até 31/12/2028 (como SICOM/TCE-MG e PNCP).

Meta estratégica: Digitalizar 100% dos processos de compras, contratos e licitações até 31/12/2026, promovendo transparência, agilidade e controle institucional.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover, até 31/12/2027, ações contínuas de capacitação, informação, valorização e cuidado com a saúde mental dos servidores públicos.

Meta estratégica: Promover, até 31/12/2027, ações contínuas de capacitação, informação, valorização e cuidado com a saúde mental dos servidores públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Automatizar 100% dos processos logísticos por meio da implementação de sistema de gestão integrado.

Meta estratégica: Automatizar 100% dos processos logísticos por meio da implementação de sistema de gestão integrado.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar os procedimentos internos e externos no e-PAD (Sistema do Governo Federal)

Meta estratégica: Digitalizar 100% dos processos de Sindicância, Processo Administrativo Disciplinar (PAD) e Investigação por meio do sistema e-PAD até 31/12/2026.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer, até 31/12/2026, a cultura de integridade, ética pública e prevenção ao assédio moral, sexual e à discriminação no serviço público municipal, por meio da capacitação de servidores, orientação da alta gestão e implantação de política institucional, alcançando pelo menos 20% dos servidores de cada Secretaria e 100% dos gestores públicos.

Meta estratégica: Fortalecer, até 31/12/2026, a cultura de integridade, ética pública e prevenção ao assédio moral, sexual e à discriminação no serviço público municipal, por meio da capacitação de servidores, orientação da alta gestão e implantação de política institucional, alcançando pelo menos 20% dos servidores de cada Secretaria e 100% dos gestores públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Disponibilizar Agentes de IA nos processos das Diretorias

Meta estratégica: Alcançar 30% de utilização de agentes de inteligência artificial (IA) em processos repetitivos das Diretorias e do Núcleo de Protocolo até 31/12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar um sistema digital integrado aos processos administrativos para automatizar a avaliação de desempenho.

Meta estratégica: Adquirir ou implementar sistema digital integrado aos processos administrativos para automatizar as avaliações de desempenho dos servidores, até 31/12/2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar um sistema de prontuário clínico digital e perícia médica.

Meta estratégica: Implementar 100% do prontuário clínico digital e perícia médica até 31/12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Revisar os Planos de Cargos e Carreiras (Leis 11.966/2014 e 11.967/2014) alinhando-os ao Plano de Governo até 31/12/2026.

Meta estratégica: Revisar os Planos de Cargos e Carreiras (Leis 11.966/2014 e 11.967/2014) alinhando-os ao Plano de Governo até 31/12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar um sistema integrado para cadastro, georreferenciamento e visualização dos bens imóveis municipais, associando informações jurídicas, ocupacionais e documentais em mapa digital interativo, com geração de relatórios para apoiar a tomada de decisão.

Meta estratégica: Gerenciar 100% dos bens imóveis municipais por meio de Sistema Integrado de Gestão Patrimonial até 31/12/2028.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar PCA - Plano de Contratação Anual: Compras planejadas e compartilhadas. Planejamento de prazos e entregas.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomentar o desenvolvimento do Turismo Rural e Ecoturismo.

Meta estratégica: Realizar 02 (dois) dias do evento do Circuito de Pesca Esportiva Triângulo Mineiro – Edição Uberlândia 2026, promovendo a prática da pesca esportiva, o turismo local e o desenvolvimento econômico e ambiental da região.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Continuar e aprimorar programa de melhoria das estradas vicinais

Meta estratégica: Garantir a manutenção e conservação integral (100%) das estradas vicinais, pontes e mata-burros do município, incluindo o alargamento de 3 pontes de concreto e a elevação do greide em 60 km de vias rurais anualmente, assegurando drenagem eficiente, estabilidade estrutural e condições adequadas para o tráfego e escoamento da produção.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer a ampliar o programa NOVO AGRO, sobretudo nas áreas de olericultura, fruticultura e recuperação de pastagens, promovendo ações direcionadas à assistência técnica e insumos.

Meta estratégica: Ampliar a inclusão produtiva e a sustentabilidade de, no mínimo, 80% dos produtores atendidos pela assistência técnica no Programa Novo Agro.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar um programa contínuo de capacitação e atualização técnica para responsáveis técnicos e gestores das empresas, com foco em boas práticas sanitárias e atendimento à legislação aplicável.

Meta estratégica: Promover a orientação de 35% dos estabelecimentos registrados, visando à diminuição das autuações decorrentes de infrações sanitárias.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estabelecer um canal permanente de comunicação, orientação e mediação de conflitos entre o Serviço de Inspeção Municipal, os empresários e a administração pública, visando a resolução ágil e amigável de pendências e dúvidas.

Meta estratégica: Promover a orientação de 35% dos estabelecimentos registrados, visando à diminuição das autuações decorrentes de infrações sanitárias.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fiscalização inteligente e preventiva: Implantar modelo de fiscalização educativa com checlists digitais,alertas automáticos e protocolo de acompanhemento pós-irregularidade, reduzindo reincidências em pelo menos 30%.

Meta estratégica: Otimizar o processo de governança das feiras livres através de 3 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Sistema de avaliação digital simples para consumidores.

Meta estratégica: Transformar as feiras livres em polos de turismo sustentável e cultura local, elevando em 25% o índice de atratividade responsável, que considera visitação turística, práticas ambientais e avaliação positiva dos consumidores.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar e qualificar a rede de feiras municipais com foco em inclusão, acessibilidade, participação cidadã e eficiência operacional, promovendo uma ocupação urbana mais equitativa, sustentável e integrada aos territórios.

Meta estratégica: Implantar um programa de expensão gradual das feiras com consultas públicas, diagnóstico técnico das estruturas e instalação progressiva de melhorias como acessibildiade,sinalização permanente e canais diretos de comunicação com moradores.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer a atuação institucional do agronegócio no município por meio da capacitação técnica de 600 produtores rurais, ampliando a oferta, a eficiência e a visibilidade dos serviços prestados pela Secretaria.

Meta estratégica: Fortalecer a atuação institucional do agronegócio no município por meio da capacitação técnica de 600 produtores rurais, ampliando a oferta, a eficiência e a visibilidade dos serviços prestados pela Secretaria.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Incluir 70% das escolas rurais no Projeto Educa Agro, promovendo educação agropecuária e saúde animal para melhorar a qualidade de vida no campo.

Meta estratégica: Incluir 70% das escolas rurais no Projeto Educa Agro, promovendo educação agropecuária e saúde animal para melhorar a qualidade de vida no campo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover a vacinação de 700 bezerras contra a Brucelose.

Meta estratégica: Promover a vacinação de 700 bezerras contra a Brucelose.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Incentivar o agronegócio, apoiando a criação e regularização ambiental e sanitária de pelo menos 5 novos empreendimentos sustentáveis no setor rural.

Meta estratégica: Incentivar o agronegócio, apoiando a criação e regularização ambiental e sanitária de pelo menos 5 novos empreendimentos sustentáveis no setor rural.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Impulsionar o desenvolvimento e expansão de pelo menos 12 agroindústrias locais, gerando empregos, agregando valor aos produtos rurais e promovendo formalização, inovação produtiva e acesso a novos mercados.

Meta estratégica: Impulsionar o desenvolvimento e expansão de pelo menos 12 agroindústrias locais, gerando empregos, agregando valor aos produtos rurais e promovendo formalização, inovação produtiva e acesso a novos mercados.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 8 encontros técnicos e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.

Meta estratégica: Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 8 encontros técnicos e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Garantir a execução plena e qualificada dos programas PMAE e PAA até 31/12/2026, com 100% da execução dos recursos do MDS (PAA) e captação superior a 45% dos recursos disponíveis do FNDE (PMAE), fortalecendo a agricultura familiar e o atendimento às escolas e entidades socioassistenciais.

Meta estratégica: Garantir a execução plena e qualificada dos programas PMAE e PAA até 31/12/2026, com 100% da execução dos recursos do MDS (PAA) e captação superior a 45% dos recursos disponíveis do FNDE (PMAE), fortalecendo a agricultura familiar e o atendimento às escolas e entidades socioassistenciais.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Cumprimento da Lei 14.644/2025

Meta estratégica: Aprimorar a gestão do Curral Municipal, garantindo 90% do cumprimento da lei, com foco em eficiência, transparência e impacto social.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Redução no consumo de feno por meio da rotação dos piquetes e formação de nova área de capim; Redução 2024 - 2025, em 2026 será implementado mais um pasto, reduzindo mais o consumo de feno.

Meta estratégica: Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Redução nos custos operacionais, com atendimentos veterinários realizados no próprio curral via convênio com a UFU e UNIUBE, uso de insumos adquiridos e capacitação da equipe;

Meta estratégica: Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomento ao programa integrado de doação de animais.

Meta estratégica: Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação de Medidas de Segurança no Curral Municipal

Meta estratégica: Implantar melhorias na segurança do curral municipal para prevenir furtos, visando a redução de 30% na quantidade de ocorrências, garantindo controle de acesso, proteção das instalações e maior segurança na guarda dos animais e equipamentos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 20% a capacidade produtiva e comercial dos agricultores familiares de Uberlândia até 2026, com foco na qualificação da produção, melhoria da infraestrutura de armazenagem e maior inserção no mercado institucional.

Meta estratégica: Ampliar em 20% a capacidade produtiva e comercial dos agricultores familiares de Uberlândia até 2026, com foco na qualificação da produção, melhoria da infraestrutura de armazenagem e maior inserção no mercado institucional.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 25% os atendimentos técnicos da SMAGRO até 31/12/2026, com foco no fortalecimento dos programas de motomecanização, conservação de solo, reforma de pastagens, silagem e preparo de solo, beneficiando diretamente ao menos 150 produtores rurais.

Meta estratégica: Ampliar em 25% os atendimentos técnicos da SMAGRO até 31/12/2026, com foco no fortalecimento dos programas de motomecanização, conservação de solo, reforma de pastagens, silagem e preparo de solo, beneficiando diretamente ao menos 150 produtores rurais.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Qualificar de forma contínua os produtores e colaboradores vinculados à SMAGRO, com a oferta mínima de 4 cursos técnicos por ano até 2026, voltados à operação de máquinas, manejo sustentável, produção e gestão rural.

Meta estratégica: Qualificar de forma contínua os produtores e colaboradores vinculados à SMAGRO, com a oferta mínima de 4 cursos técnicos por ano até 2026, voltados à operação de máquinas, manejo sustentável, produção e gestão rural.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.

Meta estratégica: Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Instalar ao menos 2 unidades estratégicas de infraestrutura para o agronegócio, como frigoríficos, visando a geração de emprego.

Meta estratégica: Instalar ao menos 2 unidades estratégicas de infraestrutura para o agronegócio, como frigoríficos, visando a geração de emprego.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa de Desenvolvimento Setorial e Inovação: Ação de Parcerias Institucionais, Eventos Setoriais e Incentivo ao Desenvolvimento do Setor.

Meta estratégica: Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 4 encontros técnicos por ano e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar o Programa Zeladoria Rural

Meta estratégica: Atender 100% dos pontos identificados no levantamento de demandas de limpeza na zona rural, garantindo a manutenção adequada dos espaços, a preservação ambiental e a melhoria das condições de uso das áreas atendidas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Alimento Seguro: Desenvolver materiais didáticos e informativos claros sobre os requisitos legais, melhores práticas de higiene e segurança alimentar, facilitando o entendimento e a adequação por parte dos empresários.

Meta estratégica: Promover a orientação de 35% dos estabelecimentos registrados, visando à diminuição das autuações decorrentes de infrações sanitárias.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa de vacinação de Bezerros: Promover a vacinação de 700 bezerras contra a Brucelose.

Meta estratégica: Promover a vacinação contra Brucelose em bezerras, alcançando um aumento de 10% no número de animais vacinados em relação ao ano anterior.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa AgroIndústria Forte: Impulsionar o desenvolvimento e a expansão do agronegócio, das indústrias e das agroindústrias locais, apoiando a criação e regularização ambiental e sanitária, incentivo à inovação produtiva e ampliação do acesso a novos mercados

Meta estratégica: Promover a criação, regularização ou fortalecimento de, no mínimo, 10 empreendimentos do setor agropecuário, industrial ou agroindustrial, incentivando a geração de empregos, a formalização e o desenvolvimento econômico local.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar o VTN (Valor da Terra Nua) em 14%.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer e aprimorar o canal de informações ao cidadão (SIM), com foco na adoção de indicadores de atendimento

Meta estratégica: Otimização de 100% dos processo de atendimento ao público.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Contrato(s) mais eficiente e seguro de contratação de agência de publicidade para prestação de serviço a SECOM.

Meta estratégica: Alteração no modelo de licitação de publicidade visando o aumento da produtividade de pelo menos 25%.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Adequação da estrutura/ organograma da SECOM para atendimento das demandas do municipio e gestão dos contratos de publicidade.

Meta estratégica: Alteração no modelo de licitação de publicidade visando o aumento da produtividade de pelo menos 25%.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Qualificação dos espaços próprios de comunicação (espaços públicos, websites,rede sociais).

Meta estratégica: Reestruturação de 100% dos canais de comunicação.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Continuar o Plano Municipal de Integridade e aprimorá-lo com a realização da 2a edição.

Meta estratégica: Atingir a aderência de 100% referente aos eixos do Programa de Integridade';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o Prêmio de Integridade para Servidor, valorizando e premiando ações e ideias para melhor uso do dinheiro público

Meta estratégica: Adesão de 50% dos CIGPs dos órgãos e entidades municipais.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer a auditoria interna, oferecendo apoio e ações preventivas aos gestores além da fiscalização

Meta estratégica: Promover 04 ações de capacitação em gestão e fiscalização contratual, visando aprimorar o conhecimento dos servidores e a qualidade da execução dos contratos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprimorar ações de prevenção, remediação e combate à corrupção, fortalecendo o Programa Municipal de Governança e Compliance

Meta estratégica: Realização de 02 eventos/capacitações com os servidores municipais';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprimoramento/Revisão do processo de Ouvidoria

Meta estratégica: Publicação de um ato normativo de atualização ao Decreto nº 18.810/2020 que regulamenta a organização e o funcionamento da Ouvidoria do Município';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Planejar a 1ª Semana da Integridade e Transparência - Realização da II Corrida da Integridade - Entrega do Prêmio "Mandou bem" - Realização do IV Fórum de Governança Pública - Realização de Oficinas e Palestras

Meta estratégica: Ampliar o alcance de servidores em 50% na adesão ao evento "Semana da Integridade e Transparência"';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Novo sistema eSIC e capacitação dos agentes LAI

Meta estratégica: Automatizar e implantar um sistema para o processo de acesso à informação';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Coordenação das ações contínuas para atendimento aos critérios de avaliação da transparência - PNTP, EBT, Transparência Internacional - Ação contínua de monitoramento das Cartas de Serviços

Meta estratégica: Manutenção dos 95,9% de pontuação no PNTP (Selo Diamante)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Regulamentação da Avaliação dos Programas de Integridade no âmbito da Lei nº 14.133/2021 - Lei de Licitações e contratos administrativos

Meta estratégica: Realização da primeira avaliação de um Programa de Integridade apresentado por empresa contratada';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Subsidiar tecnicamente as Secretarias / entidades quanto à implantação de mecanismos formais de avaliação da qualidade dos serviços públicos.

Meta estratégica: Avaliação de 100% dos Serviços Públicos';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação do "Projeto Ouvidor Mirim nas Escolas Municipais" Outubro dia das crianças. Implantação do "Projeto de Acolhimento e Proteção ao Denunciante"

Meta estratégica: Realização 06 de eventos com alunos das escolas municipais.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Integração da gestão de riscos com o processo de planejamento de auditoria interna

Meta estratégica: Implantação da gestão de riscos estratégicos em 100% das Secretarias';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Transparência em Pauta: Coordenação das ações contínuas para atendimento aos critérios de avaliação da transparência - PNTP, EBT, Transparência Internacional.

Meta estratégica: Atender pelo menos 95% dos critérios de avaliação do PNTP (Programa Nacional de Transparência Pública), com objetivo de manter o Selo Diamante de avaliação.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Ouvidoria Estratégica: Consolidar a Ouvidoria como órgão estratégico da gestão.

Meta estratégica: Apresentar 12 relatórios à Alta Administração no ano de 2026: "Relatório Mensal de Ouvidoria"';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Carta de Serviços Atualizada: Ação contínua de monitoramento, buscando assegurar transparência, atualização e aderência das Cartas de Serviços à realidade dos serviços públicos prestados ao cidadão.

Meta estratégica: Monitorar e avaliar a conformidade, atualização e clareza das Cartas de serviços das 27 secretarias / entidades.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação do "Projeto de Acolhimento e Proteção ao Denunciante" (Ações educativas institucionais)

Meta estratégica: Participação (palestra) em 02 de eventos (CIPA e SIPAT).';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar ações do Plano Decenal de Cultura, estabelecido por meio de conferências de cultura com participação da sociedade e classe artística.

Meta estratégica: Garantir a execução de, no mínimo, 15% das metas do Plano Municipal de Cultura 2024–2033 até 2028, mediante priorização formal e início da execução das ações previstas.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar ações de promoção cultural e artística por meio do PMIC

Meta estratégica: Ampliar o fomento à produção cultural, aumentando em até 20% o apoio financeiro a projetos culturais locais até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir as obras e colocar em funcionamento o Teatro Grande Otelo

Meta estratégica: Colocar em funcionamento o Teatro Municipal Grande Otelo até 2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar novas unidades do CEU para atividades artísticas e culturais para crianças, jovens e comunidade

Meta estratégica: Implantar pelo menos 2 novas unidades do Centro de Artes e Esportes Unificados (CEUs) até 2029, ampliando a infraestrutura cultural nas regiões de maior vulnerabilidade.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar acesso da classe artística a recursos de fomento cultural.

Meta estratégica: Ampliar o fomento à produção cultural, aumentando em até 20% o apoio financeiro a projetos culturais locais até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar acesso de produtores culturais e artistas de Uberlândia aos espaços de exposição, salas de exibição, teatros e arenas culturais do município.

Meta estratégica: Colocar em funcionamento o Teatro Municipal Grande Otelo até 2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Manter e aprimorar o programa de preservação do patrimônio histórico municipal

Meta estratégica: Promover a preservação de 70% do acervo de bens oficialmente protegidos no Município até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar apoio a eventos e festividades culturais do município, com destaque para atividades populares como Congado, Carnaval, Festival de Dança, Folia de Reis, festas juninas, outras.

Meta estratégica: Ampliar em 20% as ações dos Programas "Cidade da Música", "Cultura na Comunidade" e do Programa de Apoio a Comunidade';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar apoio para eventos e ações de fomento ao comércio de artigos de artesanato ou similares, como Feiras de Cultura e Mercado de Pulgas

Meta estratégica: Ampliar em 10% as ações de valorização da cultura urbana e artesanato.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar ações de fomento e promoção cultural nos bairros, com Ônibus Biblioteca, Palco Móvel e Oficinas Culturais, valorizando artistas de cada local

Meta estratégica: Garantir descentralização e itinerância de ações culturais em pelo menos 60% das regiões do Município, incluindo Zona Rural e Distritos até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar ações culturais e de fomento de cultura urbana para bairros, loteamentos, assentamentos ou regiões sem espaços culturais fixos, promovendo a diversidade artística e cultural

Meta estratégica: Garantir descentralização e itinerância de ações culturais em pelo menos 60% das regiões do Município, incluindo Zona Rural e Distritos até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fomento ao Turismo de Negócios com apoio para a realização de eventos, integrado com ações de fomento ao Turismo Cultural, valorizando espaços culturais e patrimônios históricos da cidade

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprimorar a sinalização turística da cidade.

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Equipar 50% dos equipamentos culturais da SMCT com recursos de acessibilidade (infraestrutura física e comunicacional) até 2028

Meta estratégica: Promover a acessibilidade universal na cultura com ações em no minimo 50% dos equipamentos culturais administrados pela SMCT';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Instalar placas informativas bilíngues e outros dispositivos de interpretação do patrimônio, conforme diretriz de aprimorar a sinalização turística da cidade.

Meta estratégica: Instalar sinalização histórica e turística padronizada em pelo menos 100% dos bens tombados até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Integrar sinalização patrimonial à sinalização turística com recursos de acessibilidade.

Meta estratégica: Instalar sinalização histórica e turística padronizada em pelo menos 100% dos bens tombados até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar o mapeamento de atrativos naturais e rurais e a formação de roteiros integrados

Meta estratégica: Promoção do Turismo Rural e Ecoturismo através do mapeamento dos atrativos naturais do Municpio e desenvolvimento de no mínimo 3 roteiros turisticos até 2028';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver, até 2028, 3 (três) roteiros oficiais de turismo que promovam a valorização e divulgação dos atrativos naturais, culturais e patrimoniais urbanos e rurais do Município.

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover ações específicas para profissionalização em arte digital, audiovisual e jogos eletrônicos.

Meta estratégica: Promover no mínimo 4 capacitações em arte digital até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Contratar empresa de tecnologia para desenvolver a plataforma de dados turísticos.

Meta estratégica: Implantar programa de monitoramento de dados turísticos até 2027';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Contratar empresa de tecnologia para desenvolver a plataforma de mapeamento de dados culturais do Município,

Meta estratégica: Implantar a plataforma de mapeamento de dados culturais do Município, pela qual serão mapeados agentes, espaços culturais, projetos e eventos culturais até 2027';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Expandir em 30% o apoio e incentivo à realização de feiras de negócios, eventos culturais e esportivos de alcance nacional, assegurando o apoio a, no mínimo, 26 atividades até 2028, com vistas a consolidar Uberlândia no circuito nacional de grandes eventos.

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promoção contínua e eventos âncora através da realização de pelo menos 4 eventos promocionais de grande relevância por ano até 2028.

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar a marca de Uberlândia e desenvolver campanhas permanentes de promoção turística do Município, com identidade visual própria.

Meta estratégica: Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover e apoiar cursos para agentes turisticos e guias locais

Meta estratégica: Capacitar e certificar no minimo 200 agentes turísticos e guias locais até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 20% as ações do Programa de Promoção de Ações Afirmativas em Prol da Comunidade Afro

Meta estratégica: Ampliar em 20% as ações do Programa de Promoção de Ações Afirmativas em Prol da Comunidade Afro';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar anualmente pelo menos 1 evento específico de cultura urbana (como festival de hip-hop ou encontro de arte de rua

Meta estratégica: Ampliar em 10% as ações de valorização da cultura urbana e artesanato.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 20% as ações dos Programas "Cidade da Música", "Cultura na Comunidade" e do Programa de Apoio a Comunidade

Meta estratégica: Ampliar em 20% as ações dos Programas "Cidade da Música", "Cultura na Comunidade" e do Programa de Apoio a Comunidade';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar o público participante das atividades do programa “Ler com Prazer” até 2028, tomando como referência a média anual de participantes em 2025

Meta estratégica: Expandir ações do Programa Ler com Prazer, ampliando em até 30% o público beneficiado';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elevar em 30% o número anual de empréstimos de livros nas 3 bibliotecas públicas municipais até 2028, por meio de acervo atualizado e ações de incentivo à leitura.

Meta estratégica: Expandir ações do Programa Ler com Prazer, ampliando em até 30% o público beneficiado';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar ao menos 20 oficinas culturais de formação por ano a partir de 2026, atendendo a no mínimo 300 participantes por ano em cursos de qualificação artística e técnica para comunidade e agentes culturais

Meta estratégica: Ampliação da capacitação cultural através da implementação de ações do Programa Qualificando Saberes, beneficiando pelo menos 300 pessoas anualmente';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir a restauração do Conjunto Ferroviário de Sobradinho até 2026, transformando-o em espaço público de cultura e memória após as etapas finais de recuperação

Meta estratégica: Promover a preservação de 70% do acervo de bens oficialmente protegidos no Município até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar intervenções de restauro/manutenção em pelo menos 2 bens tombados por ano

Meta estratégica: Promover a preservação de 70% do acervo de bens oficialmente protegidos no Município até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar ações de Educação Patrimonial do Programa de Preservação do Patrimônio Histórico e Cultural, alcançando pelo menos 1.000 alunos da rede pública por ano

Meta estratégica: Implementar ações de Educação Patrimonial do Programa de Preservação do Patrimônio Histórico e Cultural, alcançando pelo menos 1.000 alunos da rede pública por ano';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar 7 escolas em construção nos bairros São Jorge, Shopping Park, Jardim das Hortênsias, Santo Antônio, Sucupira e Canaã

Meta estratégica: Construção e reformas de prédios públicos, atendendo as demandas das Secretarias envolvidas com saúde, educação e assistência social, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar Escola de Tempo Integral nas novas unidades de Ensino Fundamental em construção no Shopping Park e Canaã.

Meta estratégica: Implantar 3 Escolas de tempo integral de ensino fundamental até 2028.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Avançar com o Programa ESCOLA BEM ARRUMADA com obras de reforma e modernização em escolas nas áreas urbana e rural.

Meta estratégica: Proporcionar ambiente mais propício para a aprendizagem em 100% das unidades escolares municipais até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Mais tecnologia na escola: ampliar o DIGITANDO O FUTURO e os Centros de Tecnologia e Robótica na rede urbana e rural.

Meta estratégica: Promover políticas de inclusão e redução das desigualdades sociais e étnico raciais com ações que reflitam na melhoria (qualquer %) no desempenho dos estudantes para assegurar a condicionalidade 3 do VAAR até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver, por meio do CEMEPE, ações de capacitação de professores e aprimorar métodos de aprendizagem cada vez mais atrativos, interativos e inclusivos para crianças e jovens.

Meta estratégica: Criar e implantar pelo menos 2 trilhas de conhecimento para capacitar os Servidores em temas relevantes com o foco em melhorar os processos internos, alcançando mínimo de 70% do público alvo até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Abrir o diálogo com as Universidades/Professores para viabilizar temas pertinentes à administração pública.

Meta estratégica: Criar parcerias com as universidades para fomentar o conhecimento com o objetivo de contribuir com os desafios da adm pública (TCC e Teses) em pelo menos 50 projetos iniciados até 2027.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar 9 EMEIs até até 2028

Meta estratégica: Implantar 9 EMEIs até até 2028.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'ConectEdu, Provara (formação e valorização)

Meta estratégica: Atingir a meta (7.0 para anos iniciais e 6,5 para anos finais) do IDEB prevista para a rede municipal até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ofertar atendimento integrado a pelo menos 200 estudantes das escolas Hilda Leão e Boa Vista em contraturno nos Naicas Morumbi e Tocantins até o final de 2025.

Meta estratégica: Estruturar modelo de atendimento integrado às crianças das escolas de tempo integral em atividades que envolvam as secretarias de Educação, FUTEL, Desenvolvimento Social e Cultura.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estruturar Projeto de Integração das Secretarias para fomentar o esporte

Meta estratégica: Aumentar a frequência no parque e poliesportivos até 2027.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar do Observatório do Mercado Imobiliário, integrando ferramentas já disponíveis; como ortofoto por georeferenciamento, planta genérica de valores, geração de laudos, simulação de valores imobiliários, entre outros.

Meta estratégica: Implantar do Observatório do Mercado Imobiliário, integrando ferramentas já disponíveis; como ortofoto por georeferenciamento, planta genérica de valores, geração de laudos, simulação de valores imobiliários, entre outros.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = '1- Resolução de Boas Práticas da Fiscalização 2- Estruturação da Gestão Tributária, a partir de implantação de instrumentos de inteligência tributária, fiscalização educativa, integração de sistemas e monitoramento de resultados.

Meta estratégica: Estruturação da Gestão Tributária, a partir de implantação de instrumentos de inteligência tributária, fiscalização educativa, integração de sistemas e monitoramento de resultados.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Acompanhar e cumprir as alterações do ISSQN/IBS conforme cronograma da Reforma Tributária.

Meta estratégica: Acompanhar e cumprir as alterações do ISSQN/IBS conforme cronograma da Reforma Tributária.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Proporcionar acesso ao contribuinte, dos meios de pagamento disponíveis na Rede Bancária; como PIX, CHEKOUT e outros,para todos os fatos geradores.

Meta estratégica: Proporcionar acesso ao contribuinte, dos meios de pagamento disponíveis na Rede Bancária; como PIX, CHEKOUT e outros,para todos os fatos geradores.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Concluir melhorias sistema Web Demonstrativos Fiscais

Meta estratégica: Concluir melhorias sistema Web Demonstrativos Fiscais';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reunir com as equipes da Educação para criação do jogo “contabilidade nas escolas” buscando apresentar a contabilidade, transparência e educação financeira aos alunos do último ano do Ensino Fundamental e aplicá-lo nas escolas municipais

Meta estratégica: Implantar o Programa de Educação Financeira nas instituições de Ensino.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar a automação da Conciliação Bancária; possibilitando conferência digital entre extratos bancários e relatórios contábeis; porporcionando rapidez, segurança e precisão na apuração dos saldos bancários.

Meta estratégica: Implantar a automação da Conciliação Bancária; possibilitando conferência digital entre extratos bancários e relatórios contábeis; porporcionando rapidez, segurança e precisão na apuração dos saldos bancários.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Revisar e atualizar o Código Tributário e taxas Municipais, conforme os fundamentos da Reforma Tributária, EC 132/2023.

Meta estratégica: Revisar e atualizar o Código Tributário e taxas Municipais, conforme os fundamentos da Reforma Tributária, EC 132/2023.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar anualmente o evento “Seminário do Triângulo Mineiro de Contabilidade, Custos e Governança" em conjunto com o CRC, CFC, AMM e AMCP

Meta estratégica: Promover a capacitação anual de no mínimo 100 servidores de Uberlândia e municípios da região nos princípios contábeis, de custos e de governança, consolidando o papel de Uberlândia como polo de integração e desenvolvimento regional.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Firmar acordo de cooperação com o Programa de Pós Graduação em Ciências Contábeis da Universidade Federal de Uberlândia para realização conjunta de estudos contábeis na Prefeitura Municipal de Uberlândia definindo os escopos de atuação.

Meta estratégica: Implantar o Programa de Educação Financeira nas instituições de Ensino.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaboração de relatórios e adequação das peças contábeis de forma lúdica para apresentar aos cidadãos os resultados de forma mais simplificada

Meta estratégica: Ampliar o acesso à informação pública e a transparência ativa e passiva facilitando a participação cidadã por meio de 10 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Melhorar as ferramentas dos painéis de informações do portal de transparência, com apresentação de dashboards mais dinâmicos, definindo novo padrão de transparência, com a posterior implantação completa da inteligência artificial MarIA

Meta estratégica: Ampliar o acesso à informação pública e a transparência ativa e passiva facilitando a participação cidadã por meio de 10 ações estratégicas.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o sistema e Custos para apuração dos custos de serviços aplicados. Criar a diretoria de gestão de custos no município

Meta estratégica: Ampliar o acesso à informação pública e a transparência ativa e passiva facilitando a participação cidadã por meio de 10 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Evolução no “Ranking da Qualidade da Informação Contábil no Siconfi” da Secretaria do Tesouro Nacional (STN) do nível B para nível A

Meta estratégica: Posicionar Uberlândia entre os 10 primeiros lugares do "Ranking da Qualidade da Informação Contábil" no Siconfi” da Secretaria do Tesouro Nacional (STN)';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Adequar as informações contábeis, orçamentárias e financeiras, além dos sistemas estruturantes para melhoria da qualidade da informação, refletindo nos registros contábeis, atendendo as normas vigentes, implantando registros concomitantes nos sistemas estruturantes

Meta estratégica: Posicionar Uberlândia entre os 10 primeiros lugares do "Ranking da Qualidade da Informação Contábil" no Siconfi” da Secretaria do Tesouro Nacional (STN)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Revisar a composição dos Fatos Geradores municipais; impostos e taxas

Meta estratégica: Revisar a composição dos Fatos Geradores municipais; impostos e taxas';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar Sistema de comunicação Pessoa Física -"e-CAC-UDI", similiar ao domicilio Eletrônico do Contribuinte (Pessoa Jurídica).

Meta estratégica: Reduzir o tempo de processo de comunicação com o contribuinte em aproximadamente 25 dias, impactando positivamente no processo de arrecadação.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Securitização de 100% da carteira de recebíveis de Uberlândia até 2026. A meta proposta depende de estudos e análises

Meta estratégica: Securitização de 100% da carteira de recebíveis de Uberlândia até 2026. A meta proposta depende de estudos e análises';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atingir o CAPAG B até Dezembro de 2026

Meta estratégica: Atingir o CAPAG B até Dezembro de 2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa PGV- PLANTA GENERICA DE VALORES: Aumentar a receita do IPTU E ITBI atualizando a base de arrecadacao e incrementar através de acoes do bom pagador

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa Régua de Cobrança: Estruturar cobrança administrativa mais efetiva

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar e Desenvolver Sistema para apuração ISS Construção, de acordo com a legislação, a fim de argilizar o processo de apuração do referido Tributo.

Meta estratégica: Desenvolver e implantar um sistema para apuração do ISS da Construção Civil, de acordo com a legislação vigente, com o objetivo de agilizar o processo de apuração do referido tributo e contribuir para o aumento da arrecadação em 10% até o final de 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aprimorar a implantação do programa MÃOS QUE UNEM com tradução simultânea para surdos e mudos dentro de espaços públicos

Meta estratégica: Ampliar em 50% o acesso ao programa de tradução simultânea para surdos e mudos nos espaços públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 50% as adesões formais e a participação efetivado do Município em colegiados, entidades intermunicipais e instâncias federativas, fortalecendo sua inserção institucional e acesso a políticas públicas intergovernamentais.

Meta estratégica: Ampliar em 50% as adesões formais e a participação efetivado do Município em colegiados, entidades intermunicipais e instâncias federativas, fortalecendo sua inserção institucional e acesso a políticas públicas intergovernamentais.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Gerir os contratos de Tecnologia da Informação e Comunicação da Prefeitura de Uberlândia, garantindo disponibilidade, segurança e suporte aos sistemas corporativos, com índice geral de desempenho dos serviços ≥ 99%, assegurando a continuidade dos serviços públicos.

Meta estratégica: Gerir os contratos de Tecnologia da Informação e Comunicação da Prefeitura de Uberlândia, garantindo disponibilidade, segurança e suporte aos sistemas corporativos, com índice geral de desempenho dos serviços ≥ 99%, assegurando a continuidade dos serviços públicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Garantir 100% do Processo de Atendimento a Comunidade direcionando as demandas para as Secretarias responsáveis e dando conhecimento do andamento do Processo ao cidadão.

Meta estratégica: Garantir 100% do Processo de Atendimento a Comunidade direcionando as demandas para as Secretarias responsáveis e dando conhecimento do andamento do Processo ao cidadão.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar e consolidar, até o final de 2026, um processo contínuo de escuta ativa e diálogo estruturado com 90% dos setores territoriais definidos, integrando as demandas comunitárias mapeadas ao planejamento das políticas públicas.

Meta estratégica: Implantar e consolidar, até o final de 2026, um processo contínuo de escuta ativa e diálogo estruturado com 90% dos setores territoriais definidos, integrando as demandas comunitárias mapeadas ao planejamento das políticas públicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Manter em 100% o nível de conformidade documental e cadastral do Município nas plataformas de habilitação para transferências voluntárias.

Meta estratégica: Manter em 100% o nível de conformidade documental e cadastral do Município nas plataformas de habilitação para transferências voluntárias.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaborar propostas e acompanhar sua execução junto as Secretarias finalisticas, assegurando que 100% dos convênios e emendas estejam com documentação e execução fisico-financeira adequada, conforme os parâmetros estabelecidos pelos órgãos concedentes.

Meta estratégica: Elaborar propostas e acompanhar sua execução junto as Secretarias finalisticas, assegurando que 100% dos convênios e emendas estejam com documentação e execução fisico-financeira adequada, conforme os parâmetros estabelecidos pelos órgãos concedentes.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver até 2027 métodos de acompanhamento que auxiliem no controle da manutenção da frota municipal e elevem a eficiência operacional, por meio da execução sistemática das manutenções preventivas, redução de retrabalhos e aumento da disponibilidade dos veículos.

Meta estratégica: Desenvolver até 2027 métodos de acompanhamento que auxiliem no controle da manutenção da frota municipal e elevem a eficiência operacional, por meio da execução sistemática das manutenções preventivas, redução de retrabalhos e aumento da disponibilidade dos veículos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudar formas legais de uso de recursos viculados para toda prefeitura

Meta estratégica: É necessário criar nova META do Planejamento Estratégico e incluí-la nesse campo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Prefeitura Zero Carbono: ampliar as ações da Prefeitura de Uberlândia para redução da emissões de carbono, contabilizando programas do município que gerem créditos de carbono

Meta estratégica: Realizar 1 inventário de emissão de gases de efeito estufa (GEE) no âmbito da Administração Pública Municipal.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o Plano Municipal de Arborização

Meta estratégica: Implementar o Plano de Arborização Urbana como política de proteção, controle e conservação do meio ambiente, visando adensar as áreas verdes nos espaços públicos.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar o Selo Municipal de Sustentabilidade (Selo Verde), promovendo iniciativas de pessoas físicas e jurídicas que desenvolvam ações voltadas ao meio ambiente

Meta estratégica: Realizar primeiro ciclo de certificação de "Selo Uberlândia Mais Sustentável".';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Instituir o Selo Estabelecimento Amigo do Animal, promovendo o acesso de pets em locais públicos e privados

Meta estratégica: Realizar primeiro ciclo de certificação de "Selo Pet" em Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Firmar convênio com o Estado de Minas Gerais, por meio da Secretaria de Estado de Meio Ambiente e Desenvolvimento Sustentável.

Meta estratégica: Assumir 2 novas classes de licenciamento ambiental para empreendimentos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar 2 eventos com foco em sustentabilidade.

Meta estratégica: Realizar 2 eventos com foco em sustentabilidade.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Apoiar startups verdes, que apresentem alternativas às problemáticas apresentadas.

Meta estratégica: Identificar, por meio da realização de 1 hackathon a cada ano, soluções para desafios ambientais no âmbito do Município de Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 50% a participação em programas de educação ambiental no Município.

Meta estratégica: Ampliar em 50% a participação em programas de educação ambiental no Município.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Articular junto às demais pastas envolvidas, outros órgãos afins e sociedade civil organizada, para integração, normatização e ampliação das ações desenvolvidas e/ou a serem desenvolvidas para o cuidado e saúde animal.

Meta estratégica: Criar o Programa Municipal Integrado de Bem Estar Animal de Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar um sistema de indicadores ambientais públicos do Município de Uberlândia.

Meta estratégica: Implantar um sistema de indicadores ambientais públicos do Município de Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Proporcionar, pelo menos, 3 capacitações e atualizações aos servidores públicos que atuam na Secretaria.

Meta estratégica: Proporcionar, pelo menos, 3 capacitações e atualizações aos servidores públicos que atuam na Secretaria.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver, em parceria e articulação com outras pastas competentes, o Programa de Eficiência na Irrigação, voltado aos produtores rurais de Uberlândia, de forma a promover o uso sustentável dos recursos hídricos.

Meta estratégica: Alcançar 20% dos irrigantes atráves do programa voltado à eficiência da irrigação em propriedades rurais do Município de Uberlândia.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolver e apoiar 3 projetos de recuperação de áreas de preservação permanente degradadas em área urbana e rural.

Meta estratégica: Desenvolver e apoiar 3 projetos de recuperação de áreas de preservação permanente degradadas em área urbana e rural.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Criar o Programa Municipal Integrado para monitoramento e melhoria da qualidade do ar e da diminuição de ruídos.

Meta estratégica: Criar o Programa Municipal Integrado para monitoramento e melhoria da qualidade do ar e da diminuição de ruídos.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaborar, orçar, validar propostas e disponibilizar 20 projetos de arquitetura e paisagismo para implantação e contemplação dos espaços públicos, como praças e parques, visando a execução quando da disponibilidade financeira.

Meta estratégica: Elaborar, orçar, validar propostas e disponibilizar 20 projetos de arquitetura e paisagismo para implantação e contemplação dos espaços públicos, como praças e parques, visando a execução quando da disponibilidade financeira.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaboração e aprovação interna do Plano de desmobilização do Zoo.

Meta estratégica: Identificar novo(s) ambiente(s) adequado(s) para transferência de 100% da fauna do Zoológico Municipal (Zoo).';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer a Escola de Governo com mais ações de qualificação dos servidores municipais por meio de cursos, palestras e treinamentos

Meta estratégica: Ampliar e fortalecer as ações da Escola de Governo, para qualificar a atuação dos servidores em cargo de gestão em pelo menos 3 Áreas de Conhecimento, utilizando ferramenta de LMS.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Preparar a PMU para utilizar a metodologia BIM em 100% dos projetos de construção civil.

Meta estratégica: Preparar a PMU para utilizar a metodologia BIM em 100% dos projetos de construção civil.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ser referência no uso de IA no setor público através da implantação de um Centro de Gestão e Estudos Estratégicos, conforme MCTI - PBIA 2024-2028

Meta estratégica: Ser referência no uso de IA no setor público através da implantação de um Centro de Gestão e Estudos Estratégicos, conforme MCTI - PBIA 2024-2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Promover a Governança de Dados conforme a Lei Geral de Proteção de Dados Pessoais (LGPD) por meio de 3 ações estratégicas.

Meta estratégica: Promover a Governança de Dados conforme a Lei Geral de Proteção de Dados Pessoais (LGPD) por meio de 3 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar e Manter o Planejamento Estratégico de forma sistêmica por meio de 5 ações estratégicas.

Meta estratégica: Implantar e Manter o Planejamento Estratégico de forma sistêmica por meio de 5 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Facilitar o acesso à informação, ampliar a transparência e fortalecer integração entre as Secretarias e Orgãos de Autarquia por meio de 5 ações estratégicas.

Meta estratégica: Facilitar o acesso à informação, ampliar a transparência e fortalecer integração entre as Secretarias e Orgãos de Autarquia por meio de 5 ações estratégicas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elevar o nível de maturidade em gerenciamento de projetos da prefeitura e autarquias até dez/2027

Meta estratégica: Elevar o nível de maturidade em gerenciamento de projetos da prefeitura e autarquias até dez/2027';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar ferramenta de workflow e automatizar os processos core da prefeitura até dez 2028

Meta estratégica: Implantar ferramenta de workflow e automatizar os processos core da prefeitura até dez 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Automatização no processo de acompanhamento dos indicadores da APS

Meta estratégica: Automatizar o processo de acompanhamento dos indicadores de desempenho da Atenção Primária à Saúde (APS), reduzindo o tempo necessário para sua execução em 83% até dezembro de 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Programa diabetes - Implantar um Programa Municipal de Monitoramento Contínuo da Glicose, por meio do uso do dispositivo FreeStyle Libre, destinado a crianças e adolescentes com Diabetes Mellitus Tipo 1, na faixa etária de 07 a 12 anos, garantindo acompanhamento qualificado, integral e humanizado

Meta estratégica: Desenvolver 12 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Receituário eletrônico

Meta estratégica: Implementar o receituário eletrônico em X unidades de saúde até o final de 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estabelecer parceria com pelo menos duas instituições de ensino (pública ou privada) para desenvolver projetos que gerem soluções aplicáveis às necessidades do município através de TCCs e/ou TESES de Mestrado ou Doutorado.

Meta estratégica: Estabelecer parceria com pelo menos com duas instituições de ensino (pública ou privada) para desenvolver projetos que gerem soluções aplicáveis às necessidades do município através de TCCs e/ou TESES de Mestrado ou Doutorado.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estabelecer Arquitetura de Inteligência de Dados da PMU viabilizando DW´s, Datalake´s e IAs por meio de 3 ações estratégicas.

Meta estratégica: Estabelecer Arquitetura de Inteligência de Dados da PMU viabilizando DW´s, Datalake´s e IAs por meio de 3 ações estratégicas.';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Apoiar e estimular a construção de moradia para milhares de famílias por meio de parcerias com a iniciativa privada ou programas habitacionais dos governos estadual e federal

Meta estratégica: Contratar 10 mil moradias nos próximos 4 anos';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar programa de regularização fundiária no Município, objetivando a regularização das ocupações atuais e promovendo ações para evitar novas ocupações. 1. Lei Politica Habitacional (Habita+) 2. Leis Regularização e Reurb-S - Publicado 781/2025 // 790/2025 - Lei (outras áreas irregulares) (REGULARIZA FACIL) 3. Contratar empresa REURB-S; 4. Criar contrato (proc. licitação) backup para próximas regularizações (próximos anos); 5. Iniciar P.A. (ocupações recebidas da SEPLAN); 5.1. Executar a REURB-S com empresa terceira e tb pela SMH; 6. Criar RITO operacional para REURB-S (Padronizar); 7. Executar levantamento com (outras) áreas para regularização; 8. Lei autorizando REURB-S (para as ""outras"" áreas); 9. Atas/licitações - Projetos, Levantamento Social;

Meta estratégica: Regularizar 7 mil moradias nos próximos 4 anos';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar a transparência dos serviços prestados aos Cidadãos através da disponibilização de serviços digitais.

Meta estratégica: Otimização e Automação de 100% dos Processos Internos do Cadastro Habitacional.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Maximizar a captação de recursos estaduais e federais por meio da submissão de propostas aderentes a todos os programas disponíveis, fortalecendo a capacidade de investimento do município.

Meta estratégica: Enviar propostas, para 100% dos programas disponíveis, conforme análise de viabilidade para o munícipio, via União e Estado até 2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realocação da sede física da Secretaria Municipal da Juventude para novo endereço (Análise já em andamento com o Sec. Governo e com a Sec. Desenvolvimento Social)

Meta estratégica: Estabelecer uma nova Sede da Secretaria Municipal da Juventude';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Beneficiar e desenvolver jovens que estejam cursando ensino superior ou técnico, com a contratação de 95% das vagas ofertadas de estágio.

Meta estratégica: Beneficiar e desenvolver jovens que estejam cursando ensino superior ou técnico, com a contratação de 95% das vagas ofertadas de estágio.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Desenvolvimento pessoal e familiar do estagiário, atingir um indice de desenvolvimento pessoal de 80%

Meta estratégica: Desenvolvimento pessoal e familiar do estagiário, atingir um indice de desenvolvimento pessoal de 80%';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Inserir estagiários no mercado de trabalho ao finalizar o programa de estágios, com uma taxa de empregabilidade de 70%.

Meta estratégica: Inserir estagiários no mercado de trabalho ao finalizar o programa de estágios, com uma taxa de empregabilidade de 70%.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar o 11° Congresso Municipal da Juventude

Meta estratégica: Realizar o 11° Congresso Municipal da Juventude';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar o 1º Aulão do ENEM da Juventude

Meta estratégica: Realizar o 1º Aulão do ENEM da Juventude';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atingir o número de 4000 alunos atendidos pelo programa JuventUDI em Foco.

Meta estratégica: Atingir o número de 4000 alunos atendidos pelo programa JuventUDI em Foco.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar a 1ª Semana da Juventude 2025

Meta estratégica: Realizar a 1ª Semana da Juventude para servidores de até 30 anos';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implementar o Programa da Prefeitura de Intercâmbio de Lingua Inglesa para Jovens

Meta estratégica: Implementar o Programa da Prefeitura de Intercâmbio de Lingua Inglesa para Jovens';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar 1° maratona municipal de programação da Prefeitura de Uberlândia

Meta estratégica: Realizar 1° maratona municipal de programação da Prefeitura de Uberlândia';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Busca de parceiros que possam fornecer benefícios para os estagiários do programa JUVENTUDI e para os servidores da Prefeitura de Uberlândia.

Meta estratégica: Criar o Programa Clube de Benefícios (Para estagiários e servidores da Prefeitura de Uberlândia)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar o 2º Aulão do ENEM da Juventude

Meta estratégica: Realizar o 2º Aulão do ENEM da Juventude';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar ações do Programa JuventUDI em Foco.

Meta estratégica: Atingir o número de 4000 alunos atendidos pelo programa JuventUDI em Foco.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar Semana da Juventude 2026

Meta estratégica: Realizar Semana da Juventude 2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Venda do Naming Rights e dos espaços de Stands do Congresso da Juventude

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Estudo financeiro para viabilizar o pagamento das bolsas de estágio via parceiros (Gov Mg, Sebrae, Empresas Privadas, Aciub, CDL, etc)

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar e estruturar a Central de Conciliação

Meta estratégica: Implantar Central de Conciliação com o foco em redução 5% das judicializações dos casos de indenização contra o Município.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Arrecadar 10% do estoque de Dívida Ativa

Meta estratégica: Arrecadar 10% do estoque de Dívida Ativa';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Reduzir para 80% o índice de não recebiveis da Dívida Ativa.

Meta estratégica: Reduzir para 80% o índice de não recebiveis da Dívida Ativa.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Integração dos Sistemas da PRODAUB (SIAT e eDocs) com EGPJ

Meta estratégica: Integrar os Sistemas da PRODAUB (SIAT e eDocs) com EGPJ com o foco em: 1- Aumentar a produtividade em 40% 2- Reduzir o tempo de análise 40%';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar a cobrança via canais digitais (SMS e WhatsApp)

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Classificação de grupos econômicos para fins de arrecadação.

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar o CR-TEA para aumentar a capacidade de atendimento

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a realização de Mutirões de Exames e Consultas de especialistas, em parceria com a iniciativa privada

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a oferta e variedade de consultas no CEM – Centro de Especialidades Médicas, suprindo a demanda por atendimento especializado indicado na rede

Meta estratégica: Aumentar em 5%, em relação ao ano anterior, o número de consultas com especialistas ofertadas.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer ações de vacinação e imunização para completar calendário vacinal de crianças e idosos, prioritariamente.

Meta estratégica: Atingir os indices da Atenção Primária conforme Metas do Ministério da Saúde';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Vigilância Sanitária (VISA) - Construção de nova sede - bairro Tibery

Meta estratégica: Aumentar o número de inspeções sanitárias conforme o risco dos estabelecimentos para atingir o total de 70% dos estabelecimentos cadastrados inspecionados pela VISA até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atingir os indices da Atenção Primária conforme Metas do Ministério da Saúde

Meta estratégica: Aumentar anualmente 5% da cobertura da Atenção Primária no Município.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atingir indicadores hospitalares conforme Resolução 8879/2023 referente ao Programa VALORA MINAS

Meta estratégica: Reduzir o percentual de cesáreas realizadas no Hospital Municipal e HC/UFU em para menor que 30% até 12/2028.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir 10 Unidades Básicas de Saúde da Família - UBSFs funcionando em imóveis próprios até 12/2028

Meta estratégica: Construir 10 Unidades Básicas de Saúde da Família - UBSFs funcionando em imóveis próprios até 12/2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar em 5% ao ano o quantitativo de análises da qualidade da água até 12/2028.

Meta estratégica: Aumentar em 5% ao ano o quantitativo de análises da qualidade da água até 12/2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Atingir os indices da VIGILÂNCIA EM SAÚDE conforme Metas do Ministério da Saúde

Meta estratégica: Realizar visitas para eliminação do aedes aegypti em 80% do quantitativo de imóveis por ciclo (4 ciclos por ano)';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construção da sede própria do CEREST

Meta estratégica: Construir a sede própria do CEREST';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar o número de inspeções sanitárias conforme o risco dos estabelecimentos para atingir o total de 70% dos estabelecimentos cadastrados inspecionados pela VISA até

Meta estratégica: Aumentar o número de inspeções sanitárias conforme o risco dos estabelecimentos para atingir o total de 70% dos estabelecimentos cadastrados inspecionados pela VISA até 2028';
update projetos set peso = 3
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação da telemedicina até 06/2026.

Meta estratégica: Implantação da telemedicina até 06/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar a cobertura da Saúde Bucal na Atenção Primária em 2,5% ao ano até 2029.

Meta estratégica: Ampliar a cobertura da Saúde Bucal na Atenção Primária em 2,5% ao ano até 2029.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Capacitação de 50% dos profissionais da Rede para aprimoramento ao cuidado com o usúario até 12/2026.

Meta estratégica: Capacitação de 50% dos profissionais da Rede para aprimoramento ao cuidado com o usúario até 12/2026.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantação do SAMU

Meta estratégica: Expansão/Implantação SAMU 192';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Habilitações UPAs

Meta estratégica: Promover a habilitação de pelo menos 3 unidades de saúde em UPAs';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar o número de cirurgias eletivas realizadas em 5% ao ano até 12/2028

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar em 11 habilitações de atenção especialziada e hospitalar junto ao Ministério da Saúde.

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar 01 (uma) linha de cuidado ao ano ofertadas nos pontos de Atenção Especializada até 12/2028

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar em 5% ao ano a porcentagem de atendimentos coletivos realizado pela Rede de Atenção Psicossocial até 12/2028.

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar equipes de Consultório na Rua de 01 para 02 até 12/2028.

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Aumentar o valor do faturamento Hospitalar recebido do Ministério da Saúde em 8% ao ano até 12/2028.

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir CAPs AD

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir CAPS Infantojuvenil

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Construir o CER III.

Meta estratégica: Desenvolver 11 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Modernizar o sistema de alerta de segurança em áreas de risco suscetíveis a alagamentos, enxurradas e inundações, especialmente na Avenida Rondon Pacheco, utilizando painéis digitais ao longo da via, sensores para monitoramento de galerias, rios e represas, sistema de alerta com sirenes e controle por meio de câmeras com inteligência artificial.

Meta estratégica: Implemetar sistema de alerta de risco hidrológico Avenida Rondon Pacheco. (100% implementado em até 12 meses).';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o CIIS – Centro Integrado de Inteligência e Segurança, unificando em um único espaço todas as unidades de videomonitoramento, com todas as forças de segurança trabalhando em conjunto, como Defesa Civil, Proteção Patrimonial, Bombeiros, Polícia Civil, Polícia Militar, Patrulha Rural, Patrulha Ambiental. O CIIS vai utilizar equipamentos de última geração e inteligência artificial na análise das imagens, 24h por dia, 365 dias por ano.

Meta estratégica: Fortalecimento e Expansão do Sistema de Monitoramento de Áreas de Risco em Uberlândia: Ampliação da Cobertura em 20% até 2028';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar monitoramento com Inteligência Artificial em toda cidade: alarmes de escola, furto de objetos, leitura de placa e cores de veículos suspeitos.

Meta estratégica: Ampliar o Anel de Segurança, expandindo e aprimorando o sistema de videomonitoramento por meio da implantação de câmeras inteligentes e recursos analíticos baseados em inteligência artificial, aumentando em 50% o número de equipamentos na zona urbana e em 50% na área rural até 2028, com o objetivo de reduzir os índices de criminalidade e aumentar a sensação de segurança da população nas áreas monitoradas.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Fortalecer e ampliar projetos de Prevenção às Drogas e Cultura da Paz.

Meta estratégica: Estruturar, até 31/12/2028, o Plano Municipal de Políticas sobre Drogas (PLAMAD) e ampliar as ações de prevenção, por meio da realização de pelo menos 2 diagnósticos, 5 campanhas públicas, 5 eventos formativos e 1 estudo de viabilidade para implantação do CREAD.';
update projetos set peso = 2
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Ampliar sistema de videomonitoramento dos espaços e prédios públicos, com a utilização de Inteligência Artificial e ligado ao CIIS.

Meta estratégica: Aumentar o monitoramento dos equipamentos e prédios públicos, elevando em 50% a cobertura de câmeras de vigilância inteligentes e sistemas de segurança integrados com inteligência artificial até 2028.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar reuniões semestrais com representantes das Secretarias, órgãos de segurança pública, Ministério Público e sociedade civil para definição e acompanhamento das estratégias municipais de prevenção.

Meta estratégica: Fortalecer, até 31/12/2028, a capacidade de planejamento, articulação e atuação integrada do município na prevenção à violência e criminalidade, com a realização de ao menos 8 diagnósticos semestrais, 8 reuniões intersetoriais, 4 eventos de articulação institucional, 4 pesquisas de percepção da segurança e a implantação de 2 programas estratégicos.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar, até 31/12/2028, o Sistema Municipal de Prevenção à Violência de Uberlândia, composto pelo Plano Municipal de Segurança Pública, estruturas de governança, programa de prevenção nas escolas e estudo de viabilidade para criação da Guarda Civil Municipal.

Meta estratégica: Implantar, até 31/12/2028, o Sistema Municipal de Prevenção à Violência de Uberlândia, composto pelo Plano Municipal de Segurança Pública, estruturas de governança, programa de prevenção nas escolas e estudo de viabilidade para criação da Guarda Civil Municipal.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaborar e implementar o Programa Municipal de Prevençao à Violência nas Escolas.

Meta estratégica: Implantar, até 31/12/2028, o Sistema Municipal de Prevenção à Violência de Uberlândia, composto pelo Plano Municipal de Segurança Pública, estruturas de governança, programa de prevenção nas escolas e estudo de viabilidade para criação da Guarda Civil Municipal.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Articular a integração entre os órgãos e fortalecer a participação comunitária nas ações de Defesa Civil

Meta estratégica: Articular a integração entre os órgãos e fortalecer a participação comunitária nas ações de Defesa Civil para aumentar a resiliência e a prevenção de desastres em 100% das áreas de risco identificadas até 2028';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar 2 policlínicas no Município de Uberlândia

Meta estratégica: Aumentar em 5%, em relação ao ano anterior, o número de consultas com especialistas ofertadas.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Manutenção das praças com parceria para utilização de mão de obra do sistema prisional

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar 2 eventos com foco em sustentabilidade até o final de 2026.

Meta estratégica: Realizar 2 eventos com foco em sustentabilidade.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar um sistema de Logística Reversa do Município de Uberlândia, conforme lei ordinária 14.504/2025.

Meta estratégica: Implantar e operacionalizar o sistema municipal de Logística Reversa em Uberlândia, garantindo a adesão de pelo menos 30% das industriais ao programa, com monitoramento digital e participação ativa da população.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar novo Programa de Educação Ambiental (presencial e digital) no município de Uberlândia, conforme prioridades do município para públicos e temas.

Meta estratégica: Implantar e operacionalizar o sistema municipal de Logística Reversa em Uberlândia, garantindo a adesão de pelo menos 30% das industriais ao programa, com monitoramento digital e participação ativa da população.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Realizar ciclo anual de certificação de instituições do município de Uberlândia com o "Selo Uberlândia Mais Sustentável"

Meta estratégica: Realizar os ciclos anuais de certificação das instituições com o ''''Selo Uberlândia Mais Sustentável'''', ampliando em 20% o número de organizações certificada em relação ao ano anterior.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaborar o Plano Climático do município de Uberlândia tendo como base o inventário de emissão de gases de efeito estufa (GEE) municipal.

Meta estratégica: Elaborar Plano Climático do município de Uberlândia, com base no inventário de emissões de GEE, estabelecendo metas de redução e adaptação, e garantindo a participação de 70% dos setores econômicos e sociais relevantes no processo.';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o "Calendário Ambiental de Uberlândia", permitindo a visibilidade de datas, agendas, marcos de destaque e eventos relativos a pauta.

Meta estratégica: Disponibilizar ferramenta digital "Calendário Ambiental de Uberlândia" oportunizando a participação e colaboração da comunidade e demais atores.';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Implantar o SGISV

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'N/A

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'N/A

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'N/A

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 0
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'N/A

Meta estratégica: Arrecadar ou economizar 400Mi até dez/2026';
update projetos set peso = 1
where municipio_id = '00000000-0000-0000-0000-000000000001' and descricao = 'Elaboração de projeto de engenharia e execução das grandes erosões de Balaiadas

Meta estratégica: Entrega de 2 projetos de engenharia para contenção de grandes erosões.';

-- 3. Recalcula pct_atual das METAS com os novos pesos de projeto
--    (protege contra divisão por zero quando todos os projetos da meta têm peso 0)
update metas m
set pct_atual = coalesce((
  select case when sum(p.peso) > 0
    then round(sum(p.pct * p.peso)::numeric / sum(p.peso))::smallint
    else null end
  from projetos p
  where p.meta_id = m.id
), m.pct_atual);

-- 4. Recalcula pct_atual dos OBJETIVOS com os novos pesos de meta
update objetivos o
set pct_atual = coalesce((
  select case when sum(m.peso) > 0
    then round(sum(m.pct_atual * m.peso)::numeric / sum(m.peso))::smallint
    else null end
  from metas m
  where m.objetivo_id = o.id
), o.pct_atual);

-- 5. Conferência
select 'metas_com_peso_diferente_de_1' as item, count(*) from metas where municipio_id = '00000000-0000-0000-0000-000000000001' and peso <> 1
union all select 'projetos_com_peso_diferente_de_1', count(*) from projetos where municipio_id = '00000000-0000-0000-0000-000000000001' and peso <> 1
union all select 'projetos_peso_maximo', max(peso) from projetos where municipio_id = '00000000-0000-0000-0000-000000000001';
