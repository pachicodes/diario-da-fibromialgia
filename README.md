# Gerenciando sua fibromialgia

Este projeto é um diário de fibromialgia que permite as usuárias registrar e acompanhar seus níveis de dor e fadiga, principais sintomas da doença.
A aplicação é construída em JavaScript e utiliza HTML e CSS para a interface da usuária.

## Sobre a Fibromialgia

A fibromialgia é uma condição crônica caracterizada por dor musculoesquelética generalizada, acompanhada por fadiga, distúrbios do sono, problemas de memória e alterações de humor. Afeta predominantemente mulheres (cerca de 80-90% dos casos diagnosticados), com maior incidência entre 30 e 50 anos de idade.

### Principais características:
- **Dor generalizada**: Dor persistente que afeta ambos os lados do corpo, acima e abaixo da cintura
- **Fadiga crônica**: Cansaço extremo mesmo após períodos adequados de sono
- **Distúrbios cognitivos**: Dificuldade de concentração e memória (também chamado de "fibro fog")
- **Sensibilidade aumentada**: Hipersensibilidade a estímulos como toque, luz, som e mudanças de temperatura

O acompanhamento diário dos sintomas é fundamental para o gerenciamento eficaz da condição, auxiliando no reconhecimento de padrões, identificação de gatilhos e na comunicação mais precisa com profissionais de saúde.

## Estrutura do Projeto

- **src/**: Contém todos os arquivos da aplicação.
  - **assets/**: Contém os recursos da aplicação.
    - **css/**: Estilos da aplicação.
      - `styles.css`: Define a aparência visual dos componentes.
    - **js/**: Scripts da aplicação.
      - `app.js`: Ponto de entrada da aplicação, gerencia a interação entre os componentes.
      - **components/**: Componentes reutilizáveis.
        - `painTracker.js`: Classe para registrar o nível de dor de 1 a 10.
        - `fatigueTracker.js`: Classe para registrar o nível de fadiga de 1 a 10.
      - **services/**: Serviços para gerenciamento de dados.
        - `dataService.js`: Funções para armazenamento e recuperação de dados do diário.
      - **utils/**: Funções utilitárias.
        - `dateUtils.js`: Funções para manipulação de datas.
  - `index.html`: Página principal da aplicação.
  - **pages/**: Páginas da aplicação.
    - `dashboard.html`: Página para registrar níveis de dor e fadiga.
    - `history.html`: Página para visualizar registros anteriores.
    - `settings.html`: Página para ajustar preferências da aplicação.
- `package.json`: Configuração do npm, lista de dependências e scripts.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd gerenciando-fibromialgia
   ```
3. Instale as dependências:
   ```
   npm install
   ```

## Uso

1. Abra o arquivo `index.html` em um navegador.
2. Utilize a página do painel para registrar seus níveis de dor e fadiga.
3. Acesse a página de histórico para visualizar registros anteriores.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.