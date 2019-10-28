
// Selectors
copyOne = document.querySelector('.copy-one');
copyTwo = document.querySelector('.copy-two');
// createTableBtn = document.querySelector('.create-table');
clearBtn = document.querySelector('.clear');
jsonInput = document.querySelector('.json-input');
copyTableBtn = document.querySelector('.copy-table');


// Event Listeners
copyOne.addEventListener('click', codeOne);

copyTwo.addEventListener('click', codeTwo);

// createTableBtn.addEventListener('click', createTable);

clearBtn.addEventListener('click', clearData);

jsonInput.addEventListener('paste', (e)=>{
    setTimeout(createTable,500);
    copyTableBtn.style.opacity = 1;
});

copyTableBtn.addEventListener('click', copyTable);




function codeOne() {
    var data = document.querySelector('.code-one').textContent;
    const el = document.createElement('textarea');
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.execCommand("copy");
    alert(`Copied to clipboard: 
Paste code into the Google Chrome Console on the Detection Details page and press Enter.`);
}

function codeTwo() {
    var data = document.querySelector('.code-two').textContent;
    const el = document.createElement('textarea');
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.execCommand("copy");
    alert(`Copied to clipboard: 
Paste code into the Google Chrome Console on the Alerted Transaction page and press Enter.`);
}


function createTable(){

    var data = document.querySelector('.json-input').value;
    var jsonData = JSON.parse(data);
    console.log(jsonData);

    var table = document.querySelector('.trend-analysis');

    var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) { // -1 means key is not present in the list
                    col.push(key);
                }
            }
        }

        var tr = table.insertRow(-1); // Insert row

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (var i = 0; i < jsonData.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonData[i][col[j]];
            }
        }
}

function clearData(){
    document.querySelector('.json-input').value = '';
    var table = document.querySelector('.trend-analysis');
    table.innerHTML= '';
    copyTableBtn.style.opacity = 0.2;

}


function copyTable(){
    try{
        var textarea = document.createElement('textarea');
        textarea.id = 'temp_element';
        textarea.style.height = 0;
        document.body.appendChild(textarea);
        textarea.value = document.querySelector("body > div.table-container > table > tbody > tr:nth-child(2)").innerText;
        var selector = document.querySelector('#temp_element');
        selector.select();
        document.execCommand('copy');
        document.querySelector('#temp_element').remove();
        alert('Table row copied to clipboard.')
    }
    catch(error){
        console.log(error);
        alert('No table data to copy.')
        document.querySelector('#temp_element').remove();
    } 
}

