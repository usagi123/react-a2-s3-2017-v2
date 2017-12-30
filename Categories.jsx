import React from 'react'
import {fetchCategories, deleteCategory, addCategory, getCategory, updateCategory} from './main.js'
import './styles/product-styles.css'

export default class Categories extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: ''
    
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchCategories())
    }

    componentWillReceiveProps(props){
        this.setState(props.editedCategory)
    }

    handleSave(){
        if(this.state._id === undefined || this.state._id ==='')
            this.props.dispatch(addCategory(this.state))
        else    
            this.props.dispatch(updateCategory(this.state))
    }

    handleDelete(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_CATEGORY',
                payload: _id
            })
            this.props.dispatch(deleteCategory(_id))

        }
    }
    handleEdit(id){
        this.props.dispatch(getCategory(id))
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
                <h1>Categories Form</h1>
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
                

                    </tbody>
                </table>
                <div className="footer">
                <input type='button' className='button' value='Save' onClick={()=>this.handleSave()}/>
                
                </div>
            
                <div className='header'><h1>Categories List</h1></div>
                    
                    
                    <div className="list">
                            <br/>
                            <table  style={{width:"80%", textAlign:"left"}}>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                
                            </tr>
                            {this.props.categories.map((i) =>
                            <tr style={{textAlign:"center"}}>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td><button type='button' className="button" value='Delete' onClick={() => this.handleDelete(i._id)}>Delete</button></td>
                                <td><button className="button" value='Update' onClick={() => this.handleEdit(i._id)}><img className='icon' src='./icons/new-file.png'/></button></td>
                                
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

