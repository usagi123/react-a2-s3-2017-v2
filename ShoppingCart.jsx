import React from 'react'
import { fetchCarts, deleteCart, addToCart, addOrder } from './main.js';


export default class ShoppingCart extends React.Component{
    constructor() {
        super()

        this.state ={
            id: '', name: '', price: '', description: '',
            brand: '', producer: '', imageUrl: ''
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchCarts())
    }
    handleDelete(id){
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_CART',
                payload: id
            })
        this.props.dispatch(deleteCart(id))
        }
    }
    handleCheckOut(o){
        this.props.dispatch(addOrder(o))
    }
    render(){
        return(
            <div className="left">
                  <div>
                   <h3>Shopping Cart</h3>
                  </div>
                  <div>
                  <table style={{width:"100%", textAlign:"left"}}>
                    
                        <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Producer</th>
                        <th>Image</th>
                        </tr>
                    
                    {this.props.carts.map((cart, i)=>
                    
                        
                            <tr key={i}>
                                <td>{cart.id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.price}</td>
                                <td>{cart.description}</td>
                                <td>{cart.brand}</td>
                                <td>{cart.producer}</td>
                                <td><img src={cart.imageUrl} width="55px" height="55px" /></td>
                                <td><button onClick={()=>this.handleDelete(cart._id)}>Delete</button></td>
                                <td><a href='/order' onClick={()=>
                                    {   
                                        let order = {}
                                        order['total'] = cart.price
                                        order['imageUrl'] = cart.imageUrl
                                        this.handleCheckOut(order)
                                    }
                                    }>Check_Out</a></td>
                            </tr>
                            
                        
                    
                    )}
                    <div>
                    </div>
                    <div>
                    <a href='/order' type='button' value='Checkout'>Check_Out_All</a>
                    </div>
                        
                  </table>
                  </div>

                </div>


        )
    }
}