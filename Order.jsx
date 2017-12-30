import React from 'react'
import {fetchOrders, deleteOrder, addOrder, getOrder, updateOrder} from './main.js'
import './styles/product-styles.css'

export default class Order extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: '' ,email: '', phone:'', address: '', orderDate: '10/10/2017', imageUrl: '',  total: ''
    
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchOrders())
    }

    componentWillReceiveProps(props){
        this.setState(props.editedOrder)
    }

    handleSave(){
        if(this.state._id === undefined || this.state._id ==='')
            this.props.dispatch(addOrder(this.state))
        else    
            this.props.dispatch(updateOrder(this.state))
    }

    handleDelete(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_ORDER',
                payload: _id
            })
            this.props.dispatch(deleteOrder(_id))

        }
    }
    handleView(_id){
        this.props.dispatch({type:'VIEW_ORDER',payload: _id})
        //View the only product without interfere with the fetched data
    }
    handleEdit(id){
        this.props.dispatch(getOrder(id))
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
                <h1>Order Form</h1>
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
                        <td>Email</td>
                        <td><input type="text" name='email' value={this.state.email}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input type="text" name='phone' value={this.state.phone}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><input type="text" name='address' value={this.state.address}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>OrderDate</td>
                        <td><input type="text" name='orderDate' value={this.state.orderDate}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td><img src={this.state.imageUrl} width="40px" height="40px"/></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td><input type="text" name='total' value={this.state.total}
                        onChange={this.handleChange.bind(this)} />$</td>
                    </tr>
                    
                    </tbody>
                </table>
                <div className="footer">
                <input type='button' className='button' value='Save' onClick={this.handleSave.bind(this)}/>
                </div>
            
                <div className='header'><h1>Product Order</h1></div>
                    
                    
                    <div className="list">
                            <br/>
                            <table  style={{width:"100%", textAlign:"left"}}>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>OrderDate</th>
                                <th>Total</th>
                            </tr>
                            {this.props.orders.map((i) =>
                            <tr style={{textAlign:"center"}}>
                            
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.phone}</td>
                                <td>{i.address}</td>
                                <td>{i.orderDate}</td>
                                <td>{i.total}$</td>
                                <img src={i.imageUrl} width="40px" height="40px"/>
                                <td>
                                    <button type='button' className="button" value='Delete' onClick={() => this.handleDelete(i._id)}>Delete</button>
                                </td>
                                <td>
                                <button type='button' className="button" value='Update' onClick={() => this.handleEdit(i._id)}>Edit</button>
                                </td>
                            </tr>
                            )}
                            </tbody>
                            </table>
            
                        <br/>
                            
                            
                            
                        </div>
            </div>
        )
    }
}

