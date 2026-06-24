# Backlog — Atlia

Itens levantados para evolução futura do produto. Não estão priorizados nem detalhados em plano técnico — servem como registro de ideias a desenvolver.

## 1. Responsáveis por atualização de status dos projetos
Permitir designar um ou mais usuários como responsáveis pela atualização de status de cada projeto. As atualizações registradas (quem, quando, o que mudou) devem aparecer como histórico no detalhamento do projeto (`/dashboard/projetos/[id]`).

## 2. CRUD de Metas Estratégicas ✅ Concluído
Criar uma camada de "metas" entre objetivos e projetos. Cada objetivo estratégico pode ter várias metas, e os projetos passam a se vincular a metas (não diretamente ao objetivo). Precisa de tela própria em Configurações, formulário (`MetaForm`) e ajuste nas páginas que hoje relacionam projeto → objetivo.

*Entregue: tabela `metas` + RLS, `MetaForm.tsx`, aba em Configurações, página própria `/dashboard/metas` no menu lateral, e carga real das 322 metas extraídas da planilha.*

## 3. Relacionar objetivos/metas aos ODS (Objetivos de Desenvolvimento Sustentável da ONU)
Permitir vincular um ou mais dos 17 ODS a cada objetivo ou meta estratégica. Útil para relatórios de impacto e prestação de contas. Precisa de tabela de referência com os 17 ODS (ícone, número, cor oficial) e relação N:N.

## 4. Campo de gestão de custo do projeto
Adicionar controle financeiro ao projeto: valor orçado, valor empenhado/gasto, fonte de recurso. Pode evoluir para um histórico de lançamentos de custo por projeto, com indicador de % do orçamento utilizado.

## 5. Avaliar mais "temas" de gerenciamento de projetos
Investigar quais outras dimensões de PM vale a pena adicionar (riscos, equipe/responsáveis, dependências entre projetos, anexos/documentos, cronograma com marcos — já existe `marcos`). Definir prioridade após avaliação.

## 6. Estrutura de ponderação em cascata (projeto → meta → objetivo → visão) ✅ Concluído
Criar pesos configuráveis: cada projeto tem um peso dentro da sua meta, cada meta um peso dentro do objetivo, cada objetivo um peso dentro da visão de futuro do município. Com isso, calcular um indicador agregado de "quão perto o município está da visão de futuro" — um % consolidado que sobe a cascata ponderada de progresso.

*Entregue: coluna `peso` em projetos/metas/objetivos (com os pesos reais dos 12 objetivos carregados da planilha), cálculos ponderados em todas as páginas (Objetivos, Metas, Mapa Estratégico, Painel Executivo, Relatórios), e novo indicador "Atingimento da Visão" ponderado por todos os objetivos.*

## 13. Limpeza de indicadores demo + Análise da Carteira de Projetos ✅ Concluído
Os 12 indicadores exibidos em `/dashboard/indicadores` eram dados de demonstração (seed da migration 002) que nunca foram substituídos por dados reais. Substituídos por uma seção de análise da carteira de projetos com gráficos reais.

*Entregue: migração `014_limpar_indicadores_demo.sql` removendo os indicadores fictícios; nova seção "Análise da Carteira de Projetos" na página de Indicadores com gráficos de projetos por status, projetos atrasados, status por secretaria (barras empilhadas), projetos por secretaria e projetos por previsão de encerramento (ano). O CRUD de indicadores (KPIs) continua disponível, separado, para cadastro de indicadores reais no futuro.*

## 7. Notificações e alertas
Avisar usuários (in-app e/ou e-mail) quando: um indicador sair da meta, um projeto atrasar (passar do `data_fim` sem concluir), ou um marco vencer. Hoje não existe nenhum mecanismo de alerta — a informação só aparece se alguém entrar e olhar.

## 8. Log de auditoria
Registrar quem alterou o quê e quando nas entidades principais (projetos, indicadores, status). Importante em gestão pública para rastreabilidade — hoje não há histórico de alterações, só o estado atual.

## 9. Exportação de dados além do PDF
Hoje só existe exportação de relatórios em PDF. Avaliar exportar para Excel/CSV (projetos, indicadores, medições) para uso em outras ferramentas da prefeitura.

## 10. Testes automatizados
O projeto não tem nenhum teste (unitário ou e2e) hoje. Conforme o número de fluxos críticos crescer (convite, RLS multi-secretaria, relatórios), a falta de testes aumenta o risco de regressão silenciosa.

## 11. Página de Privacidade/Termos (LGPD)
A landing page já captura leads (nome, e-mail, telefone, município) via formulário, mas não há política de privacidade nem termos de uso publicados — exigência básica de LGPD para coleta de dados pessoais.

## 12. Confirmar premissa de single-tenant
Várias queries (ex.: `municipios.select('id').single()`) assumem que existe exatamente um município no banco. Se a estratégia for vender Atlia para várias prefeituras dentro do mesmo projeto Supabase (multi-tenant), isso precisa ser revisto antes de o segundo cliente entrar.

---

## Pendências operacionais (curto prazo)
Itens de configuração/deploy já identificados e ainda não confirmados como concluídos:
- Rodar a migração `009_secretarias_multiplas.sql` no Supabase SQL Editor
- Colar os templates de e-mail (convite e recuperação de senha) em Authentication → Emails no Supabase
- Confirmar o Site URL em Authentication → URL Configuration (`https://www.atlia.com.br`)
- Verificar o domínio atlia.com.br no Resend (hoje só envia notificação de lead para o próprio e-mail)
- Dar push dos commits pendentes para o Vercel
- Depoimentos reais: aguardando retorno da Prefeitura de Uberlândia e da UFU
- Bot de WhatsApp: adiado até existir número de telefone da empresa
