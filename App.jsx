import React from 'react'
import {fetchProducts, deleteProduct, addProduct, getProduct, updateProduct, addToCart, updateCart} from './main.js'
import './styles/product-styles.css'

export default class App extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: '', price: '', description: '',
            brand: '', producer: '', exist: 0, imageUrl: ''
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchProducts())
    }
    
    componentWillReceiveProps(props){
        this.setState(props.editedProduct)
    }


    handleSave(){
        if(this.state.id === '' || this.state.name ===''
        ||this.state.price === '' ||this.state.description === '' ||this.state.brand === '' || this.state.producer ==='' ){
                    alert('Please check the form')
                    return false
                }
        else{
        if(this.state._id === undefined || this.state._id ==='')
            this.props.dispatch(addProduct(this.state))
        else    
            this.props.dispatch(updateProduct(this.state))
    }
    }
    handleAddToCart(newState){
        console.log(newState)
        this.props.dispatch(addToCart(newState))
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
                
            <div className='left'>
                <div className='header'>
                    <h2>Product List</h2>
                    </div>

                    {this.props.products.map((product) =>
                    <div className="list">
                        <br/>
                        <table  style={{width:"100%", textAlign:"left"}}>
                        <tbody>
                        <tr>
                            <td>ID : {product.id}</td>
                            <td>{product.name}</td>
                    <td>status:<button disabled={product.exist>0?'':'disable'}>
                    {product.exist>0?`${product.exist}`:'Sold Out'} 
                    </button>
                </td>
                        </tr>
                        </tbody>
                        </table>
            
                    <img className="image1" src={product.imageUrl} />
                    <br/>
                        <div className="footer">
                        <li><table><tbody>
                            <tr>
                            <td>
                            <a onClick={() => this.handleDelete(product._id)}><img className='icon' src='./icons/rubbish-bin.png'/></a>
                            </td>
                            <td>
                            <a onClick={() => this.handleEdit(product._id)}><img className='icon' src='./icons/new-file.png'/></a>
                            </td>
                            <td>
                            <a href="#" onClick={(e)=>{
                                    let id = product.id
                                    var name = product.name
                                    var price = product.price
                                    var description = product.description
                                    var brand = product.brand
                                    var producer = product.producer
                                    var exist = product.exist

                                    
                                    

                                    return(alert("Product Name : "+ name 
                                    +"\n"+ "Price : " + price
                                    +"\n"+ "Description : " + description
                                    +"\n"+ "Brand : " + brand
                                    +"\n"+ "Producer : " + producer
                                    +"\n"+ "Exist : " + exist
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
                                    let updateState = {_id: product._id, id: product.id, name: product.name, price: product.price, description: product.description,brand: product.brand, producer: product.producer,
                                    exist: product.exist, imageUrl: product.imageUrl }
                                    this.props.dispatch(updateProduct(updateState))
                                    this.handleAddToCart(newState)
                                        }
                                    } ><img className='icon'  width ='25px' height = '20px' src='./icons/cart.png'/></a>
                                </td>
                                </tr>
                                </tbody></table>
                        </li>
                        </div>
        
                    </div>)}
                    
            </div>

            <div className="right">
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
                            <td>Exist</td>
                            <td><input type="number" name='exist' value={this.state.exist}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td><input type="text" name='imageUrl' value={this.state.imageUrl}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        
                    
                    <tr className="footer">
                        <td>
                            <input type='button' className='button' value='Save' onClick={()=>this.handleSave()}/>
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    </tbody>
                    </table>
            </div>
            </div>
        )
    }
}

