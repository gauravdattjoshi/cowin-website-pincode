



let messageOne = document.querySelector('p');

const pincodeForm = document.querySelector('.pincode-form');

let tableFromJson = (myBooks) => {
    // the json data.
  
    
    // Extract value from table header. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    let col = [];
    for (let i = 0; i < myBooks.length; i++) {
        for (let key in myBooks[i]) {
            console.log("coloooooo",col);

            if (col.indexOf(key) === -1) {
                col.push(key);
            }
          
        }
    }
    
    // Create a table.
    const table = document.createElement("table");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1);                   // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
}

pincodeForm.addEventListener('submit', (response) => {
    const pincodetext = document.querySelector('#inputtext').value;

    response.preventDefault();

    const url = "http://localhost:3000/pincode?pincode=" + encodeURIComponent(pincodetext) + "&date=" + encodeURIComponent("27-05-2021");
    messageOne.textContent = "Loading";
    fetch(url).then((res) => {
        res.json().then((result) => {
            if (result.error) {
                return console.log(result.error);
            } else {
                tableFromJson(result.sessions);
                messageOne.textContent = result.name;
                result.vaccines.forEach((element)=>{
                    let  li = document.createElement('td');
                    li.innerHTML=element;
                    document.querySelector('.table-body tr ').appendChild(li)
                  })
                result.address.forEach((element)=>{
                  let  li = document.createElement('td');
                  li.innerHTML=element;
                  document.querySelector('.table-body tr ').appendChild(li)
                })
                
            }
        })
    });


})



