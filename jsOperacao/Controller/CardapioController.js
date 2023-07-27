class Cardapio{
    constructor(){
        this.key;
        this.editarProdutos = false;
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
            let item = document.getElementById("produto").value;
            if(this.editarProdutos == false){
                this.salvarItem(item);
            }else{
                this.editarItem(item); 
            }
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
            this.listarCardapio("cardapioProdutosBalcao");
        });
    }

salvarItem(item){
    let produto = item;
    let sabor = document.getElementById("sabor").value;
    let valor = document.getElementById("valor").value;
    let valorInicial = document.getElementById("valorInicial").value;
    let quantidade = document.getElementById("quantidade").value;
    switch(item){
        case "Pasteis": this.cardapioPasteis.push({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Panquecas": this.cardapioPanquecas.push({
            produto,sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Tapiocas":this.cardapioTapiocas.push({
            produto,sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "Batatas": this.cardapioBatatas.push({
            produto,sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;
        
        case "Bebidas": this.cardapioBebidas.push({
            produto,sabor,valor,quantidade
        });
        alert("Produto Adicionado com Sucesso!!!");
        break;

        case "ProdutosBalcao":this.cardapioProdutosBalcao.push({
            produto,sabor,valor,quantidade
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
            this.editarProdutos = true;
            let produto = document.querySelector("#produto").value;
            this.editProduto(key,produto);
        });
        });
    });
}

editProduto(key,produto){
    this.key = key;
    switch(produto){
        case "Pasteis":this.cardapioPasteis.child(key).on("value",e=>{

            let a = e.val();
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
        case "Panquecas":this.cardapioPanquecas.child(key).on("value",e=>{

            let a = e.val();
            
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
        case "Batatas":this.cardapioBatatas.child(key).on("value",e=>{

            let a = e.val();
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
        case "Tapiocas":this.cardapioTapiocas.child(key).on("value",e=>{

            let a = e.val();
            
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
        case "Bebidas":this.cardapioBebidas.child(key).on("value",e=>{

            let a = e.val();
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
        case "ProdutosBalcao":this.cardapioProdutosBalcao.child(key).on("value",e=>{

            let a = e.val();
            
            let sabor = a.sabor;
            let quantidade = a.quantidade;
            let valor = a.valor;

            this.listarNoEditor(sabor,quantidade,valor);
        });
        break;
    }
}

listarNoEditor(sabor,quantidade,valor){
    document.querySelector("#sabor").value = sabor;
    document.querySelector("#quantidade").value = quantidade;
    document.querySelector("#valor").value = valor;
    console.log(sabor,quantidade,valor);
}

editarItem(item){
    let key = this.key;
    console.log(key);
    let produto = item;
    let sabor = document.getElementById("sabor").value;
    let valor = document.getElementById("valor").value;
    let valorInicial = document.getElementById("valorInicial").value;
    let quantidade = document.getElementById("quantidade").value;
    switch(item){
        case "Pasteis": this.cardapioPasteis.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;

        case "Panquecas": this.cardapioPanquecas.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;

        case "Tapiocas":this.cardapioTapiocas.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;

        case "Batatas": this.cardapioBatatas.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;
        
        case "Bebidas": this.cardapioBebidas.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;

        case "ProdutosBalcao":this.cardapioProdutosBalcao.child(key).update({
            produto,sabor,valor,quantidade,valorInicial
        });
        alert("Produto Editado com Sucesso!!!");
        break;
    }
}

}
var cardapio = new Cardapio();