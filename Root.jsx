import React from 'react'
import App from './App.jsx'
import ChangeView from './ChangeView.jsx'
import Order from './Order.jsx'
import About from './About.jsx'
import Categories from './Categories.jsx'
import ShoppingCart from './ShoppingCart.jsx'
import {connect} from 'react-redux'
import { editedCategory } from './main';

class Root extends React.Component{
    render(){
        let currentPath = window.location.pathname
        return(
            <div className="big">
                <div className="banner">
                    <img className='banner' src='./images/banner.jpg'/>
                </div>
                <div className="tag">
                    <div className="tag-left">
                        <ul>
                        <li><a href='/home'>Home</a></li>
                        <li><a href='/categories'>Categories</a></li>
                        <li><a href='/order'>Order</a></li>
                        <li><a href='/ShoppingCart'>ShoppingCart</a></li>
                        <li><a href='/about'>About Us</a></li>
                        </ul>
                    </div>
                    <div className="tag-right">
                        <ul>
                            <li><a href="/changeView">ChangeView</a> </li>
                        </ul>
                            
                    </div>
                   
                    
                    
                    
                    
                </div>   
                <div className="components">
                    {currentPath.includes('/about')?
                    <About />:
                    currentPath.includes('/changeView')?
                    <ChangeView dispatch={this.props.dispatch} products={this.props.products} />:
                    currentPath.includes('/categories')?
                    <Categories dispatch={this.props.dispatch} categories={this.props.categories} editedCategory={this.props.editedCategory} />:
                    currentPath.includes('/order')?
                    <Order dispatch={this.props.dispatch} orders={this.props.orders} editedOrder={this.props.editedOrder} />:
                    currentPath.includes('/ShoppingCart')?
                    <ShoppingCart dispatch={this.props.dispatch} products={this.props.products} carts={this.props.carts}/>:
                    <App dispatch={this.props.dispatch} products={this.props.products} editedProduct={this.props.editedProduct} editedProductToAdd={this.props.editedProductToAdd}
                     carts={this.props.carts}/>
                   

                    
                    }
                </div>
            </div>    
        )
    }
}
//


function mapStateToProps(centralState) {
    return {
        
        categories: centralState.categories,
        editedCategory: centralState.editedCategory,
        
        products: centralState.products,
        editedProduct: centralState.editedProduct,

        orders: centralState.orders,
        editedOrder: centralState.editedOrder,

        carts: centralState.carts,
    }
}
export default connect(mapStateToProps)(Root)
