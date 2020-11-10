import React from 'react';
import Styled from 'styled-components'

const TabelaDeCarta = Styled.div`
display: flex;
justify-content: space-evenly;
margin: 2em 1em;
text-align: left;
`

class Carta extends React.Component {
  
    
    
    
    render() {
  
      return (
        <div className="Carta">

        <TabelaDeCarta>
            <div>
                <div>Nome: {this.props.nome}</div>
                <div>Custo de Mana: {this.props.mana}</div>
                <div>Cor: {this.props.cor}</div>
                <div>Tipo principal: {this.props.tipo}</div>
                <div>Poder: {this.props.poder}</div>
                <div>Resistência: {this.props.resistencia}</div>
                <div>Poderes: {this.props.texto} </div>
                <div>Raridade: {this.props.raridade}</div>
            </div>
            
            <div>
                <img src={this.props.foto} />
            </div>
        </TabelaDeCarta>  
        </div>
      )
    }
  }
  
  export default Carta;