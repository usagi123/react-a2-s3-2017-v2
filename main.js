import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import Order from './Order.jsx'
import Categories from './Categories.jsx'
import ChangeView from './ChangeView.jsx'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Root from './Root.jsx'



function products(state = [], action) {

    if (action.type == 'FETCH_PRODUCT_SUCCESS') {
        return action.payload
    }
    else if (action.type == 'ADD_PRODUCT_SUCCESS') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE_PRODUCT') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW_PRODUCT') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

export function fetchProducts() {
    return function (dispatch) {
        fetch('https://a2-webpro-s3-2017.herokuapp.com/products')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_PRODUCT_SUCCESS',
                    payload: data
                })
            })
    }
}

export function addProduct(products){
    return function(dispatch){
        fetch("https://a2-webpro-s3-2017.herokuapp.com/products", {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'

            },
            body: JSON.stringify(products)
        })
        .then (function(res){
            return res.json()
        })
        .then(data=>dispatch(fetchProducts())
    )
    }
}
export function updateProduct(products){
    return function(dispatch){
        fetch(`https://a2-webpro-s3-2017.herokuapp.com/products/${products._id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'

            },
            body: JSON.stringify(products)
        })
        .then (function(res){
            return res.json()
        })
        .then(data=>dispatch(fetchProducts())
    )
    }
}


export function deleteProduct(id) {
    return function (dispatch) {
        fetch(`https://a2-webpro-s3-2017.herokuapp.com/products/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()
        })
    }
}
export function getProduct(id) {
    return function (dispatch) {
        fetch(`https://a2-webpro-s3-2017.herokuapp.com/products/${id}`, {
            method: 'get',
        })
        .then (function(res){
            return res.json()
        })
        .then(function(data){
            dispatch({type: 'EDIT_PRODUCT', payload: data })
        })
    }

}





 function editedProduct(state = {name: '', age: 0}, action){
    if(action.type==='EDIT_PRODUCT'){
            console.log(action.payload)
            return action.payload
    }
    else{
        return state
    }
}

/////////////////////////////CATEGORIES///////////////////////////////////////
function categories(state = [], action) {
    
        if (action.type == 'FETCH_CATEGORY_SUCCESS') {
            return action.payload
        }
        else if (action.type == 'ADD_CATEGORY_SUCCESS') {
            return [...state, action.payload]
        }
        else if (action.type === 'DELETE_CATEGORY') {
            console.log(action.type)
            return state.filter((s) => s._id !== action.payload)
        }
        else if (action.type === 'VIEW_CATEGORY') {  
            var newState = state.filter((s) => s._id == action.payload)
            return newState
        }
    
        else { return state }
    
    }
    
    export function fetchCategories() {
        return function (dispatch) {
            fetch('https://a2-webpro-s3-2017.herokuapp.com/categories')
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    dispatch({
                        type: 'FETCH_CATEGORY_SUCCESS',
                        payload: data
                    })
                })
        }
    }
    
    export function addCategory(categories){
        return function(dispatch){
            fetch("https://a2-webpro-s3-2017.herokuapp.com/categories", {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json'
    
                },
                body: JSON.stringify(categories)
            })
            .then (function(res){
                return res.json()
            })
            .then(data=>dispatch(fetchCategories())
        )
        }
    }
    export function updateCategory(categories){
        return function(dispatch){
            fetch("https://a2-webpro-s3-2017.herokuapp.com/categories", {
                method: 'PUT',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json'
    
                },
                body: JSON.stringify(categories)
            })
            .then (function(res){
                return res.json()
            })
            .then(data=>dispatch(fetchCategories())
        )
        }
    }
    
    
    export function deleteCategory(id) {
        return function (dispatch) {
            fetch(`https://a2-webpro-s3-2017.herokuapp.com/categories/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'delete',
            })
            .then((res) => {
                return res.json()
            })
        }
    }
    export function getCategory(id) {
        return function (dispatch) {
            fetch(`https://a2-webpro-s3-2017.herokuapp.com/categories/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'get',
            })
            .then((res) => {
                return res.json()
            })
            .then(function(data){
                dispatch({type: 'EDIT_CATEGORY', payload: data })
            })
        }
    }
    
    
    
     export function editedCategory(state = {name: '', age: 0}, action){
        if(action.type==='EDIT_CATEGORY'){
                console.log(action.payload)
                return action.payload
        }
        else{
            return state
        }
    }

