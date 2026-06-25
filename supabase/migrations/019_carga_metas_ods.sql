-- ============================================================
-- 019 — Carga real de vínculos Meta ↔ ODS (aba "Meta" da planilha)
-- 305 metas distintas vinculadas a pelo menos um ODS
-- ============================================================

insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Automatizar 100% dos processos da Secretaria de Administração, eliminando fluxos manuais e promovendo maior eficiência, rastreabilidade e agilidade nos serviços até 2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir que 100% dos novos servidores participem de treinamento integrativo nos primeiros 30 dias de exercício.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir que 100% dos usuários, internos e externos, estejam capacitados e utilizem os serviços digitais disponíveis até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Digitalizar 100% dos processos de compras, contratos e licitações até 31/12/2026, promovendo transparência, agilidade e controle institucional.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover, até 31/12/2027, ações contínuas de capacitação, informação, valorização e cuidado com a saúde mental dos servidores públicos.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover, até 31/12/2027, ações contínuas de capacitação, informação, valorização e cuidado com a saúde mental dos servidores públicos.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Gerenciar 100% dos bens móveis e imóveis municipais por meio de Sistema Integrado de Gestão Patrimonial até 31/12/2028.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Automatizar 100% dos processos logísticos por meio da implementação de sistema de gestão integrado.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar sistema de Gestão Eletrônica de Documentos (GED) e digitalizar 100% da documentação física existente.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Digitalizar 100% dos processos de Sindicância, Processo Administrativo Disciplinar (PAD) e Investigação por meio do sistema e-PAD até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer, até 31/12/2026, a cultura de integridade, ética pública e prevenção ao assédio moral, sexual e à discriminação no serviço público municipal, por meio da capacitação de servidores, orientação da alta gestão e implantação de política institucional, alcançando pelo menos 20% dos servidores de cada Secretaria e 100% dos gestores públicos.' and o.numero = 5
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer, até 31/12/2026, a cultura de integridade, ética pública e prevenção ao assédio moral, sexual e à discriminação no serviço público municipal, por meio da capacitação de servidores, orientação da alta gestão e implantação de política institucional, alcançando pelo menos 20% dos servidores de cada Secretaria e 100% dos gestores públicos.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar o prontuário funcional 100% digital para todos os servidores até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Alcançar 30% de utilização de agentes de inteligência artificial (IA) em processos repetitivos das Diretorias e do Núcleo de Protocolo até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Adquirir ou implementar sistema digital integrado aos processos administrativos para automatizar as avaliações de desempenho dos servidores, até 31/12/2028' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 100% do prontuário clínico digital e perícia médica até 31/12/2026.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 100% do prontuário clínico digital e perícia médica até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 100% da Avaliação de Desempenho em formato digital até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Revisar os Planos de Cargos e Carreiras (Leis 11.966/2014 e 11.967/2014) alinhando-os ao Plano de Governo até 31/12/2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Cumprir 100% das obrigações legais relacionadas à implantação do Regime de Previdência Complementar até 31/12/2025.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Qualificação profissional e trabalho decente - Realização de 6 dias de campo na área de fruticultura' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 30% a quantidade de unidades demonstrativas' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar um ambiente para preservação de todas as plantas em extinção principalmente do cerrado brasileiro.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantação de uma agroindústria para fins didáticos' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Beneficiar e desenvolver jovens que estejam cursando ensino superior ou técnico, com a contratação de 95% das vagas ofertadas de estágio.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolvimento pessoal e familiar do estagiário, atingir um indice de desenvolvimento pessoal de 80%' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Inserir estagiários no mercado de trabalho ao finalizar o programa de estágios, com uma taxa de empregabilidade de 70%.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar o primeiro Summit Regional da Juventude' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar o 1º Aulão do ENEM da Juventude' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir o número de 4000 alunos atendidos pelo programa JuventUDI em Foco.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar a 1ª Semana da Juventude para servidores de até 30 anos' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar a 1ª Semana da Juventude para servidores de até 30 anos' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar o Programa da Prefeitura de Intercâmbio de Lingua Inglesa para Jovens' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar o 1º ciclo de programação e capacitação em IA da Prefeitura de Uberlândia' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estabelecer uma nova Sede da Secretaria Municipal da Juventude' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar o Juventude Networking, programa de benefícios para estagiários e servidores' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir em 8% as autuações por infrações sanitárias nos estabelecimentos fiscalizados até o final do próximo ciclo anual.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir em 8% as autuações por infrações sanitárias nos estabelecimentos fiscalizados até o final do próximo ciclo anual.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir 90% de conformidade regulatória e digitalizar 100% dos processos administrativos das feiras livres até o final do ciclo, com ao menos 40 horas anuais de capacitação por fiscal.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir 90% de conformidade regulatória e digitalizar 100% dos processos administrativos das feiras livres até o final do ciclo, com ao menos 40 horas anuais de capacitação por fiscal.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Transformar as feiras livres em polos de turismo sustentável e cultura local, elevando em 25% o índice de atratividade responsável, que considera visitação turística, práticas ambientais e avaliação positiva dos consumidores.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir 100% de acessibilidade nas feiras livres, ampliar a cobertura para 80% dos bairros em um raio de até 5 km e implementar infraestrutura sustentável com coleta seletiva, compostagem e sinalização turística permanente.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir 100% de acessibilidade nas feiras livres, ampliar a cobertura para 80% dos bairros em um raio de até 5 km e implementar infraestrutura sustentável com coleta seletiva, compostagem e sinalização turística permanente.' and o.numero = 12
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer a atuação institucional do agronegócio no município por meio da capacitação técnica de 600 produtores rurais, ampliando a oferta, a eficiência e a visibilidade dos serviços prestados pela Secretaria.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer a atuação institucional do agronegócio no município por meio da capacitação técnica de 600 produtores rurais, ampliando a oferta, a eficiência e a visibilidade dos serviços prestados pela Secretaria.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar a inclusão produtiva e a sustentabilidade de, no mínimo, 80% dos produtores atendidos pela assistência técnica no Programa Novo Agro.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Incluir 70% das escolas rurais no Projeto Educa Agro, promovendo educação agropecuária e saúde animal para melhorar a qualidade de vida no campo.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Incluir 70% das escolas rurais no Projeto Educa Agro, promovendo educação agropecuária e saúde animal para melhorar a qualidade de vida no campo.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover a vacinação de 1.000 bezerras contra a Brucelose.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Instalar ao menos 2 unidades estratégicas de infraestrutura para o agronegócio, como frigoríficos, visando a geração de emprego.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Instalar ao menos 2 unidades estratégicas de infraestrutura para o agronegócio, como frigoríficos, visando a geração de emprego.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Incentivar o agronegócio, apoiando a criação e regularização ambiental e sanitária de pelo menos 5 novos empreendimentos sustentáveis no setor rural.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Impulsionar o desenvolvimento e expansão de pelo menos 12 agroindústrias locais, gerando empregos, agregando valor aos produtos rurais e promovendo formalização, inovação produtiva e acesso a novos mercados.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Impulsionar o desenvolvimento e expansão de pelo menos 12 agroindústrias locais, gerando empregos, agregando valor aos produtos rurais e promovendo formalização, inovação produtiva e acesso a novos mercados.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 12 encontros técnicos e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Consolidar a SMAGRO como facilitadora estratégica do agronegócio, promovendo pelo menos 12 encontros técnicos e rodadas de negócios para ampliar investimentos, incentivar inovação e expandir mercados.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir a execução plena e qualificada dos programas PMAE e PAA até 31/12/2026, com 100% da execução dos recursos do MDS (PAA) e captação superior a 30% dos recursos disponíveis do FNDE (PMAE), fortalecendo a agricultura familiar e o atendimento às escolas e entidades socioassistenciais.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir a execução plena e qualificada dos programas PMAE e PAA até 31/12/2026, com 100% da execução dos recursos do MDS (PAA) e captação superior a 30% dos recursos disponíveis do FNDE (PMAE), fortalecendo a agricultura familiar e o atendimento às escolas e entidades socioassistenciais.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 20% a capacidade produtiva e comercial dos agricultores familiares de Uberlândia até 2026, com foco na qualificação da produção, melhoria da infraestrutura de armazenagem e maior inserção no mercado institucional.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 20% a capacidade produtiva e comercial dos agricultores familiares de Uberlândia até 2026, com foco na qualificação da produção, melhoria da infraestrutura de armazenagem e maior inserção no mercado institucional.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprimorar integralmente a gestão do Curral Municipal até 31/12/2026, garantindo 100% de rastreabilidade dos animais apreendidos, redução de custos operacionais e melhoria das condições de bem-estar animal, com foco em eficiência, transparência e impacto social.' and o.numero = 15
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 25% os atendimentos técnicos da SMAGRO até 31/12/2026, com foco no fortalecimento dos programas de motomecanização, conservação de solo, reforma de pastagens, silagem e preparo de solo, beneficiando diretamente ao menos 150 produtores rurais.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 25% os atendimentos técnicos da SMAGRO até 31/12/2026, com foco no fortalecimento dos programas de motomecanização, conservação de solo, reforma de pastagens, silagem e preparo de solo, beneficiando diretamente ao menos 150 produtores rurais.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Qualificar de forma contínua os produtores e colaboradores vinculados à SMAGRO, com a oferta mínima de 4 cursos técnicos por ano até 2026, voltados à operação de máquinas, manejo sustentável, produção e gestão rural.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Qualificar de forma contínua os produtores e colaboradores vinculados à SMAGRO, com a oferta mínima de 4 cursos técnicos por ano até 2026, voltados à operação de máquinas, manejo sustentável, produção e gestão rural.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 80% a efetividade da interlocução entre a população dos Distritos e Zona Rural com os órgãos da Prefeitura de Uberlândia.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir a manutenção e conservação integral (100%) das estradas vicinais, pontes e mata-burros do município, incluindo o alargamento de 3 pontes de concreto e a elevação do greide em 60 km de vias rurais anualmente, assegurando drenagem eficiente, estabilidade estrutural e condições adequadas para o tráfego e escoamento da produção.' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir a manutenção e conservação integral (100%) das estradas vicinais, pontes e mata-burros do município, incluindo o alargamento de 3 pontes de concreto e a elevação do greide em 60 km de vias rurais anualmente, assegurando drenagem eficiente, estabilidade estrutural e condições adequadas para o tráfego e escoamento da produção.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir a manutenção e conservação integral (100%) das estradas vicinais, pontes e mata-burros do município, incluindo o alargamento de 3 pontes de concreto e a elevação do greide em 60 km de vias rurais anualmente, assegurando drenagem eficiente, estabilidade estrutural e condições adequadas para o tráfego e escoamento da produção.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 30% a quantidade de alunos nas escolinhas' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar a frequência nos parques e poliesportivos até 2027.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar e apoiar 30 pequenos eventos de lazer e esportivos nos espaços da FUTEL' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Treinamentos técnicos para os servidores da área administrativa da Futel' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Treinamentos técnicos para os servidores da área esportiva da Futel' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar a quantidade de paratletas visando o aumento de medalhas para o próximo jogos paralímplicos' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criação de midias sociais exclusiva para FUTEL' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Otimizar 100% do processo via implatação de software previdenciário' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Revisão e Otimização 100% de todos os processos do IPREMU' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar o Nivel do Pro Gestao - Nivel 3' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Manter a saúde financeira do IPREMU de forma a não ter défict financeiro ( equilibrio atuarial)' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar o crédito consignado para diminuir a taxa dos nossos segurados e aumentar a rentabilidade do IPREMU' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atender 6000 pessoas/ano endividadas/superendividadas nos projetos de negociação de dívidas e tratamento ao superendividamento.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar um ponto de atendimento descentralizado até 30/12/2026' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar a tecnologia de Inteligência Artificial no Sistema Fale Procon até 31/12/2025.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 03 (três) câmaras técnicas setoriais e 02 (duas) comissões temáticas até 31/12/2025.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 02 (duas) ferramentas com o objetivo de monitoramento do mercado de consumo.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar 10 (dez) ações (cursos, projetos, campanhas e atividades para disseminação da educação para o consumo) até 30/12/2025.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir em 90% o consumo de papel.' and o.numero = 12
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar e aperfeiçoar 80% os servidores públicos do Procon até 31/12/2027.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Erradicar os espaços para armazenamento de arquivos 25 m².' and o.numero = 12
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Automatizar 100% dos processos de serviços prestados pela secretaria.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir o cumprimento das diretrizes da Politicia Nacional de Educação Permanente do SUAS' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar para 8.000 o número de jovens e adultos qualificadas e ou requalificadas.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Viabilizar a criação de Fab Labs(Laboratório de Fabricação) estimulando a inovação e aprendizado prático em um espaço colaborativo, em todas as Unidades Centros Profissionalizantes e Naica''s até 2028.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Viabilizar a criação de Fab Labs(Laboratório de Fabricação) estimulando a inovação e aprendizado prático em um espaço colaborativo, em todas as Unidades Centros Profissionalizantes e Naica''s até 2028.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar 20% do número de vagas de emprego de alto valor agregado oferecidas pela Unidade SINE Uberlândia até 2028.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar os serviços de atendimento a pessoa idosa em 20% até 2028' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o número de unidades do CRAS em 15% até 2028.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o número de centros de convivência para crianças e adolescentes em 20% até 2028.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Revitalizar e modernizar em todos os equipamentos sociais da Secretaria de Desenvolvimento Social até 2028.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 10% o número de vagas para o Serviço de Acolhimento Institucional de crianças, adolescentes e jovens até 2026.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 10% o número de vagas para o Serviço de Acolhimento Institucional de crianças, adolescentes e jovens até 2026.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atualizar a legislação vigente e/ou normatizar 100% dos serviços, programas, projetos e benefícios de assistência social ofertados pelo município, até 2028.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atualizar a legislação vigente e/ou normatizar 100% dos serviços, programas, projetos e benefícios de assistência social ofertados pelo município, até 2028.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 2 Conselhos Tutelares até 2028. (regulatório)' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 2 Conselhos Tutelares até 2028. (regulatório)' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar um fluxo sistematizado para integração das secretarias de Saúde e de Desenvolvimento Social para informações e atendimento' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar um fluxo sistematizado para integração das secretarias de Saúde e de Desenvolvimento Social para informações e atendimento' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 04 e projetar mais 10 equipamentos de mobilidade urbana, com objetivo de reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, até 2028;' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 04 e projetar mais 10 equipamentos de mobilidade urbana, com objetivo de reduzir o tempo de percurso nos principais entroncamentos do sistema viário e integrar com mais facilidade diferentes setores da cidade, até 2028;' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar ações de pavimentação, recapeamento, e recuperação de malha viária à médio e longo prazo. Médio prazo:Executar 300 km lineares de recuperação ou expansão de malha viária no perímetro urbano, até 2030. Longo prazo: Executar 600 km lineares de recuperação ou expansão de malha viária no perímetro urbano, até 2035.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar ações de pavimentação, recapeamento, e recuperação de malha viária à médio e longo prazo. Médio prazo:Executar 300 km lineares de recuperação ou expansão de malha viária no perímetro urbano, até 2030. Longo prazo: Executar 600 km lineares de recuperação ou expansão de malha viária no perímetro urbano, até 2035.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar as ações de tapa buraco a curto, médio e longo prazo. Curto prazo: realizar trabalho de manutenção preventivo para minimizar a incidênica de novos buracos, principalmente no período chuvoso; Médio prazo: 1) Diminuir o tempo médio de atendimento das demandas de tapa buraco de 38 para 20 dias até 2029; 2) Ampliar ações preventivas no asfalto, diminuindo o número de solicitações da ouvidoria de tapa-buraco em 5% até 2028; Longo prazo: Ampliar ações preventivas no asfalto, diminuindo o número de solicitações da ouvidoria de tapa-buraco em 20% até 2035.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar as ações de tapa buraco a curto, médio e longo prazo. Curto prazo: realizar trabalho de manutenção preventivo para minimizar a incidênica de novos buracos, principalmente no período chuvoso; Médio prazo: 1) Diminuir o tempo médio de atendimento das demandas de tapa buraco de 38 para 20 dias até 2029; 2) Ampliar ações preventivas no asfalto, diminuindo o número de solicitações da ouvidoria de tapa-buraco em 5% até 2028; Longo prazo: Ampliar ações preventivas no asfalto, diminuindo o número de solicitações da ouvidoria de tapa-buraco em 20% até 2035.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Construção e reformas de prédios públicos, atendendo as demandas das Secretarias envolvidas com saúde, educação e assistência social, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Construção e reformas de prédios públicos, atendendo as demandas ligadas ao saneamento, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Construção e reformas de prédios públicos, atendendo as demandas ligadas ao saneamento, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Construção e reformas de prédios públicos, atendendo as demandas das demais Secretarias envolvidas com cultura, esporte, lazer e segurança cidadã, garantindo o cumprimento de 70% do planejado, até 2028. (Prazo, Custo e Escopo)' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir impactos dos alagamentos na Avenida Rondon Pacheco à curto, médio e longo prazo. Curto prazo: Realizar estudo e projetos para detenção de água pluvial nos córregos Jataí e São Pedro, até 2026; Médio prazo: Até 2029, concluir as obras de detenção de água pluvial e assim reduzir os picos de vazão problemáticos ocorridas nas bacias dos Córregos Lagoinha e Mogi, que chegam à Rondon Pacheco; Longo prazo: Até 2035, reduzir picos de vazão de todos os córregos contribuintes da Av. Rondon Pacheco.' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir impactos dos alagamentos na Avenida Rondon Pacheco à curto, médio e longo prazo. Curto prazo: Realizar estudo e projetos para detenção de água pluvial nos córregos Jataí e São Pedro, até 2026; Médio prazo: Até 2029, concluir as obras de detenção de água pluvial e assim reduzir os picos de vazão problemáticos ocorridas nas bacias dos Córregos Lagoinha e Mogi, que chegam à Rondon Pacheco; Longo prazo: Até 2035, reduzir picos de vazão de todos os córregos contribuintes da Av. Rondon Pacheco.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar, até o final de 2028, um sistema inteligente de gestão do sistema viário que permita direcionar, com base em dados, pelo menos 80% das ações de tapa-buraco, recapeamento e pavimentação.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar, até o final de 2028, um sistema inteligente de gestão do sistema viário que permita direcionar, com base em dados, pelo menos 80% das ações de tapa-buraco, recapeamento e pavimentação.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Trabalhar em prol da melhoria do espaço físico das instalações da Prefeitura de Uberlândia adequando a demanda de espaço físico com a necessidade, até 2035.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elaboração de paineis indicadores e processos de melhoria contínua dentro da Secretaria de Infraestrutura, até 2026;' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Alcançar e manter, até 2029, eficácia mínima anual de 83% no atendimento das Ordens de Serviço da administração municipal, com metas progressivas por nível de complexidade, conforme o programa “Zelo por Uberlândia” do PPA 2026–2029.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar até dezembro de 2026 um sistema digital de gestão das Ordens de Serviço que permita controle em tempo real, relatórios automatizados e apoio à tomada de decisão.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Publicar e manter atualizado, até 31/08/2025, o Catálogo de Serviços Técnicos da EMAM (1ª Edição) como instrumento oficial de padronização, gestão de ordens de serviço e articulação interinstitucional, assegurando sua revisão anual.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover, até 31/12/2028, a regularização fundiária de ao menos cinco núcleos habitacionais de origem popular vinculados à antiga EMCOP, por meio da REURB-S ou instrumentos jurídicos próprios, assegurando segurança jurídica e inclusão habitacional às famílias ocupantes.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer a gestão fundiária, contratual e patrimonial da EMAM por meio da execução de quatro ações estratégicas — recuperação de créditos, regularização documental, escrituração definitiva e digitalização do acervo — até dezembro de 2028.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o alcance de servidores em 50%' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir a aderência de 100% referente aos eixos do Programa de Integridade' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Automatizar e implantar um sistema para o processo de acesso à informação' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Manutenção dos 95,9% de pontuação no PNTP (Selo Diamante)' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realização da primeira avaliação de um Programa de Integridade apresentado por empresa contratada' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realização de 12 (doze) eventos de Ouvidoria-Móvel' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Avaliação de 100% dos Serviços Públicos' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realização 02 de eventos/projetos para fortalecimento do canal de denúncias' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumento em 10% de conformidade aos critérios de auditoria interna' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantação da gestão de riscos estratégicos em 100% das Secretarias' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Regularizar 7 mil moradias nos próximos 4 anos' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Contratar 10 mil moradias nos próximos 4 anos' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Otimização e Automação de 100% dos Processos Internos do Cadastro Habitacional.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Enviar propostas, para 100% dos programas disponíveis, conforme análise de viabilidade para o munícipio, via União e Estado até 2026.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Redução em 50% do tempo do processo de aprovação de loteamentos de Habitação de Interesse Social' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar um painel de acompanhamento do processo de aprovação de loteamentos envolvendo todas as secretarias responsáveis pela aprovação.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumento de 30% em receita através da modernização do processo de parcelamento do solo.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar Instituto de Planejamento Urbano - planejamento do crescimento e desenvolvimento e da cidade' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 30% a criação de novas empresas atráves da flexibilização da lei de uso e ocupação do solo.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Redução de 15 dias no processo de aprovação de projeto arquitetônico' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar a disponibilidade em 15% de áreas de habitação de interesse social.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Manter entre os 3 primeiros lugares no ranking de cidades com melhores condições de acessibilidade.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Requalificar com padrões de acessibilidade universal, 2(dois) espaços públcios urbanos em regiões prioritárias, como foco em calçadas, travessias, sinalização e mobiliário acessível.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar comitê de Viabilidade de implatação de equipamentos públicos.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementação de leis para regulamentar a restruturação do centro da cidade.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar e Operacionalizar o CIIS- Centro Integrado de Inteligência e Segurança até 2028, garantindo a integração plena das forças de segurança e o uso de tecnologia Avançada.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o Anel de Segurança, expandindo e aprimorando o sistema de videomonitoramento por meio da implantação de câmeras inteligentes e recursos analíticos baseados em inteligência artificial, aumentando em 50% o número de equipamentos na zona urbana e em 50% na área rural até 2028, com o objetivo de reduzir os índices de criminalidade e aumentar a sensação de segurança da população nas áreas monitoradas.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar o monitoramento dos equipamentos e prédios públicos, elevando em 50% a cobertura de câmeras de vigilância inteligentes e sistemas de segurança integrados com inteligência artificial até 2028.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecimento e Expansão do Sistema de Monitoramento de Áreas de Risco em Uberlândia: Ampliação da Cobertura em 20% até 2028' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Articular a integração entre os órgãos e fortalecer a participação comunitária nas ações de Defesa Civil para aumentar a resiliência e a prevenção de desastres em 100% das áreas de risco identificadas até 2028' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar sistema de alerta de risco hidrológico Avenida Rondon Pacheco. (100% implementado em até 12 meses).' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer, até 31/12/2028, a capacidade de planejamento, articulação e atuação integrada do município na prevenção à violência e criminalidade, com a realização de ao menos 8 diagnósticos semestrais, 8 reuniões intersetoriais, 4 eventos de articulação institucional, 4 pesquisas de percepção da segurança e a implantação de 2 programas estratégicos.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estruturar, até 31/12/2028, o Plano Municipal de Políticas sobre Drogas (PLAMAD) e ampliar as ações de prevenção, por meio da realização de pelo menos 2 diagnósticos, 5 campanhas públicas, 5 eventos formativos e 1 estudo de viabilidade para implantação do CREAD.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar, até 31/12/2028, o Sistema Municipal de Prevenção à Violência de Uberlândia, composto pelo Plano Municipal de Segurança Pública, estruturas de governança, programa de prevenção nas escolas e estudo de viabilidade para criação da Guarda Civil Municipal.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Proporcionar ambiente mais propício para a aprendizagem em 100% das unidades escolares municipais até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Proporcionar ambiente mais propício para a aprendizagem em 100% das unidades escolares municipais até 2028.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar e implantar pelo menos 2 trilhas de conhecimento para capacitar os Servidores em temas relevantes com o foco em melhorar os processos internos, alcançando mínimo de 70% do público alvo até 2026.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar parcerias com as universidades para fomentar o conhecimento com o objetivo de contribuir com os desafios da adm pública (TCC e Teses) em pelo menos 50 projetos iniciados até 2027.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 4 Escolas de tempo integral de ensino fundamental até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 9 EMEIs até até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir a meta (7.0 para anos iniciais e 6,5 para anos finais) do IDEB prevista para a rede municipal até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Assegurar o cumprimento da BNCC Computação para 50% dos estudantes do Ensino Fundamental até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estruturar modelo de atendimento integrado às crianças das escolas de tempo integral em atividades que envolvam as secretarias de Educação, FUTEL, Desenvolvimento Social e Cultura' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover políticas de inclusão e redução das desigualdades sociais e étnico raciais com ações que reflitam na melhoria (qualquer %) no desempenho dos estudantes para assegurar a condicionalidade 3 do VAAR até 2028.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Substituir a plataforma de comunicação de física para eletrônica, com alcance de pessoa física e pessoa jurídica, integrando o novo formato aos Sistemas da Secretaria de Finanças. Reduzir o tempo de processo de comunicação com o contribuinte em aproximadamente 25 dias, impactando positivamente no processo de arrecadação.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar do Observatório do Mercado Imobiliário, integrando ferramentas já disponíveis; como ortofoto por georeferenciamento, planta genérica de valores, geração de laudos, simulação de valores imobiliários, entre outros.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estruturação da Gestão Tributária, a partir de implantação de instrumentos de inteligência tributária, fiscalização educativa, integração de sistemas e monitoramento de resultados.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Acompanhar e cumprir as alterações do ISSQN/IBS conforme cronograma da Reforma Tributária.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Proporcionar acesso ao contribuinte, dos meios de pagamento disponíveis na Rede Bancária; como PIX, CHEKOUT e outros,para todos os fatos geradores.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Concluir melhorias sistema Web Demonstrativos Fiscais' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar a automação da Conciliação Bancária; possibilitando conferência digital entre extratos bancários e relatórios contábeis; porporcionando rapidez, segurança e precisão na apuração dos saldos bancários.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Revisar e atualizar o Código Tributário e taxas Municipais, conforme os fundamentos da Reforma Tributária, EC 132/2023.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover a capacitação anual de no mínimo 100 servidores de Uberlândia e municípios da região nos princípios contábeis, de custos e de governança, consolidando o papel de Uberlândia como polo de integração e desenvolvimento regional.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar o Programa de Educação Financeira nas instituições de Ensino.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar o Programa de Educação Financeira nas instituições de Ensino.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o acesso à informação pública e a transparência ativa e passiva facilitando a participação cidadã por meio de 10 ações estratégicas.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Posicionar Uberlândia entre os 10 primeiros lugares do "Ranking da Qualidade da Informação Contábil" no Siconfi” da Secretaria do Tesouro Nacional (STN)' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Revisar a composição dos Fatos Gerados municipais; impostos e taxas.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar Sistema de comunicação Pessoa Física -"e-CAC-UDI", similiar ao domicilio Eletrônico do Contribuinte (Pessoa Jurídica).' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Securitização de 100% da carteira de recebíveis de Uberlândia até 2026. A meta proposta depende de estudos e análises.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir o CAPAG B até Dezembro de 2026' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 260 pontos de wi-fi nos equipamentos públicos conforme planejado na primeira fase.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aculturar e Implantar a IA em 6 (Seis) Soluções.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar o DEC em todas as Secretarias e Orgãos de Autarquia' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar 10.000 (dez Mil) Soluções de IoT' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar em Cibersegurança os alunos da rede municipal e menores atendidos em equipamentos da Sec. Desenvolvimento Social (NAICA).' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Continuidade de processos de aderência de LGPD em 100% dos Sistemas gerenciados pela Prodaub.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Construção da Sede da Prodaub no Polo Tecnológico' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atualizar ambiente Tecnológico da PMU' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reestruturar a rede de fibra óptica (Projeto Olho Vivo)' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar e fortalecer as ações da Escola de Governo, para qualificar a atuação dos servidores em cargo de gestão em pelo menos 3 Áreas de Conhecimento, utilizando ferramenta de LMS.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar e fortalecer as ações da Escola de Governo, para qualificar a atuação dos servidores em cargo de gestão em pelo menos 3 Áreas de Conhecimento, utilizando ferramenta de LMS.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Preparar a PMU para utilizar a metodologia BIM em 100% dos projetos de construção civil.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estabelecer parceria com pelo menos com duas instituições de ensino (pública ou privada) para desenvolver projetos que gerem soluções aplicáveis às necessidades do município através de TCCs e/ou TESES de Mestrado ou Doutorado.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Estabelecer Arquitetura de Inteligência de Dados da PMU viabilizando DW´s, Datalake´s e IAs por meio de 3 ações estratégicas.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar interoperabilidade na saúde integrando setor público e privado em Uberlândia e na região do Triângulo Mineiro, até 2035' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover a Governança de Dados conforme a Lei Geral de Proteção de Dados Pessoais (LGPD) por meio de 3 ações estratégicas.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar e Manter o Planejamento Estratégico de forma sistêmica por meio de 5 ações estratégicas.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar e Manter o Planejamento Estratégico de forma sistêmica por meio de 5 ações estratégicas.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Facilitar o acesso à informação, ampliar a transparência e fortalecer integração entre as Secretarias e Orgãos de Autarquia por meio de 5 ações estratégicas.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar de forma sustentável a geração de receitas próprias por meio da estruturação e execução de projetos de PPPs, concessões e demais modelagens, visando ganho econômico ou financeiro de R$ 500 milhões de receita municipal até 2028.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar de forma sustentável a geração de receitas próprias por meio da estruturação e execução de projetos de PPPs, concessões e demais modelagens, visando ganho econômico ou financeiro de R$ 500 milhões de receita municipal até 2028.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elevar o nível de maturidade em gerenciamento de projetos da prefeitura e autarquias até dez/2027' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar ferramenta de workflow e automatizar os processos core da prefeitura até dez 2028' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar ferramenta de workflow e automatizar os processos core da prefeitura até dez 2028' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ser referência no uso de IA no setor público através da implantação de um Centro de Gestão e Estudos Estratégicos, conforme MCTI - PBIA 2024-2028' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Soluções para aumentar o desvio do que vai para o aterro - tratamento dos resíduos sólidos' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar estrutura de governança e escritório de gerenciamento de projetos e processos' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reabilitar a ETE Uberabinha' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantação da nova ETE (margem esquerda)' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar os indicadores de Extravasamento e Refluxo de Esgoto Redução média de 8% ao ano' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elaboração de projetos de engenharia para os grandes problemas de drenagens (Rondon, Minervina, Rua Haia/Tibery, Morumbi)' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elaboração de projetos de engenharia e execução das grandes erosões (Nossa Senhora das Graças, Córrego Campo Alegre)' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantação do Programa de Redução de Perdas' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Expansão de telemetria nos hidrômetros 8.000 hidrômetros/ano' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Expansão de telemetria nos hidrômetros 8.000 hidrômetros/ano' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhoria na gestão de custos operacionais (foco em redução) Redução em 5% do custo unitário operacional da produção e distribuição de água. Redução em 5% do custo unitário operacional da coleta/afastamento/tratamento de esgoto.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Intensificar ações de comunicação no que tange a importância do saneamento (comparação com outras regiões) e conscientização da população.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 50% o índice de reciclagem em Uberlândia até 2028' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.' and o.numero = 5
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Posicionar o município de Uberlândia entre as 10 cidades mais inovadoras do Brasil.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir 20 bilhões de reais de novos investimentos privados no município em 2028.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar de maneira intensiva, até 30 empresas de micro e pequeno porte em planejamento estratégico, marketing e vendas' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar de maneira intensiva, até 30 empresas de micro e pequeno porte em planejamento estratégico, marketing e vendas' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar 100 empresas de micro e pequeno porte em produtividade, qualidade, sustentabilidade e inovação' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar 100 empresas de micro e pequeno porte em produtividade, qualidade, sustentabilidade e inovação' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar 2.000 atendimentos da Sala do Empreendedor até 2028 (média de 50 atendimentos por mês).' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar 2.000 atendimentos da Sala do Empreendedor até 2028 (média de 50 atendimentos por mês).' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Chegar a 50% o percentual de compras públicas municipais de o município de Uberlândia, realizadas junto a fornecedores com CNPJ instalados no município' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 20% a contribuição no PIB de o município de Uberlândia, do segmento de bares, restaurantes, hotéis e similares' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Regulamentar, até outubro de 2025, o uso de Sandbox Regulatório em o município de Uberlândia por meio de decreto municipal, implementando uma cultura de experimentação regulatória e ao menos 2 projetos-piloto publicados até junho de 2026' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar uma contratação pública de soluções inovadoras no município de Uberlândia como programa piloto até dezembro de 2025, a partir de desafio público mapeado' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ter cadastrado 200 novos fornecedores do município de Uberlândia na Plataforma do Contrata+Brasil até 2028' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar até 100 empresas na utilização de Inteligência Artificial para melhoria dos negócios, por segmento de atuação' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Apoiar até 1.200 mulheres em programas de capacitação para geração de renda, até 2028' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar o Plano Estratégico do município de Uberlândia Cidade Inteligente e posicionar a cidade entre as 10 principais no ranking Connected Smart Cities (CSC)' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar o Plano Estratégico do município de Uberlândia Cidade Inteligente e posicionar a cidade entre as 10 principais no ranking Connected Smart Cities (CSC)' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Tornar o município de Uberlândia uma das 10 cidades líderes do Brasil em número de veículos elétricos e infraestrutura de apoio até 2027' and o.numero = 7
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Tornar o município de Uberlândia uma das 10 cidades líderes do Brasil em número de veículos elétricos e infraestrutura de apoio até 2027' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprimorar o status de o município de Uberlândia como cidade global,atraindo 10 empresas internacionais e colocar em prática 10 acordos de cidades irmãs até 2028.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar comercio exterior de o município de Uberlândia apoiando 50 empresas e startups até 2028' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprimorar o ambiente de negócio e capacitar pelo menos 3.000 micro e pequenas empresas em o município de Uberlândia em gestão, competitividade, melhoria de processos e inovação até 2028' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprimorar o ambiente de negócio e capacitar pelo menos 3.000 micro e pequenas empresas em o município de Uberlândia em gestão, competitividade, melhoria de processos e inovação até 2028' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar os compradores da Prefeitura e os MEIs para uso da plataforma e cadastrar cerca de 200 MEIs até 2028' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Colocar em funcionamento o Teatro Municipal Grande Otelo até 2026' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar pelo menos 2 novas unidades do Centro de Artes e Esportes Unificados (CEUs) até 2029, ampliando a infraestrutura cultural nas regiões de maior vulnerabilidade.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover a acessibilidade universal na cultura com ações em no minimo 50% dos equipamentos culturais administrados pela SMCT' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Instalar sinalização histórica e turística padronizada em pelo menos 100% dos bens tombados até 2029' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promoção do Turismo Rural e Ecoturismo através do mapeamento dos atrativos naturais do Municpio e desenvolvimento de no mínimo 3 roteiros turisticos até 2029' and o.numero = 2
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover no mínimo 4 capacitações em arte digital até 2029' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar programa de monitoramento de dados turísticos até 2027' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar a plataforma de mapeamento de dados culturais do Município, pela qual serão mapeados agentes, espaços culturais, projetos e eventos culturais até 2027' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 25% o número anual de turistas que visitam Uberlândia até 2029' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitar e certificar no minimo 200 agentes turísticos e guias locais até 2029' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar e apoiar 100% das festividades culturais afro e populares tradicionais do Município a cada ano, ampliando em 20% o público participante até 2029 em comparação ao período anterior' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 20% as ações do Programa de Promoção de Ações Afirmativas em Prol da Comunidade Afro' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o fomento à produção cultural, aumentando em até 20% o apoio financeiro a projetos culturais locais até 2029' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir descentralização e itinerância de ações culturais em 100% das regiões do Município, incluindo Zona Rural e Distritos até 2029' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Valorização da cultura urbana e artesanato: Realizar anualmente pelo menos 1 evento específico de cultura urbana e de artesanato' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 20% as ações dos Programas "Cidade da Música", "Cultura na Comunidade" e do Programa de Apoio a Comunidade' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Expandir ações do Programa Ler com Prazer, ampliando em até 30% o público beneficiado' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliação da capacitação cultural através da implementação de ações do Programa Qualificando Saberes, beneficiando pelo menos 300 pessoas anualmente' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover a manutenção do acervo tombado, com intervenções em pelo menos 1 espaço público cultural protegido' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Fortalecer a política de preservação do patrimônio cultural, por meio da ampliação em até 20% do acervo de bens oficialmente protegidos no Município até 2029' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar ações de Educação Patrimonial do Programa de Preservação do Patrimônio Histórico e Cultural, alcançando pelo menos 1.000 alunos da rede pública por ano' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir em 20% o tempo de análise e aprovação de processos no âmbito da SMGAS.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Assumir 2 novas classes de licenciamento ambiental para empreendimentos.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar primeiro ciclo de certificação de "Selo Uberlândia Mais Sustentável".' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar primeiro ciclo de certificação de "Selo Pet" em Uberlândia.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar 2 eventos com foco em sustentabilidade.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Identificar, por meio da realização de 1 hackathon a cada ano, soluções para desafios ambientais no âmbito do Município de Uberlândia.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Identificar, por meio da realização de 1 hackathon a cada ano, soluções para desafios ambientais no âmbito do Município de Uberlândia.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 50% a participação em programas de educação ambiental no Município.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar o Programa Municipal Integrado de Bem Estar Animal de Uberlândia.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar um sistema de indicadores ambientais públicos do Município de Uberlândia.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Proporcionar, pelo menos, 3 capacitações e atualizações aos servidores públicos que atuam na Secretaria.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Alcançar 20% dos irrigantes atráves do programa voltado à eficiência da irrigação em propriedades rurais do Município de Uberlândia.' and o.numero = 6
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolver e apoiar 3 projetos de recuperação de áreas de preservação permanente degradadas em área urbana e rural.' and o.numero = 15
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Criar o Programa Municipal Integrado para monitoramento e melhoria da qualidade do ar e da diminuição de ruídos.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implementar o Plano de Arborização Urbana como política de proteção, controle e conservação do meio ambiente, visando adensar as áreas verdes nos espaços públicos.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar 1 inventário de emissão de gases de efeito estufa (GEE) no âmbito da Administração Pública Municipal.' and o.numero = 13
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elaborar, orçar, validar propostas e disponibilizar 20 projetos de arquitetura e paisagismo para implantação e contemplação dos espaços públicos, como praças e parques, visando a execução quando da disponibilidade financeira.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Contribuir para o saneamento urbano e o descarte ambientalmente correto com a operação de 15 Ecopontos até Dez/2028' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar, revitalizar e manter a pintura de 80% dos meio-fios da cidade de Uberlândia, com foco na segurança viária, melhoria da mobilidade urbana e embelezamento da cidade' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar e viabilizar a varrição 100% mecanizada nos canteiros centrais e expandir em mais 20% a varrição manual nas vias públicas do Município de Uberlândia, aliada à realização de estudos e à implantação da capina mecanizada. A iniciativa tem como objetivo modernizar, ampliar e reduzir custos dos serviços de limpeza urbana, promovendo mais eficiência operacional, sustentabilidade, agilidade e melhoria na qualidade dos espaços públicos, além de garantir maior produtividade na manutenção das áreas urbanas.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar estudos técnicos e viabilizar a implantação de aproximadamente 200 novos pontos de iluminação pública em locais previamente identificados e aprovados, contemplando ambos os lados das vias. A ação visa ampliar em 20% a cobertura da rede de iluminação pública no município, contribuindo para o aumento da segurança, a valorização dos espaços urbanos e a melhoria do conforto e da qualidade de vida da população, com execução no período de janeiro de 2026 a dezembro de 2028.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Planejar e viabilizar, anualmente, a implantação do projeto de iluminação natalina no Município de Uberlândia, contemplando, no mínimo, 13 espaços públicos por ano — incluindo praças, avenidas, prédios públicos, rotatórias e pontos turísticos — totalizando no minimo 52 locais decorados no período de 2025 a 2028. A iniciativa tem como objetivo valorizar os espaços urbanos, fomentar o comércio local, fortalecer o espírito natalino e promover a ocupação segura e atrativa da cidade durante o período festivo.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar estudo técnico de viabilidade para a implantação do sistema de iluminação pública subterrânea em, no mínimo, 6 pontos estratégicos localizados nos principais trevos e rodovias de acesso ao Município de Uberlândia. A iniciativa visa aumentar a segurança viária, valorizar os acessos urbanos e promover a modernização e a melhoria estética dos espaços públicos. O estudo deverá ser concluído até dezembro de 2026.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar estudos técnicos e de viabilidade para a implantação de um Crematório Municipal no Município de Uberlândia, visando ampliar em 30% a oferta de serviços funerários na cidade. Paralelamente, executar a reforma completa dos dois cemitérios municipais, e concluir a construção de duas novas salas velatórias no Cemitério Campo do Bom Pastor. Essas ações buscam aprimorar a infraestrutura e a qualidade dos serviços funerários, garantindo maior capacidade de atendimento e conforto para a população.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Concluir a reforma do Camelódromo Municipal da Av. Floriano Peixoto, abrangendo 100% da revitalização das instalações, e viabilizar, por meio da análise e aprovação do COMPHAC, a reforma do Ambulódromo da Praça Jaci de Assis, contemplando a recuperação de, no mínimo, 20% das áreas comuns. Essas ações visam melhorar as condições de infraestrutura, garantir um ambiente adequado e seguro para os comerciantes e frequentadores, e promover a valorização dos espaços públicos.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Promover estudos intersecretarias para analisar a circulação de veículos de tração animal no perímetro urbano de Uberlândia, abrangendo pelo menos 100% das vias urbanas prioritárias mapeadas e avaliadas. O estudo deverá subsidiar a formulação de políticas públicas para a normatização e regulação da tração animal e do uso de “cavalo de aço”, garantindo a segurança viária, o bem-estar animal e a organização do trânsito no município.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolver ações de capacitação e promover a humanização no atendimento para 100% dos servidores da SESURB, com o objetivo de aprimorar a qualidade dos serviços, elevar a satisfação dos usuários e fortalecer a eficiência, o comprometimento e a excelência no desempenho das atividades.' and o.numero = 4
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolver ações de capacitação e promover a humanização no atendimento para 100% dos servidores da SESURB, com o objetivo de aprimorar a qualidade dos serviços, elevar a satisfação dos usuários e fortalecer a eficiência, o comprometimento e a excelência no desempenho das atividades.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar a reforma de aproximadamente do imóvel localizado na Av. Rondon Pacheco, nº 5000, e promover a transferência integral da Secretaria Municipal de Serviços Urbanos (SESURB) para esse local, visando ampliar em 50% o espaço físico atualmente disponível, adequar as condições de atendimento ao público e integrar fisicamente todos os setores da secretaria. A ação tem como objetivo promover maior eficiência operacional, melhor organização dos processos internos e mais conforto para servidores e cidadãos.' and o.numero = 1
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Realizar a reforma de aproximadamente do imóvel localizado na Av. Rondon Pacheco, nº 5000, e promover a transferência integral da Secretaria Municipal de Serviços Urbanos (SESURB) para esse local, visando ampliar em 50% o espaço físico atualmente disponível, adequar as condições de atendimento ao público e integrar fisicamente todos os setores da secretaria. A ação tem como objetivo promover maior eficiência operacional, melhor organização dos processos internos e mais conforto para servidores e cidadãos.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar a percepção de segurança para 60% e confiabilidade para 70% do transporte coletivo entre os usuários. (Fonte: pesquisa de satisfação anual com usuários)' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir integridade do programa Tarifa Zero Estudantil com índice de fraude inferior a 0,1%.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Valorizar e atrair investimentos para o sistema de transporte coletivo por meio da concessão de espaços publicitários em pontos de parada e logradouros até 2026, reinvestindo 80% no sistema de transporte coletivo e viário.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar a experiência dos usuários e promover inclusão digital, oferecendo internet gratuita em 100% da frota e estações do SIT até 2027.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Melhorar a experiência dos usuários e promover inclusão digital, oferecendo internet gratuita em 100% da frota e estações do SIT até 2027.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o acesso e a eficiência do transporte público com a implantação da integração modal e temporal em 100% do sistema até 2035' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar a cobertura e eficiência do transporte público, garantindo integração entre as regiões do município. Implantação de mais 1 Terminal e 3 Corredores' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar a oferta e a organização do serviço de táxi no município, garantindo melhor cobertura e atendimento à população por meio da regularização de 377 vagas até 2026.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir os impactos ambientais da mobilidade urbana, com 50% da frota de transporte público e credenciado composta por veículos de baixa emissão até 2035, contribuindo para a melhoria da qualidade do ar.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Modernizar 100% da rede semafórica com tecnologia digital e inteligência artificial até 2030' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Modernizar 100% da rede semafórica com tecnologia digital e inteligência artificial até 2030' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir acessibilidade em cruzamentos semaforizados, com implantação progressiva de botoeiras sonoras e acessíveis em 100% dos semáfaros até 2030, promovendo inclusão de pessoas com deficiência.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 30km da infraestrutura cicloviária para promover deslocamentos mais sustentáveis e seguros até o final de 2026' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar e qualificar a infraestrutura de calçadas em 02 localidades para promover deslocamentos mais sustentáveis e seguros.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aprovar o Plano de Mobilidade Urbana, garantindo que as decisões de médio e longo prazo estejam alinhadas às necessidades atuais da cidade e às diretrizes de desenvolvimento sustentável até final de 2027' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 4000 Vagas de estacionamento rotativo visando promover o uso racional do espaço urbano em áreas de alta demanda, priorizando rotatividade, manutenção contínua e melhor uso do solo urbano.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar 05 Projetos para reduzir a acidentalidade viária e ampliar a segurança no trânsito de intervenções estruturais, tecnológicas e de sinalização até 2028.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Proteger crianças e adolescentes nos trajetos escolares, reduzindo riscos e promovendo segurança ativa no entorno das instituições, realizando apresentação/capacitação em 100% das escolas ensino fundamental e médio.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar o alcance das campanhas educativas de trânsito em toda a sociedade, com a promoção na Educação para Mobilidade,realizando 100 cursos e apresentações fortalecendo ações preventivas a infrações de trânsito.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar Central de Conciliação com o foco em redução de 5% da judicialização dos casos de indenização contra o Município.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Arrecadar 10% do estoque de Dívida Ativa' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reduzir para 80% o índice de não recebiveis da Dívida Ativa.' and o.numero = 8
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Integrar os Sistemas da PRODAUB (SIAT e eDocs) com EGPJ com o foco em: 1- Aumentar a produtividade em 40% 2- Reduzir o tempo de análise 40%' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir os indices da Atenção Primária conforme Metas do Ministério da Saúde' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Cumprir os metas estabelecidas para Imunização, confore preconizado pelo Ministério da Saúde' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Atingir indicadores hospitalares conforme Resolução 8879/2023 referente ao Programa VALORA MINAS' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 13% o número de Unidades Básicas de Saúde da Família - UBSFs funcionando em imóveis próprios até 12/2028' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolver 13 ações em saúde para ampliar os serviços da Atenção Especializada e Hospitalar' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 5% ao ano o quantitativo de análises da qualidade da água até 12/2028.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Cumprir indicadores da vigilância eipidemiológica, conforme preconizado pelo Ministério da Saúde' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar em 10% ao ano o número de inspeções em ambientes de trabalho realizadas pelo CEREST até 12/2028 e construir a sede própria do CEREST' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Aumentar o número de inspeções sanitárias conforme o risco dos estabelecimentos para atingir o total de 70% dos estabelecimentos cadastrados inspecionados pela VISA até 2028' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantação da telemedicina até 06/2026.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Expansão/Implantação SAMU 192 em 100% até 12/2028.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar a cobertura da Saúde Bucal na Atenção Primária em 2,5% ao ano até 2029.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Capacitação de 100% dos profissionais da Rede para aprimoramento ao cuidado com o usúario até 12/2028.' and o.numero = 3
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 50% as adesões formais e a participação efetivado do Município em colegiados, entidades intermunicipais e instâncias federativas, fortalecendo sua inserção institucional e acesso a políticas públicas intergovernamentais.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Gerir os contratos de Tecnologia da Informação e Comunicação da Prefeitura de Uberlândia, garantindo disponibilidade, segurança e suporte aos sistemas corporativos, com índice geral de desempenho dos serviços ≥ 99%, assegurando a continuidade dos serviços públicos.' and o.numero = 9
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir 100% do Processo de Atendimento a Comunidade direcionando as demandas para as Secretarias responsáveis e dando conhecimento do andamento do Processo ao cidadão.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Implantar e consolidar, até o final de 2026, um processo contínuo de escuta ativa e diálogo estruturado com 90% dos setores territoriais definidos, integrando as demandas comunitárias mapeadas ao planejamento das políticas públicas.' and o.numero = 11
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Ampliar em 50% o acesso ao programa de tradução simultânea para surdos e mudos nos espaços públicos.' and o.numero = 10
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Manter em 100% o nível de conformidade documental e cadastral do Município nas plataformas de habilitação para transferências voluntárias.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elaborar propostas e acompanhar sua execução junto as Secretarias finalisticas, assegurando que 100% dos convênios e emendas estejam com documentação e execução fisico-financeira adequada, conforme os parâmetros estabelecidos pelos órgãos concedentes.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Garantir que 100% dos projetos elaborados estejam alinhados às demandas finalísticas das secretarias e às oportunidades externas de financiamento.' and o.numero = 17
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Elevar a eficiência operacional da frota municipal, por meio da execução sistemática das manutenções preventivas, redução de retrabalhos e aumento da disponibilidade dos veículos.' and o.numero = 12
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Desenvolver até 2027 métodos de acompanhamento que auxiliem no controle da manutenção da frota municipal e elevem a eficiência operacional, por meio da execução sistemática das manutenções preventivas, redução de retrabalhos e aumento da disponibilidade dos veículos.' and o.numero = 12
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Alteração no modelo de licitação de publicidade visando o aumento da produtividade de pelo menos 25%.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Reestruturação de 100% dos canais de comunicação.' and o.numero = 16
  on conflict do nothing;
insert into metas_ods (meta_id, ods_id)
  select m.id, o.id from metas m, ods o
  where m.municipio_id = '00000000-0000-0000-0000-000000000001' and m.nome = 'Otimização de 100% dos processo de atendimento ao público.' and o.numero = 16
  on conflict do nothing;

-- Conferência
select 'metas_com_ods' as item, count(distinct meta_id) from metas_ods
union all select 'vinculos_totais', count(*) from metas_ods;
