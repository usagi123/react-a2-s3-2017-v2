import React from 'react'
import {fetchProducts, deleteProduct, addProduct, getProduct, updateProduct,addToCart} from './main.js'
import './styles/product-styles.css'

export default class ChangeView extends React.Component {
    
        constructor() {
            super()
    
            this.state ={
                id: '', name: '', price: '', description: '',
                brand: '', producer: '', imageUrl: ''
        
            }
        }
    
        componentDidMount(){
            this.props.dispatch(fetchProducts())
        }
    
        componentWillReceiveProps(props){
            this.setState(props.editedProduct)
        }
    
        handleSave(){
            if(this.state._id === undefined || this.state._id ==='')
                this.props.dispatch(addProduct(this.state))
            else    
                this.props.dispatch(updateProduct(this.state))
        }
    
        handleDelete(_id) {
            if (confirm('Do you want to delete?')) {
                this.props.dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: _id
                })
                this.props.dispatch(deleteProduct(_id))
    
            }
        }
        handleAddToCart(newState){
            console.log(newState)
            this.props.dispatch(addToCart(newState))
        }
        handleView(_id){
            this.props.dispatch({type:'VIEW_PRODUCT',payload: _id})
            //View the only product without interfere with the fetched data
        }
        handleEdit(id){
            this.props.dispatch(getProduct(id))
        }
        
        handleChange(e) {
            let change = {}
            change[e.target.name] = e.target.value
            this.setState(change)
        }
        
    
        render() {
            return (
                <div className="container">
                    <div className='header'>
                    <h2>Product Form</h2>
                    </div>
                    <table style={{ width:"50%",borderWidth:"2px", borderColor:"#dddddd"}}>
                        <tbody>
                        <tr>
                        <td>ID</td>
                        <td><input type="text" name='id' value={this.state.id}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name='name' value={this.state.name}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type="text" name='price' value={this.state.price}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input type="text" name='description' value={this.state.description}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td><input type="text" name='brand' value={this.state.brand}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Producer</td>
                            <td><input type="text" name='producer' value={this.state.producer}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td><input type="text" name='imageUrl' value={this.state.imageUrl}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="footer">
                    <input type='button' className='button' value='Save' onClick={this.handleSave.bind(this)}/>
                    </div>
                
                    <div className='header'><h2>Product List</h2></div>
                    <div className="grid">
                    {this.props.products.map((product, i) =>
                        
                        <div>
                        <br/>
                        <table style={{textAlign:"center"}}>
                        <tr>
                            <td>ID : {product.id}</td>
                            <td>{product.name}</td>
                            <td>status:<button disabled={product.exist>0?'':'disable'}>
                            {product.exist>0?`${product.exist}`:'Sold Out'} 
                            </button>
                </td>
                        </tr>
                        </table>
                        <br/>
                        <img className="image2" src={product.imageUrl} />
                        <br/>
                        <div key={i} className="footer">
                        <table>
                            <tr>
                                <td>
                        <a className="button" value='Delete' onClick={() => this.handleDelete(product._id)}><img className='icon' src='./icons/rubbish-bin.png'/></a>
                        </td>
                        <td>
                        <a className="button" value='Edit' onClick={() => this.handleEdit(product._id)}><img className='icon' src='./icons/new-file.png'/></a>
                        </td>
                        <td><a href='#' type='button' onClick={(e)=>{
                                            let id = product.id
                                            var name = product.name
                                            var price = product.price
                                            var description = product.description
                                            var brand = product.brand
                                            var producer = product.producer
                                            
                                            return(alert("Product Name : "+ name 
                                            +"\n"+ "Price : " + price
                                            +"\n"+ "Description : " + description
                                            +"\n"+ "Brand : " + brand
                                            +"\n"+ "Producer : " + producer
                                            ))
        
                                            }
                                        }>
                                        Details</a>
                        </td>
                        <td>
                        <a  onClick={() => {
                                    let newState = {}
                                    newState['id']= product.id
                                    newState['name']= product.name
                                    newState['price']= product.price
                                    newState['description']= product.description
                                    newState['brand']= product.brand
                                    newState['producer']= product.producer
                                    newState['imageUrl']= product.imageUrl
                                    product.exist = product.exist - 1
                                    this.handleAddToCart(newState)
                                        }}><img className='hide'  width ='25px' height = '20px' src='./icons/cart.png'/></a>
                        </td>
                        </tr>
                        </table>
                                    </div>
                
                                </div>)}
                                </div>
                </div>
                
            )
        }
    }