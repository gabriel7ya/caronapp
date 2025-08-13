
# CaronApp - Documentação do Projeto

## 1. Visão Geral

O CaronApp é uma aplicação web moderna e responsiva projetada para facilitar o planejamento de rotas e o compartilhamento de caronas. A plataforma conecta motoristas com viagens planejadas a passageiros que buscam uma carona para o mesmo destino.

O foco é a simplicidade e a interação direta entre os usuários, permitindo que agendem viagens, definam custos (ou ofereçam a carona gratuitamente) e combinem o pagamento em dinheiro pessoalmente.

**Nota Importante:** Este projeto foi desenvolvido como uma **Aplicação Web com React**, utilizando Tailwind CSS para um design que se adapta bem a telas de desktop e dispositivos móveis. Embora a solicitação original mencionasse React Native, as diretrizes do ambiente de desenvolvimento especificam a criação de uma aplicação web. O resultado é uma experiência de usuário fluida e acessível de qualquer navegador.

## 2. Funcionalidades Principais

- **Busca de Caronas:** Passageiros podem buscar por caronas disponíveis informando origem, destino e data.
- **Oferta de Caronas:** Motoristas podem cadastrar suas viagens, especificando rota, data, horário, vagas disponíveis e um valor sugerido (ou indicar que é gratuita).
- **Agendamento Futuro:** Todo o sistema é baseado em agendamentos, permitindo que tanto motoristas quanto passageiros planejem suas viagens com antecedência.
- **Visualização de Detalhes:** Cards de viagem claros e objetivos mostram as informações mais importantes de cada carona.
- **Pagamento Direto:** A plataforma não processa pagamentos. O acerto de contas é feito em dinheiro, diretamente entre o motorista e o passageiro, conforme a especificação.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência em celulares, tablets e desktops.

## 3. Tech Stack

- **Frontend:** React 18+ com TypeScript
- **Roteamento:** React Router (usando `HashRouter` para compatibilidade)
- **Estilização:** Tailwind CSS
- **Ícones:** SVG embutidos como componentes React
- **Estrutura:** Componentes funcionais com Hooks

## 4. Estrutura do Projeto

O projeto é organizado com uma estrutura clara para facilitar a manutenção e escalabilidade.

```
/
├── public/
│   └── index.html       # Ponto de entrada HTML, carrega o Tailwind CSS
├── src/
│   ├── App.tsx          # Componente principal, gerencia o estado e as rotas
│   ├── index.tsx        # Ponto de entrada do React
│   ├── types.ts         # Definições de tipos TypeScript (Trip, User, etc.)
│   ├── constants.tsx    # Constantes globais e ícones SVG
│   ├── data/
│   │   └── mockData.ts  # Dados de exemplo para simular o backend
│   └── components/
│       ├── Header.tsx           # Cabeçalho da aplicação com navegação
│       ├── Footer.tsx           # Rodapé da aplicação
│       ├── HomePage.tsx         # Página inicial com o formulário de busca
│       ├── FindRidePage.tsx     # Página que exibe os resultados da busca
│       ├── OfferRidePage.tsx    # Página com o formulário para oferecer carona
│       └── TripCard.tsx         # Card reutilizável para exibir informações da viagem
└── README.md            # Esta documentação
```

## 5. Como Configurar

### Alterando o Nome do Aplicativo

O nome do aplicativo é definido como uma constante para que possa ser facilmente alterado em um único local.

1.  Abra o arquivo `src/constants.tsx`.
2.  Modifique o valor da constante `APP_NAME`.
3.  Todas as partes da aplicação que usam o nome serão atualizadas automaticamente.

```typescript
// src/constants.tsx

export const APP_NAME = "Seu Novo Nome Aqui";
```
