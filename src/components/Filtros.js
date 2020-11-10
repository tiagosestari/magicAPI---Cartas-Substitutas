import React from 'react';
import Styled from 'styled-components'

const FiltrosDiv = Styled.div`

`

class Filtro extends React.Component {
  
    
    
    
    render() {
  
      return (
        <div className="Filtro">

        <FiltrosDiv>
            <h2>Filtros:</h2>
            <p>[filtros de Poder, Resistência e Custo de Mana trazem cartas com valor máximo 1 de diferença. Filtro de raridade trás cartas da mesma categoria]</p>
            <input type="checkbox" name="poder" onChange={this.props.poderfiltro} />
            <label for="poder">Poder</label>
            <input type="checkbox" name="resistencia" onChange={this.props.resistenciafiltro}/>
            <label for="resistencia">Resistência</label>
            <input type="checkbox" name="custo-de-mana" onChange={this.props.manafiltro} />
            <label for="custo-de-mana">Custo de Mana</label>
            <input type="checkbox" name="rarity" onChange={this.props.rarityfiltro} />
            <label for="rarity">Raridade</label>
        </FiltrosDiv>  
        </div>
      )
    }
  }
  
  export default Filtro;