import { newProduct } from "./new-product.js";
import { getProducts } from "./service.js";
import { editProduct } from "./update-product.js";

export function home() {
    let container = document.getElementById("container");
    container.innerHTML = 
    `<h1>Products</h1>
	<input type="button" value="Create New Product" class="button">
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Category</th>
                <th>Price</th>
				<th>Date of fabrication</th>
			</tr>
		</thead>
		<tbody class="table-container">
		</tbody>
	</table>`;

    loading();
    setTimeout(() => {
        createCards();
    }, 500);
    createButton();
    updateProductButton();
}

export async function createCards(){
    try {
        let data= await getProducts();

        let tableBody=document.querySelector(".table-container");

        let text="";
        data.forEach(element => {
            text +=
            `<tr>
                <td>
                    <a class="id-${element.id}">${element.name}</a>
                </td>
                <td>${element.category}</td>
                <td>${element.price}</td>
                <td>${element.dateOfFabrication}</td>
           </tr>`
        });

        tableBody.innerHTML=text;
    } catch(error) {
        console.log(error);
    }
}

export function loading() {
    let tableBody=document.querySelector(".table-container");

    tableBody.innerHTML = 
    `<h1 class="loading">Loading...</h1>`;
}

export function createButton() {
    let button = document.querySelector(".button");

    button.addEventListener('click', newProduct);
}

export function updateProductButton(){
    let container = document.querySelector("#container");

    container.addEventListener('click', (e) => {
        let target = e.target;
        
        if(target.tagName === "A"){
            let parent = target.parentNode.parentNode;

            let product = {
                id:parseInt(target.classList[0].split("-")[1]),
                name:target.textContent,
                category:parent.children[1].textContent,
                price:parent.children[2].textContent,
                dateOfFabrication:parent.children[3].textContent.split("T")[0]
            }

            editProduct(product);
        }
    })
}