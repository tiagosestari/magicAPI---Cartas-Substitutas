# Magic The Gathering - Cartas Substitutas (Deck Builder Tool)

#### Esse projeto foi desenvolvido em React usando as libs de Styled Components e Axios, consumindo a API do Magic The Gathering em https://docs.magicthegathering.io/#documentationgetting_started 


## Introdução

Esse projeto foi desenvolvido como uma ferramenta simples para ajudar jogadores a construirem seus decks. Muitas vezes é comum consultarmos listas de decks em sites e precisar de cartas específicas, mas não ser possível comprá-las no momento. Nesse sentido a ferramenta auxilia a encontrar cartas substitutas que mantenham de alguma forma o balanceamento do Deck.


## Dados da carta (GET - Request)

Utilizando a API do Magic, o app possibilita trazer as informações da carta procurando pelo nome. É feito um Get Request no endpoint da API usando o Parâmetro de Nome e o próprio App cuida de todo o parsing do texto digitado.
Vale apontar que a caixa de texto aceita pressionar enter para enviar o comando de busca, pensando na experiência de usuário.

Os parâmetros retornados são:
- Nome da carta
- Custo de invocar
- Cor
- Tipo Principal
- Poder
- Resistência
- Poderes
- Raridade

![alt text](https://github.com/tiagosestari/magicAPI---Cartas-Substitutas/blob/master/src/imgs/telacarta.PNG)

## Cartas Substitutas (GET - Request 2)

O segundo botão faz um novo Get Request no mesmo endpoint, mas usa os parâmetros Cor e Tipo Principal que foram salvos no estado da aplicação quando no primeiro processo.
Assim, retorna uma lista com 100 cartas que sejam da mesmo cor e do mesmo tipo.

Essa lista pode ser filtrada por:
- Poder (diferença máxima de +1 ou -1)
- Resistência (diferença máxima de +1 ou -1)
- Custo de Mana (diferença máxima de +1 ou -1)
- Raridade (igual a da carta)

![alt text](https://github.com/tiagosestari/magicAPI---Cartas-Substitutas/blob/master/src/imgs/telasemfiltros.PNG)

Assim, é possível filtrar a lista de acordo com o que for mais importante para a estratégia do seu deck. Se for manter o custo médio de invocar, pode filtrar por Custo de Mana, se o principal for a força das cartas, essa pode ser a variável, se for necessário trazer cartas que preservem o custo de mana e a resistência pois está utilizando uma estratégia de levantar rapidamente defesas baratas, os dois filtros atuaram em conjunto.  

![alt text](https://github.com/tiagosestari/magicAPI---Cartas-Substitutas/blob/master/src/imgs/telafiltros.PNG)
