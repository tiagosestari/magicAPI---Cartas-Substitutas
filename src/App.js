import React from 'react';
import Styled from 'styled-components'
import Carta from './components/Carta'

import './App.css';
import axios from 'axios';
import CartasSub from './components/CartasSub';



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
    foto: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129459&type=card",


    cartasSub: [],
    poderFiltro: false,
    resistenciaFiltro: false,
    manaFiltro: false
    
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

        return (poder&&resistencia&&mana);
      
      })
      
    }
  
  
  render() {

   
    const listaFiltrada = this.filtrarLista()

    return (
      <div className="App">
        
        <input type="text" value={this.state.nameQuery} onChange={this.onchangenamequery}></input>
        <button onClick={this.searchCard}> Search </button>

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

        <button onClick={this.lookForSubs}> Search for Subs</button>

        <br />
        
        <h2>Filtros:</h2>
        <input type="checkbox" name="poder" onChange={this.onChangeFiltroPoder} />
        <label for="poder">Poder</label>
        <input type="checkbox" name="resistencia" onChange={this.onChangeFiltroResistencia}/>
        <label for="resistencia">Resistência</label>
        <input type="checkbox" name="custo-de-mana" onChange={this.onChangeFiltroMana} />
        <label for="custo-de-mana">Custo de Mana</label>

        <CartasSub cartassub={listaFiltrada} />
      
        
      </div>
    )
  }
}

export default App;

