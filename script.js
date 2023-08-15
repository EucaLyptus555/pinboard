
let titel = [];
let inhalt = [];
let trashtitle = [];
let trashinhalt = [];

function load() {
    document.getElementById('content').innerHTML = `
    <div id="new" class="plate">
        
        <a href="#" onclick="change()" id="change" class="nodec"><h2>Neuer Eintrag</h2><br></a>
        
    </div>`;

    if (localStorage.getItem('titel')) {
        titel = JSON.parse(localStorage.getItem('titel'));
        inhalt = JSON.parse(localStorage.getItem('inhalt'));
    }
    if (titel) {
        for (i = 0; i < titel.length; i++) {
            document.getElementById('content').innerHTML += `
            
            <div id="${i}" class="plate">
                
                <h2>${titel[i]}</h2><br>
                <p>${inhalt[i]}</p>
                <a href="#" class="trashbin-end" ><img src="./img/garbage.png" alt="" onclick="kill(${i})" class="trashbin" title="entfernen"></a>
           </div>`;

        }
    }

    trash();

}

function change() {
    document.getElementById('new').innerHTML = `
    <div>
        <input type="text" name="" id="titel" placeholder="Titel" class="title">
        <textarea type="text" id="inhalt" placeholder="Inhalt" class="inhalt"></textarea>
        <button onclick="newentry()">speichern</button>
    </div>`;
    document.getElementById('titel').value = '';
    document.getElementById('inhalt').value = '';
    document.getElementById('titel').Placeholder = 'Titel';
    document.getElementById('inhalt').Placeholder = 'Inhalt';
}

function newentry() {
    titel.push(document.getElementById('titel').value);
    inhalt.push(document.getElementById('inhalt').value);
    save();
}

function save() {
    localStorage.setItem('titel', JSON.stringify(titel));
    localStorage.setItem('inhalt', JSON.stringify(inhalt));
    localStorage.setItem('trashtitle', JSON.stringify(trashtitle));
    localStorage.setItem('trashinhalt', JSON.stringify(trashinhalt));
    load();

}

function kill(i) {
    trashtitle.push(titel[i]);
    trashinhalt.push(inhalt[i]);
    console.log(trashtitle);
    titel.splice(i, 1);
    inhalt.splice(i, 1);
    save();
}

function trash() {
    document.getElementById('content').innerHTML += `
    <div id="trash" class="plate">
        
        <a href="#" onclick="trashbin()" id="trash" class="nodec"><h2>Papierkorb</h2><br></a>
        
    </div>`;
}

function trashbin() {
    document.getElementById('trash').innerHTML = ''
    if (localStorage.getItem('trashtitle')) {
        trashtitle = JSON.parse(localStorage.getItem('trashtitle'));
        trashinhalt = JSON.parse(localStorage.getItem('trashinhalt'));
    }
    else {
        document.getElementById('trash').innerHTML = 'Der Papierkorb ist leer.'
    }
    if (trashtitle.length == 0) {
        document.getElementById('trash').innerHTML = 'Der Papierkorb ist leer.'
    }
    else {
        for (i = 0; i < trashtitle.length; i++) {
            document.getElementById('trash').innerHTML += `
            <div class="trashcontent">
                <p><b>${trashtitle[i]}</b></p>
                <a href="#" title="wiederherstellen" onclick="resolve(${i})" class="piccenter" ><img src="./img/arrow.png"></a>
                <a href="#" title="löschen" onclick="killtotal(${i})" class="piccenter"><img src="./img/cross.png"></a>
        
            </div>`
        }
    }
}

function resolve(i) {
    titel.push(trashtitle[i]);
    inhalt.push(trashinhalt[i]);
    trashtitle.splice(i, 1);
    trashinhalt.splice(i, 1);
    save();

}

function killtotal(i) {
    trashtitle.splice(i, 1);
    trashinhalt.splice(i, 1);
    save();
}
//<a href="#"><img src="./img/cross.png" class="close"></a>