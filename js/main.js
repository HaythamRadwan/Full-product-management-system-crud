// Get Total
let crud = document.getElementById("crud");
let myInput = document.getElementById("myInput");

let title = document.getElementById("title");

let price = document.getElementById("price"),
    taxes = document.getElementById("taxes"),
    ads = document.getElementById("ads"),
    dis = document.getElementById("dis"),
    total = document.getElementById("total");

let count = document.getElementById("count");

let category = document.getElementById("category");

let create = document.getElementById("submit");

let mode = "create";
let tmp; // متغير وهمي أو المتغير المساعد


function getTotal() {

    if (price.value != "") {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(dis.value);
        total.innerHTML = result;
        total.style.color = "black";
        total.style.fontWeight = '600';
    } else if (price.value == "") {
        total.innerHTML = "";
        total.style.color = "white";
        total.style.fontWeight = '300';
    }
   
}

// Create

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}


create.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dis: dis.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "" && count.value != "" && count.value < 101 && category.value.toLowerCase() != "") {
        if (mode === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
                
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mode = "create";
            create.innerHTML = "Create";
            count.style.display = 'block';
        }
    }
    // if (mode === "create") {
    //     if (newPro.count > 1) {
    //         for (let i = 0; i < newPro.count; i++) {
    //             dataPro.push(newPro);
    //         }
            
    //     } else {
    //         dataPro.push(newPro);
    //     }
    // } else {
    //     dataPro[tmp] = newPro;
    //     mode = "create";
    //     create.innerHTML = "Create";
    //     count.style.display = 'block';
    // }
    
    
    localStorage.setItem('product', JSON.stringify(dataPro));

    showdata();

}


// Claear Inputs

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    dis.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Read

function showdata() {
    let theTable = "";
    for (let i = 0; i < dataPro.length; i++) {
        theTable += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].dis}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="bt-update" class="btn" onclick="update(${i});">update</button></td>
            <td><button id="bt-delete" class="btn" onclick="deleteData(${i});">delete</button></td>
        </tr>
        `
    }

    document.getElementById("t-baody").innerHTML = theTable;

    // Delete All => function in bottom
    let divDeleteAll = document.getElementById("delete-all");
    if (dataPro.length > 0) {
        divDeleteAll.innerHTML = `<button class="delete-all btn" onclick="deleteall();">Delete All - ${dataPro.length} Product</button>`
    } else {
        divDeleteAll.innerHTML = "";
    }

    // Update
    

}
showdata();


// Delete

function deleteData(i) {
    dataPro.splice(i, 1); // كده هيمسح من ال array فقط => and he must delete from localstorage too
    localStorage.product = JSON.stringify(dataPro);
    showdata();
}

// Delete All 

function deleteall() {
    dataPro.splice(0);
    localStorage.clear();
    showdata();
}


// Count

//Update

function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    dis.value = dataPro[i].dis;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;

//     create.style.display = "none";
//     // `<button class="btn" id="btn-update">Update</button>`
//     var theUpdate = document.createElement("button");
//     myInput.appendChild(theUpdate);
//     theUpdate.innerText = "Update"
//     theUpdate.setAttribute('class', 'btn');
//     theUpdate.setAttribute('id', 'update-row');
// }

// let updateRow = document.getElementById("update-row");

// updateRow.onclick = function() {
//     let newUpdate = {
//         title: title.value,
//         price: price.value,
//         taxes: taxes.value,
//         ads: ads.value,
//         dis: dis.value,
//         total: total.innerHTML,
//         count: count.value,
//         category: category.value,
//     }
    
//         dataPro.push(newUpdate);

    
//     localStorage.setItem('product', JSON.stringify(dataPro));

//     showdata();

// =>>>> Other Way

create.innerHTML = "Update";
mode = "Update";
tmp = i;
scroll({
    top:0,
    behavior:"smooth"
})

showdata();
}


// Search

// Get Search

let srh = document.getElementById("srh"),
    srhTitle = document.getElementById("srh-title"),
    srhCateg = document.getElementById("srh-categ");

let srhMode = "title";

function searchMode(id) {
    if (id == "srh-title") {
        srhMode = "title";
        // srh.placeholder = "Search By Title";
    } else {
        srhMode = "category";
        // srh.placeholder = "Search By Category";
    }
    
    srh.placeholder = "Search By " + srhMode;
    srh.focus();
    srh.value = "";
    showdata();
}

function searchData(value) {
    let theTable = '';
    for (let i =0; i < dataPro.length; i++) {
        if (srhMode == 'title') {
            // for (let i =0; i < dataPro.length; i++) {
                if (dataPro[i].title.includes(value.toLowerCase())) {
                    theTable += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].dis}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="bt-update" class="btn" onclick="update(${i});">update</button></td>
                            <td><button id="bt-delete" class="btn" onclick="deleteData(${i});">delete</button></td>
                        </tr>
                        `
                }
            // }
        } else {
            // for (let i =0; i < dataPro.length; i++) {
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    theTable += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].dis}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="bt-update" class="btn" onclick="update(${i});">update</button></td>
                            <td><button id="bt-delete" class="btn" onclick="deleteData(${i});">delete</button></td>
                        </tr>
                        `
                }
            // }
        }
    }
    document.getElementById("t-baody").innerHTML = theTable;
}
