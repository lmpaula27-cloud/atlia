import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      prefeituras: {
        Row: {
          id: string
          nome: string
          municipio: string
          uf: string
          porte: 'pequeno' | 'medio' | 'grande'
          plano_governo: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['prefeituras']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['prefeituras']['Insert']>
      }
      objetivos: {
        Row: {
          id: string
          prefeitura_id: string
          titulo: string
          descricao: string | null
          eixo: string
          ordem: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['objetivos']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['objetivos']['Insert']>
      }
      projetos: {
        Row: {
          id: string
          prefeitura_id: string
          objetivo_id: string | null
          nome: string
          descricao: string | null
          secretaria: string
          responsavel: string | null
          status: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'cancelado' | 'atencao' | 'atrasado'
          prioridade: 'alta' | 'media' | 'baixa'
          data_inicio: string | null
          data_fim_prevista: string | null
          data_fim_real: string | null
          percentual_conclusao: number
          orcamento_previsto: number | null
          orcamento_executado: number | null
          observacoes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projetos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projetos']['Insert']>
      }
      indicadores: {
        Row: {
          id: string
          prefeitura_id: string
          nome: string
          secretaria: string
          unidade: string
          meta: number
          valor_atual: number
          periodicidade: 'mensal' | 'trimestral' | 'anual'
          status: 'no_prazo' | 'atencao' | 'critico'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['indicadores']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['indicadores']['Insert']>
      }
      usuarios: {
        Row: {
          id: string
          prefeitura_id: string
          nome: string
          email: string
          perfil: 'prefeito' | 'secretario' | 'gestor' | 'visualizador'
          secretaria: string | null
          ativo: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['usuarios']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['usuarios']['Insert']>
      }
    }
  }
}
