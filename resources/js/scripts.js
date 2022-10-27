const form =  document.getElementById("transactionForm");
        
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if(form.amountType.value > 0){
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData);
    console.log(transactionObj)
    saveTransactionObj(transactionObj)
    insertRowInTransactionTable(transactionObj)
    form.reset();
    }
    else
    {
        alert ("Ingrese un monto mayor a 0")
    }
})

function draw_category(){
    let allCategories = [
    "Productos", "Servicios","Ajena a ING OR Spa",
] 
    for(let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}


function insertCategory(categoryName){
    const selectElement = document.getElementById("categoryType")
    let htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)

}




document.addEventListener("DOMContentLoaded", function(event) {
    draw_category()
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
        function (arrayElement) {
            insertRowInTransactionTable(arrayElement)
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




function convertFormDataToTransactionObj(transactionFormData){
    let transactionType = transactionFormData.get("transactionType");
    let descriptionType = transactionFormData.get("descriptionType");
    let DateType = transactionFormData.get("DateType");
    let amountType = transactionFormData.get("amountType");
    let categoryType = transactionFormData.get("categoryType");
    let transactionId = getNewTransactionId() ;
    return {
            "transactionType": transactionType,
            "descriptionType": descriptionType,
            "DateType": DateType,
            "amountType": amountType,
            "categoryType": categoryType,
            "transactionId": transactionId

    }
}

function insertRowInTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");
    
    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-Id", transactionObj["transactionId"])

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj["transactionType"]

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["descriptionType"]

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["DateType"]


    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["amountType"]


    newTypeCellRef = newTransactionRowRef.insertCell(4);
    newTypeCellRef.textContent = transactionObj["categoryType"]

    let newDeleteCell = newTransactionRowRef.insertCell(5);
    let deleteButton = document.createElement("button");
    deleteButton.textContent ="Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        //Targeteo la fila 
        let transactionRow = event.target.parentNode.parentNode;
        //Obtengo el valor del atributo "data-transaction-id"
        let transactionId = transactionRow.getAttribute("data-transaction-id")
        //Elimino la fila del documento 
        transactionRow.remove();
        //Elimino la fila del local storage
        deleteTransactionObj (transactionId);
    })

}

// Le paso como parametro el transactionId de la transaccion que quiero eliminar 
function deleteTransactionObj(transactionId) {
    //Obtengo las transacciones de mi BD (Desconvierto de JSON a Object)
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    //Busco el indice / la posicion de la transaccion que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId == transactionId);
    //Elimino el elemento de esa posicion
    transactionObjArr.splice(transactionIndexInArray, 1)
    //Convierto de objeto a JSON 
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    //Guardo mi array de transaccion en formato JSON en el local storage 
    localStorage.setItem("transactionData", transactionArrayJSON)
}


function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj)
    //Convierto mi array de transacciones a JSON
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    //Guardo mi array de transaccion en formato JSON en el local storage 
    localStorage.setItem("transactionData", transactionArrayJSON)
}



document.addEventListener("DOMContentLoaded", () => {
        // Escuchamos el click del botón
        const $boton = document.querySelector("#btnCrearPDF");
        $boton.addEventListener("click", () =>  {
                const $elementoParaConvertir = document.getElementById('transactionTable');
                html2pdf()
                    .set({
                        margin: 1,
                        filename: 'Informe de orden de ingresos.pdf',
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

    function validarPassword(){
        texto = prompt("Para ver el login de OfiDoc, introduzca su contraseña");
        while(texto!="Ironman522"){
          alert("Password incorrecta");
          texto = prompt("Para ver el login de OfiDoc, introduzca su contraseña");
        }
        alert("Password Correcta");
      }