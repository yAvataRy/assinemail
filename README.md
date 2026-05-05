# AssineMail - Gerador de Assinaturas de E-mail Premium

[![Live Demo](https://img.shields.io/badge/🌐_Demo_ao_Vivo-assinemail.vercel.app-blue?style=for-the-badge)](https://assinemail.vercel.app/)
[![License: MIT](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)](LICENSE)
[![Built with Nuxt](https://img.shields.io/badge/Feito_com-Nuxt_4-61DAFB?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Um gerador de assinaturas de e-mail moderno e profissional que permite a profissionais, empresas e freelancers criar assinaturas personalizadas e impressionantes em minutos. Possui visualização em tempo real, múltiplos modelos premium, geração de QR code e recursos de exportação integrados.

## Índice

- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Início Rápido](#início-rápido)
- [Guia de Uso](#guia-de-uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Cronograma (Roadmap)](#cronograma)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Recursos

### Funcionalidades Principais

| Recurso                   | Descrição                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **Personalização Total**  | Adicione nome, e-mail, telefone, localização, cargo, empresa, site e links de redes sociais |
| **Galeria de Modelos**    | Diversos modelos desenhados profissionalmente com opções premium                            |
| **Preview em Tempo Real** | Veja as alterações instantaneamente enquanto personaliza sua assinatura                     |
| **Gerador de QR Code**    | Gere QR codes para WhatsApp, LinkedIn ou qualquer URL personalizada                         |
| **Exportação em HTML**    | Exporte assinaturas como HTML limpo e compatível com clientes de e-mail                     |
| **Gestão de Perfis**      | Salve, carregue e gerencie múltiplos perfis de assinatura                                   |
| **Integração Calendly**   | Adicione links de agendamento de reuniões diretamente na sua assinatura                     |
| **Tema Escuro/Claro**     | Alterne entre temas para uma edição mais confortável                                        |
| **Design Responsivo**     | Funciona perfeitamente em desktop, tablet e dispositivos móveis                             |

### Recursos Premium

- Modelos premium exclusivos
- Opções avançadas de personalização
- Suporte prioritário
- Opções de branding para times/empresas

### Autenticação e Gestão de Usuários

- Sistema de login seguro
- Painel de perfil pessoal
- Armazenamento em nuvem das assinaturas salvas

## Tecnologias

### Frontend

- **Nuxt** 4 - Framework Vue.js moderno
- **TypeScript** 5.8.3 - JavaScript com tipagem estática
- **Tailwind CSS** 3.4.17 - Framework CSS utilitário

### Componentes de Interface (UI)

- **Radix UI** - Primitivos de UI acessíveis e sem estilo (mais de 40 componentes)
- **shadcn/ui** - Sistema de componentes com design moderno
- **Framer Motion** - Biblioteca de animações pronta para produção
- **Lucide React** - Biblioteca de ícones

### Formulários e Validação

- **React Hook Form** - Biblioteca de formulários de alta performance
- **Zod** - Validação de esquemas focada em TypeScript
- **@hookform/resolvers** - Resolver para integração com Zod

### Dados e Estado

- **TanStack React Query** - Sincronização poderosa de dados
- **Vue Router** - Roteamento no lado do cliente

### Bibliotecas de Funcionalidades

- **qrcode** + **html-to-image** - Geração de QR e exportação de HTML
- **Recharts** - Biblioteca de gráficos compuníveis
- **date-fns** - Biblioteca moderna de utilitários de data
- **cmdk** - Paleta de comandos rápida e compunível
- **embla-carousel-react** - Componente de carrossel suave
- **sonner** - Componente de toasts (notificações)
- **vaul** - Componente de gaveta (drawer) para Vue

### Testes

- **Vitest** - Executor de testes unitários veloz
- **Testing Library** - Utilitários simples para testes em Vue
- **Playwright** - Testes de ponta a ponta (E2E) confiáveis

## Início Rápido

### Pré-requisitos

- Node.js 18+ ou Bun
- Gerenciador de pacotes npm, yarn ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seunome/signature-studio.git
cd signature-studio

# Instale as dependências
npm install
# ou
bun install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
bun run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
npm run preview  # Visualize o build de produção localmente
```

## Guia de Uso

1. **Acesse** a aplicação em [https://assinemail.vercel.app/](https://assinemail.vercel.app/)
2. **Preencha seus dados** - nome, cargo, empresa, e-mail, telefone, site e links sociais.
3. **Escolha um modelo** - navegue pela galeria e selecione seu design favorito.
4. **Personalize** - ajuste cores, layout e informações conforme necessário.
5. **Visualize em tempo real** - veja exatamente como sua assinatura ficará.
6. **Adicione QR Code** (opcional) - gere um código para WhatsApp, LinkedIn ou URL customizada.
7. **Exporte** - baixe sua assinatura como HTML para usar no seu cliente de e-mail.
8. **Salve o Perfil** - armazene sua assinatura para edições futuras.

## Estrutura do Projeto

```
signature-studio/
├── public/                  # Arquivos estáticos
│   ├── favicon.ico         # Favicon do site
│   ├── placeholder.svg     # Imagens de marcação
│   └── robots.txt          # Arquivo SEO robots
├── app/
│   ├── components/          # Componentes Vue
│   │   ├── signature/      # Componentes específicos da assinatura
│   │   │   ├── SignatureForm.vue       # Formulário de entrada
│   │   │   ├── SignaturePreview.vue    # Preview ao vivo
│   │   │   ├── TemplateSelector.vue    # Seletor de modelos
│   │   │   └── ExportActions.vue      # Funcionalidades de exportação
│   │   └── ui/             # Biblioteca de componentes shadcn/ui (mais de 50)
│   ├── pages/              # Páginas de rotas
│   │   ├── index.vue       # Gerador principal
│   │   ├── login.vue       # Autenticação
│   │   ├── plans.vue       # Planos premium
│   │   ├── profiles.vue    # Perfis salvos
│   │   └── NotFound.vue    # Página 404
│   ├── templates/          # Definições dos modelos de assinatura
│   ├── stores/             # Gerenciamento de estado
│   ├── hooks/              # Hooks Vue personalizados
│   ├── lib/                # Funções utilitárias
│   ├── types/              # Definições de TypeScript
│   ├── test/               # Utilitários de teste
│   ├── App.vue             # Componente principal com roteamento
│   ├── main.ts             # Ponto de entrada da aplicação
│   ├── index.css           # Estilos globais
│   └── App.css             # Estilos específicos do App
├── index.html              # Ponto de entrada HTML
├── nuxt.config.ts          # Configuração do Nuxt
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
├── package.json            # Dependências e scripts
├── eslint.config.js        # Configuração do ESLint
├── playwright.config.ts    # Configuração de E2E do Playwright
└── vitest.config.ts        # Configuração de testes do Vitest
```

## Scripts Disponíveis

| Script               | Descrição                                    |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Inicia o servidor de desenvolvimento com HMR |
| `npm run build`      | Cria o build de produção                     |
| `npm run build:dev`  | Cria o build em modo de desenvolvimento      |
| `npm run preview`    | Visualiza o build de produção localmente     |
| `npm run test`       | Executa testes unitários com Vitest          |
| `npm run test:watch` | Executa testes em modo observação            |
| `npm run lint`       | Executa verificações do ESLint               |

## Cronograma (Roadmap)

### Em breve

- [ ] **Integração com Clientes de E-mail** - Instalação em um clique para Gmail, Outlook, Apple Mail.
- [ ] **Customização Avançada** - Cores personalizadas, fontes e conjuntos de ícones.
- [ ] **Suporte Multi-idioma** - Inglês, Espanhol, Português.
- [ ] **Formatos de Exportação** - Opções de exportação em PNG e PDF.
- [ ] **Painel de Analytics** - Rastreie cliques e interações nos links da assinatura.

### Planos Futuros

- [ ] **Gestão de Equipes** - Assinaturas multiusuário para empresas.
- [ ] **Integração com CRM** - Conexão com HubSpot, Salesforce, Pipedrive.
- [ ] **Kit de Marca** - Upload de logotipos, cores da marca e fontes.
- [ ] **Geração em Massa** - Criação de assinaturas para equipes inteiras de uma vez.
- [ ] **Detecção de Cliente de E-mail** - Detecção automática e otimização para o cliente do usuário.

## Contribuição

Contribuições são bem-vindas! Veja como você pode ajudar:

1. **Faça um Fork** do repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/recurso-incrivel`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona recurso incrivel'`)
4. **Dê um Push** para a branch (`git push origin feature/recurso-incrivel`)
5. **Abra** um Pull Request

### Diretrizes de Desenvolvimento

- Siga o estilo de código existente (configuração ESLint fornecida).
- Escreva testes para novos recursos.
- Atualize a documentação conforme necessário.
- Use TypeScript para todo código novo.
- Siga as mensagens de commit convencionais (Conventional Commits).

## Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Links

- **Demo ao Vivo**: [https://assinemail.vercel.app/](https://assinemail.vercel.app/)
- **Problemas (Issues)**: [GitHub Issues](https://github.com/seunome/signature-studio/issues)
- **Discussões**: [GitHub Discussions](https://github.com/seunome/signature-studio/discussions)

---

<p align="center">
  Feito com ❤️ para profissionais que se preocupam com sua presença digital.
</p>
