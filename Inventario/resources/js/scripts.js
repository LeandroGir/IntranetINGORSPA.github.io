const form =  document.getElementById("transactionForm3");
        
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if(form.amountType3.value > 0){
    let transactionFormData3 = new FormData(form);
    let transactionObj3 = convertFormDataToTransactionObj(transactionFormData3);
    console.log(transactionObj3)
    saveTransactionObj3(transactionObj3)
    insertRowInTransactionTable3(transactionObj3)
    form.reset();
    }
    else
    {
        alert ("Ingrese un valor mayor a 0 para unidades vendidas")
    }
})


function draw_category(){
    let allCategories = [
    "Productos", "Servicios"
] 
    for(let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}


function insertCategory(categoryName){
    const selectElement = document.getElementById("categoryType3")
    let htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)

}




document.addEventListener("DOMContentLoaded", function(event) {
    draw_category()
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData3"))
    transactionObjArr.forEach(
        function (arrayElement) {
            insertRowInTransactionTable3(arrayElement)
        }
        
    )
})

//funcion para agregar transaction ID a cada transacción
function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId;

}




function convertFormDataToTransactionObj(transactionFormData3){
    let transactionType3 = transactionFormData3.get("transactionType3");
    let descriptionType3 = transactionFormData3.get("descriptionType3");
    let DateType3 = transactionFormData3.get("DateType3");
    let stockType3 = transactionFormData3.get("stockType3");
    let amountType3 = transactionFormData3.get("amountType3");
    let categoryType3 = transactionFormData3.get("categoryType3");
    let transactionId3 = getNewTransactionId() ;
    return {
            "transactionType3": transactionType3,
            "descriptionType3": descriptionType3,
            "DateType3": DateType3,
            "stockType3": stockType3,
            "amountType3": amountType3,
            "categoryType3": categoryType3,
            "transactionId3": transactionId3

    }
}

function insertRowInTransactionTable3(transactionObj3) {
    let transactionTableRef3 = document.getElementById("transactionTable3");
    
    let newTransactionRowRef3 = transactionTableRef3.insertRow(-1);
    newTransactionRowRef3.setAttribute("data-transaction-Id", transactionObj3["transactionId3"])

    let newTypeCellRef = newTransactionRowRef3.insertCell(0);
    newTypeCellRef.textContent = transactionObj3["transactionType3"]

    newTypeCellRef = newTransactionRowRef3.insertCell(1);
    newTypeCellRef.textContent = transactionObj3["descriptionType3"]

    newTypeCellRef = newTransactionRowRef3.insertCell(2);
    newTypeCellRef.textContent = transactionObj3["DateType3"]

    newTypeCellRef = newTransactionRowRef3.insertCell(3);
    newTypeCellRef.textContent = transactionObj3["stockType3"]


    newTypeCellRef = newTransactionRowRef3.insertCell(4);
    newTypeCellRef.textContent = transactionObj3["amountType3"]


    newTypeCellRef = newTransactionRowRef3.insertCell(5);
    newTypeCellRef.textContent = transactionObj3["categoryType3"]

    let newDeleteCell3 = newTransactionRowRef3.insertCell(6);
    let deleteButton3 = document.createElement("button");
    deleteButton3.textContent ="Eliminar";
    newDeleteCell3.appendChild(deleteButton3);

    deleteButton3.addEventListener("click", (event) => {
        //Targeteo la fila 
        let transactionRow3 = event.target.parentNode.parentNode;
        //Obtengo el valor del atributo "data-transaction-id"
        let transactionId3 = transactionRow3.getAttribute("data-transaction-id")
        //Elimino la fila del documento 
        transactionRow3.remove();
        //Elimino la fila del local storage
        deleteTransactionObj3 (transactionId3);
    })

}

// Le paso como parametro el transactionId de la transaccion que quiero eliminar 
function deleteTransactionObj3(transactionId3) {
    //Obtengo las transacciones de mi BD (Desconvierto de JSON a Object)
    let transactionObjArr3 = JSON.parse(localStorage.getItem("transactionData3"))
    //Busco el indice / la posicion de la transaccion que quiero eliminar
    let transactionIndexInArray = transactionObjArr3.findIndex(element => element.transactionId == transactionId3);
    //Elimino el elemento de esa posicion
    transactionObjArr3.splice(transactionIndexInArray, 1)
    //Convierto de objeto a JSON 
    let transactionArrayJSON3 = JSON.stringify(transactionObjArr3);
    //Guardo mi array de transaccion en formato JSON en el local storage 
    localStorage.setItem("transactionData3", transactionArrayJSON3)
}


function saveTransactionObj3(transactionObj3) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData3")) || [];
    myTransactionArray.push(transactionObj3)
    //Convierto mi array de transacciones a JSON
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    //Guardo mi array de transaccion en formato JSON en el local storage 
    localStorage.setItem("transactionData3", transactionArrayJSON)
}



document.addEventListener("DOMContentLoaded", () => {
        // Escuchamos el click del botón
        const $boton = document.querySelector("#btnCrearPDF3");
        $boton.addEventListener("click", () =>  {
                const $elementoParaConvertir = document.getElementById('transactionTable3');
                html2pdf()
                    .set({
                        margin: 1,
                        filename: 'Informe de registros en el inventario.pdf',
                        image: {
                            type: 'jpeg',
                            quality: 0.98
                        },
                        html2canvas: {
                            scale: 3,
                            letterRendering: true,
                        },
                        jsPDF: {
                            unit: "in",
                            format: "a3",
                            orientation: 'portrait'
                        }
                    })
                    .from($elementoParaConvertir)
                    .save()
                    .catch(err => console.log(err));
            });
    });