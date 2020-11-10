import React from 'react';
import Styled from 'styled-components'
import Carta from './components/Carta'

import './App.css';
import axios from 'axios';
import CartasSub from './components/CartasSub';
import Filtros from './components/Filtros'
import CardBack from './imgs/card-back.jpg'
import logo from './imgs/logo-bg.png'

//rgb(226, 25, 9) - vermelho

const Buttons = Styled.button`
display: inline-block;
padding: 0.35em 1.2em;
border:0.1em solid #FFFFFF;
margin:0.2em 0.3em;
border-radius:0.12em;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
color:#FFFFFF;
text-align:center;
transition: all 0.2s;
background-color: rgba(226,25,9, 0.4);
&:hover {
color: rgba(226,25,9, 0.4);
border: 0.1em solid rgba(226,25,9, 0.4);
background-color: #FFFFFF;
}
`

const Logo = Styled.img`
width: 80%;
`

const Header = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;
margin: 0 25%;
`

const SearchBar = Styled.div`
width: 80%;
display: flex;
justify-content: space-between;
`
const Bar = Styled.input`
flex-grow: 1;
background-color: rgba(255, 255, 255, 0.5);
color: white;
font-size: 1.2em;
margin: 0 0.2em;
`


class App extends React.Component {
  
  state = {
    api_link_name: 'https://api.magicthegathering.io/v1/cards',    
    nameQuery: "",
    parsedName: "",
    carta: [],

    nome: "",
    mana: 0,
    cor: "",
    tipo: "",
    poder: 0,
    resistencia: 0,
    texto: "",
    raridade: "",
    foto: `${CardBack}`,


    cartasSub: [],
    poderFiltro: false,
    resistenciaFiltro: false,
    manaFiltro: false,
    raridadeFiltro: false
    
  }


  
  onchangenamequery = (event) => {

    this.setState({nameQuery: event.target.value})
    //console.log(this.state.nameQuery)
    this.nameParse(this.state.nameQuery)
  }

  nameParse = (name) => {
    
    let a = name.split(" ");
    this.setState({parsedName: a.join(", ")})
    //console.log(this.state.parsedName)

  }

  onChangeFiltroPoder = () => {
    this.setState({poderFiltro: !this.state.poderFiltro})
    
  }

  onChangeFiltroResistencia = () => {
    this.setState({resistenciaFiltro: !this.state.resistenciaFiltro})
    
  }

  onChangeFiltroMana = () => {
    this.setState({manaFiltro: !this.state.manaFiltro})
    
  }

  onChangeFiltroRaridade = () => {
    this.setState({raridadeFiltro: !this.state.raridadeFiltro})
    
  }

  pressionouEnter = (event) => {
    if(event.keyCode === 13) {
      //console.log(event.keyCode)
      this.searchCard()
    } else {return true}
  }
  
  searchCard = () => {
    
    axios.get(this.state.api_link_name+"/?name="+this.state.parsedName).then(response => {

      this.setState({carta: response.data.cards[0]})
      
      //console.log(this.state.carta.cmc)

      this.setState({nome: this.state.carta.name})
      this.setState({mana: this.state.carta.cmc})
      this.setState({cor: this.state.carta.colors})
      this.setState({tipo: this.state.carta.types})
      this.setState({poder: this.state.carta.power})
      this.setState({resistencia: this.state.carta.toughness})
      this.setState({texto: this.state.carta.text})
      this.setState({raridade: this.state.carta.rarity})
      this.setState({foto: this.state.carta.imageUrl})
      
    })

    

}

  lookForSubs = () => {

    axios.get(this.state.api_link_name+"/?colors="+this.state.cor+"&types="+this.state.tipo).then(response => {

      console.log(response.data.cards)
      this.setState({cartasSub: response.data.cards})
    })

  }

  filtrarLista = () => {

      return this.state.cartasSub.filter((carta) => {
        
        let poder;
        let resistencia;
        let mana;
        let raridade;

        if(this.state.poderFiltro) {
          if(Number(carta.power) < Number(this.state.poder) + 2 && Number(carta.power) > Number(this.state.poder) - 2) {
            poder = true;
          } else {poder = false}
        } else {poder = true}
        
        if(this.state.resistenciaFiltro) {
          if(Number(carta.toughness) < Number(this.state.resistencia) + 2 && Number(carta.toughness) > Number(this.state.resistencia) - 2) {
            resistencia = true;
          } else {resistencia = false}
        } else {resistencia = true}
      
        if(this.state.manaFiltro) {
          if(Number(carta.cmc) < Number(this.state.mana) + 2 && Number(carta.cmc) > Number(this.state.mana) - 2) {
            mana = true;
          } else {mana = false}
        } else {mana = true}

        if(this.state.raridadeFiltro) {
          if(carta.rarity === this.state.raridade) {
            raridade = true
          } else {raridade = false}
        } else {raridade = true}

        return (poder&&resistencia&&mana&&raridade);
      
      })
      
    }
  
  
  render() {

   
    const listaFiltrada = this.filtrarLista()

    return (
      <div className="App">

        <Header>
          <h1>Substituição de Cartas</h1>
          
          <Logo src={logo} />
          
          <SearchBar>
          <Bar type="text" value={this.state.nameQuery} onChange={this.onchangenamequery} onKeyUp={this.pressionouEnter} />
          <Buttons onClick={this.searchCard} > Procurar Carta </Buttons>
          </SearchBar>
        </Header>

        <Carta 
          nome={this.state.nome}
          mana={this.state.mana}
          cor={this.state.cor}
          tipo={this.state.tipo}
          poder={this.state.poder}
          resistencia={this.state.resistencia}
          texto={this.state.texto}
          raridade={this.state.raridade}
          foto={this.state.foto}
        />

        <Buttons onClick={this.lookForSubs}> Procurar Cartas Substitutas</Buttons>

        <br />
        
      <Filtros
        poderfiltro={this.onChangeFiltroPoder} 
        resistenciafiltro={this.onChangeFiltroResistencia}
        manafiltro={this.onChangeFiltroMana}
        rarityfiltro={this.onChangeFiltroRaridade}
      />

        <CartasSub cartassub={listaFiltrada} />
      
        
      </div>
    )
  }
}

export default App;