/////////////////////////////////ORDER/////////////////////////////////

function orders(state = [], action) {
    
        if (action.type == 'FETCH_ORDER_SUCCESS') {
            return action.payload
        }
        else if (action.type == 'ADD_ORDER_SUCCESS') {
            return [...state, action.payload]
        }
        else if (action.type === 'DELETE_ORDER') {
            console.log(action.type)
            return state.filter((s) => s._id !== action.payload)
        }
        else if (action.type === 'VIEW_ORDER') {  
            var newState = state.filter((s) => s._id == action.payload)
            return newState
        }
    
        else { return state }
    
    }
    
    export function fetchOrders() {
        return function (dispatch) {
            fetch('https://a2-webpro-s3-2017.herokuapp.com/orders')
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    dispatch({
                        type: 'FETCH_ORDER_SUCCESS',
                        payload: data
                    })
                })
        }
    }
    
    export function addOrder(orders){
        return function(dispatch){
            fetch("https://a2-webpro-s3-2017.herokuapp.com/orders", {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json'
    
                },
                body: JSON.stringify(orders)
            })
            .then (function(res){
                return res.json()
            })
            .then(data=>dispatch(fetchOrders())
        )
        }
    }
    export function updateOrder(orders){
        return function(dispatch){
            fetch(`https://a2-webpro-s3-2017.herokuapp.com/orders/${orders._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json'
    
                },
                body: JSON.stringify(orders)
            })
            .then (function(res){
                return res.json()
            })
            .then(data=>dispatch(fetchOrders())
        )
        }
    }
    
    
    export function deleteOrder(id) {
        return function (dispatch) {
            fetch(`https://a2-webpro-s3-2017.herokuapp.com/orders/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'delete',
            })
            .then((res) => {
                return res.json()
            })
        }
    }
    export function getOrder(id) {
        return function (dispatch) {
            fetch(`https://a2-webpro-s3-2017.herokuapp.com/orders/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                method: 'get',
            })
            .then((res) => {
                return res.json()
            })
            .then(function(data){
                dispatch({type: 'EDIT_ORDER', payload: data })
            })
        }
    }
    
    
    
     export function editedOrder(state = {name: '', age: 0}, action){
        if(action.type==='EDIT_ORDER'){
                console.log(action.payload)
                return action.payload
        }
        else{
            return state
        }
    }
///////////////////////CARTS/////////////////
function carts(state = [], action) {

    if (action.type == 'FETCH_CART_SUCCESS') {
        return action.payload
    }
    else if (action.type == 'ADD_CART_SUCCESS') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE_CART') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW_CART') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

export function addToCart(products){
    return function(dispatch){
        fetch("http://bestlab.us:8080/shoppingCarts", {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'

            },
            body: JSON.stringify(products)
        })
        .then (function(res){
            return res.json()
        })
        .then(data=>dispatch(fetchCarts())
    )
    }
}
export function fetchCarts() {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/shoppingCarts')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_CART_SUCCESS',
                    payload: data
                })
            })
    }
}
export function deleteCart(id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/shoppingCarts/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()
        })
    }
}
export function updateCart(carts){
    return function(dispatch){
        fetch("http://bestlab.us:8080/shoppingCarts", {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'

            },
            body: JSON.stringify(carts)
        })
        .then (function(res){
            return res.json()
        })
        .then(data=>dispatch(fetchCarts())
    )
    }
}


var centralState = combineReducers({ products, editedProduct, categories, editedCategory, orders, editedOrder, carts })
var store = createStore(centralState, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById('app')

)