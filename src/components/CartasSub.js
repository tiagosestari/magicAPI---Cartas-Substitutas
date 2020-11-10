import React from 'react';
import Styled from 'styled-components'

const TabelaDeCartasSub = Styled.table`
display: flex;
flex-direction: column;
justify-content: space-evenly;
margin: 2em 1em;
text-align: left;
`

const LinhaTabelaDeCartasSub = Styled.tr`
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
margin: 0.2em 1em;
text-align: left;
border: 1px solid black;
`

const Item = Styled.td`

margin: 2em 1em;
text-align: left;
`

class CartasSub extends React.Component {
  
    
    
    
    render() {
  
      return (
        <div className="Carta">

        <TabelaDeCartasSub>
            {this.props.cartassub.map((carta) => {

              return (
                <LinhaTabelaDeCartasSub>
                    <Item>{carta.name}</Item>
                    <Item>{carta.cmc}</Item>
                    <Item>{carta.colors}</Item>
                    <Item>{carta.types}</Item>
                    <Item>{carta.power}</Item>
                    <Item>{carta.toughness}</Item>
                    
                    <Item>{carta.rarity}</Item>

                </LinhaTabelaDeCartasSub>
              )
                
            
            }
            
            )
            
            }
        </TabelaDeCartasSub>  
        </div>
      )
    }
  }
  
  export default CartasSub;