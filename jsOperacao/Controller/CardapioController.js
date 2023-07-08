class Cardapio{
    constructor(){

        this.cardapioPasteis = firebase.database().ref("cardapioPasteis");
        this.cardapioPanquecas = firebase.database().ref("cardapioPanquecas");
        this.cardapioTapiocas = firebase.database().ref("cardapioTapiocas");
        this.cardapioBatatas = firebase.database().ref("cardapioBatatas");
        this.cardapioBebidas = firebase.database().ref("cardapioBebidas");
        this.cardapioProdutosBalcao = firebase.database().ref("cardapioProdutosBalcao");

        this.initButtons();
    }

    initButtons(){
        let pasteis = document.querySelector("#pastel");
        let panquecas = document.querySelector("#panqueca");
        let tapiocas = document.querySelector("#tapioca");
        let batatas = document.querySelector("#batata");
        let bebidas = document.querySelector("#bebida");
        let produtosBalcao = document.querySelector("#balcao");
        
        let btnSalvar = document.querySelector("#salva");

        btnSalvar.addEventListener("click",e=>{
            let produto = document.getElementById("produto").value;
            this.salvarItem(produto);
        });

        pasteis.addEventListener("click",e=>{
            document.querySelector("#produto").value = "Pasteis";
            this.listarCardapio("cardapioPasteis");
        });

        panquecas.addEventListener("click",e=>{
            document.querySelector("#produto").value = "Panquecas";
            this.listarCardapio("cardapioPanquecas");
        });

        tapiocas.addEventListener("click",e=>{
            document.querySelector("#produto").value = "Tapiocas";
            this.listarCardapio("cardapioTapiocas");
        });

        batatas.addEventListener("click",e=>{
            document.querySelector("#produto").value = "Batatas";
            this.listarCardapio("cardapioBatatas");
        });

        bebidas.addEventListener("click",e=>{
            document.querySelector("#produto").value = "Bebidas";
            this.listarCardapio("cardapioBebidas");
        });

        produtosBalcao.addEventListener("click",e=>{
            document.querySelector("#produto").value = "ProdutosBalcao";
            this.listarCardapio("cardapioprodutosBalcao");
        });
    }

salvarItem(item){
    let sabor = document.getElementById("sabor").value;
    let valor = document.getElementById("valor").value;
    let quantidade = document.getElementById("quantidade").value;
    switch(item){
        case "Pasteis": this.cardapioPasteis.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Panquecas": this.cardapioPanquecas.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Tapiocas":this.cardapioTapiocas.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Batatas": this.cardapioBatatas.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;
        
        case "Bebidas": this.cardapioBebidas.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "ProdutosBalcao":this.cardapioProdutosBalcao.push({
            sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;
    }
}
listarCardapio(referencia){
    let table = document.querySelector(".cardapio");
    firebase.database().ref(referencia).once("value",element=>{
        table.innerText ='';
        element.forEach(e => {
            let key = e.key;
            let data = e.val();

            let tr = document.createElement('tr');

        tr.innerHTML = ` 
        <td id="sabor">
            ${data.sabor}
        </td>
        <td id="quantidade">
            ${data.quantidade}
        </td>
        <td id="valor">
            ${data.valor}
        </td>
        <td>
            <button id="editar">Editar</button>
        </td>
        <td>
        <button id="Excluir">Excluir</button>
        </td>`;
        table.appendChild(tr);
        tr.querySelector("#editar").addEventListener("click",e=>{
            console.log(tr.querySelector("#valor").innerText);
            document.querySelector("#sabor").value = tr.querySelector("#sabor").innerText;
        });
        });
    });
}

}
var cardapio = new Cardapio();