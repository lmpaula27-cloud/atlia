type Linha = Record<string, string | number | null | undefined>

function celula(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return ''
  return String(v)
}

export function exportarCSV(nomeArquivo: string, colunas: string[], linhas: Linha[]) {
  const esc = (v: string) => /[",;\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
  const cabecalho = colunas.join(';')
  const corpo = linhas.map(l => colunas.map(c => esc(celula(l[c]))).join(';')).join('\n')
  const csv = '﻿' + cabecalho + '\n' + corpo // BOM para acentuação correta no Excel
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  baixar(blob, `${nomeArquivo}.csv`)
}

export async function exportarExcel(nomeArquivo: string, nomeAba: string, colunas: string[], linhas: Linha[]) {
  const XLSX = await import('xlsx')
  const dados = linhas.map(l => {
    const obj: Record<string, string | number> = {}
    colunas.forEach(c => { obj[c] = celula(l[c]) })
    return obj
  })
  const ws = XLSX.utils.json_to_sheet(dados, { header: colunas })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, nomeAba)
  XLSX.writeFile(wb, `${nomeArquivo}.xlsx`)
}

function baixar(blob: Blob, nomeArquivo: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nomeArquivo
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
