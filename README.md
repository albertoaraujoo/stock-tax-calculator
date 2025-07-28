# 📊 Stock Tax Calculator

Uma calculadora de impostos sobre operações com ações brasileiras, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 O que o projeto faz

- ✅ **Calcula IR sobre vendas** de ações brasileiras (15% sobre lucros)
- ✅ **Gerencia prejuízos acumulados** para compensação futura
- ✅ **Exibe dashboard interativo** com resumo das posições
- ✅ **Mostra gráfico** das top 6 ações com maior IR devido
- ✅ **Interface responsiva** para desktop e mobile
- ✅ **Dados mockados** para demonstração

## 🛠️ Tecnologias utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Gráficos**: Recharts
- **Icons**: Lucide React
- **Deploy**: Vercel Ready

## 📋 Funcionalidades atuais

### 🏠 **Dashboard Principal**

- Resumo geral com total de operações
- Número de ações na carteira
- Total de IR devido
- Posições atuais consolidadas

### 📊 **Gráfico Interativo**

- Top 6 ações com maior IR devido
- Layout vertical responsivo
- Tooltip com valores detalhados
- Altura dinâmica baseada nos dados

### 📱 **Tabela/Cards Responsivos**

- **Desktop**: Tabela completa com todas as métricas
- **Mobile**: Cards deslizáveis horizontalmente
- Dados exibidos por ação:
  - Total de operações
  - Posição atual
  - Preço médio
  - Prejuízo acumulado
  - IR devido

### 🎯 **Dados de Demonstração**

- 25 ações mockadas com dados realistas
- Diferentes cenários: lucros, prejuízos, posições zeradas
- Valores de IR calculados automaticamente

## 🏗️ Estrutura do projeto

```
src/
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── ResumeSectionChart/ # Gráfico de IR por ação
│   ├── ResumeSectionTable/ # Tabela/Cards das ações
│   └── MobileStockCard/    # Card individual mobile
├── utils/
│   ├── getTopStocksIR.ts   # Filtra top ações por IR
│   └── formatCurrency.ts   # Formatação de moeda
├── mocks/
│   └── mockStocksSummary.ts # Dados de exemplo
├── types/
│   └── index.ts            # TypeScript interfaces
└── lib/
    └── utils.ts            # Utilitários gerais
```

## 🎨 Design System

### Cores principais

- **Purple Light**: `#A259FF` (Destaques e links)
- **Gray Dark**: `#232136` (Backgrounds)
- **Success**: Verde para lucros/posições
- **Danger**: Vermelho para prejuízos/IR devido

### Componentes UI

- Cards com bordas arredondadas
- Scrollbars customizadas
- Hover effects suaves
- Loading states preparados

## 🔧 Instalação e desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Setup local

```bash
# Clone o repositório
git clone https://github.com/albertoaraujoo/stock-tax-calculator
cd stock-tax-calculator

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Scripts disponíveis

```bash
npm run dev          # Servidor desenvolvimento (localhost:5173)
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## 📊 Como os cálculos funcionam

### Cálculo do IR (15%)

```typescript
// Exemplo: Venda com lucro
const lucro = (precoVenda - precoMedio) * quantidade;
const ir = lucro > 0 ? lucro * 0.15 : 0;
```

### Compensação de prejuízos

```typescript
// Prejuízos de uma ação compensam lucros futuros da mesma ação
const irDevido = Math.max(0, (lucro - prejuizoAcumulado) * 0.15);
```

### Dados mostrados por ação

- **Total de operações**: Número de compras/vendas
- **Posição atual**: Quantidade de ações em carteira
- **Preço médio**: Preço médio ponderado das compras
- **Prejuízo acumulado**: Perdas para compensação
- **IR devido**: Imposto a pagar sobre lucros realizados

## 🚀 Deploy para produção

### Opção 1: Vercel (Recomendado)

```bash
# Via CLI
npm i -g vercel
vercel login
vercel --prod
```

### Opção 2: Vercel Dashboard

1. Conecte seu repositório GitHub
2. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automático

### Opção 3: Build manual

```bash
npm run build
# Arquivos prontos em /dist
```

## 🤝 Como contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'Add: nova funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvedor

**Alberto Araújo**

- GitHub: [@albertoaraujoo](https://github.com/albertoaraujoo)
- LinkedIn: [Alberto Araújo](https://www.linkedin.com/in/albertoaraujoo/)

---

⭐ **Gostou do projeto? Deixe uma estrela!**

🐛 **Encontrou um bug?** [Abra uma issue](https://github.com/SEU_USUARIO/stock-tax-calculator/issues)
