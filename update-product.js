import { home } from "./home.js";
import { updateProduct } from "./service.js";
import { deleteProduct } from "./service.js";

export function editProduct(product) {
    let container = document.getElementById("container");
    container.innerHTML =
    `<h1>Update Product</h1>
    <div class="form-create create-product-container">
        <div class="alerts">
        </div>
        <p>
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${product.name}">
        </p>
        <p>
            <label for="category">Category</label>
            <input name="category" type="text" id="category" value="${product.category}">
        </p>
        <p>
            <label for="price">Price</label>
            <input name="price" type="text" id="price" value="${product.price}">
        </p>
        <p>
            <label for="date-of-fabrication">Date of Fabrication</label>
            <input name="dateOfFabrication" type="date" id="date-of-fabrication" value="${product.dateOfFabrication}">
        </p>
        <p>
            <input type="button" value="Update Product" id="update-product">
        </p>
        <p>
            <input type="button" value="Cancel" id="cancel">
        </p>
        <p>
            <input type="button" value="Delete" id="delete">
        </p>
    </div>`;

    createButtons(product);
}


export function createButtons(product) {
    let form = document.querySelector('.create-product-container');
    let name = document.querySelector('#name');
    let category = document.querySelector('#category');
    let price = document.querySelector('#price');
    let dateOfFabrication = document.querySelector('#date-of-fabrication');
    let createNewProduct = document.querySelector('#update-product');
    let cancel = document.querySelector('#cancel');
    let remove = document.querySelector('#delete');

    createNewProduct.addEventListener('click', async () => {
        let request = {
            id:product.id,
            name:name.value,
            category:category.value,
            price:parseFloat(price.value),
            dateOfFabrication:dateOfFabrication.value
        };
    
        let messages = [];

        if(name.value.trim() === '') {
            messages.push("Name does not have a value");
        }

        if(category.value.trim() === '') {

            messages.push("Category does not have a value");
        }

        if(price.value.trim() === ''){
            messages.push("Price does not have a value");
        }
        else if(!parseFloat(price.value)){
            messages.push("Price field value must be a number");
        }

        if(!dateOfFabrication.value){
            messages.push("Date of fabrication does not have a value");
        }

        if(messages.length === 0){
            let response = await updateProduct(request);
            if(response) {
                messages.push(response);
            }
        }

        let text = "";
        messages.forEach(element => {
            let alert = `<p style="color:red">`;
            alert += element;
            alert += `</p>`;
            text += alert;
        });

        let alerts = document.querySelector(".alerts");
        alerts.innerHTML = text;
    });

    cancel.addEventListener('click', home);
    remove.addEventListener('click', () => {
        deleteProduct(product.id);
        home();
    });
}
