class PainelBalcao {
    constructor(){
        this.InitButons();

        this.painelMontar = false;
        this.sabores = false;
    }

InitButons(){
    //Obter Botoes 

    let abrirPainelNovoCliente = document.querySelector(".abrir-painel");

    let fecharPainelNovoCliente = document.querySelector(".fechar");

    let salvarCliente = document.querySelector(".Botao-enviar");

    let pastel = document.querySelector(".pastel");
    
    let Panqueca = document.querySelector(".Panqueca");

    abrirPainelNovoCliente.addEventListener("click", e =>{
        this.abrirPainel();
    });

    fecharPainelNovoCliente.addEventListener("click", e =>{
        this.fecharPainel();
    });

    salvarCliente.addEventListener("click", e =>{
        e.preventDefault();
        this.enviarCliente();
    });

    pastel.addEventListener("click", e =>{
        if(this.painelMontar == true){
            this.fecharPainelMontar();
            this.painelMontar = false;
        }else if(this.painelMontar == false){
            this.abrirPainelMontar();
            this.painelMontar = true;
        }
    });

    Panqueca.addEventListener("click", e =>{
        if(this.painelMontar == true){
            this.fecharPainelMontar();
            this.painelMontar = false;
        }else if(this.painelMontar == false){
            this.abrirPainelMontar();
            this.painelMontar = true;
        }
    });

    
}
abrirPainelAdicionais(){
    let painel = document.querySelector(".montar");
    painel.style.display = "block";
}

abrirPainelSabores(){
    let painel = document.querySelector(".sabores");
    painel.style.display = "block";
}
fecharPainelSabores(){
    let painel = document.querySelector(".sabores");
    painel.style.display = "none";
}

abrirPainelMontar(){
    let painel = document.querySelector(".montar");
    painel.style.display = "block";
}

fecharPainelMontar(){
    let painel = document.querySelector(".montar");
    painel.style.display = "none";
}

abrirPainel(){
    console.log("Abrir painel");

    let painel = document.querySelector(".criar-clientes");
    let Pedidos = document.querySelector(".pedidos");

    painel.style.display = "block";
    Pedidos.style.display = "none";
}
fecharPainel(){
    console.log("Fechar painel");
    let Pedidos = document.querySelector(".pedidos");
    let painel = document.querySelector(".criar-clientes");
    painel.style.display = "none";
    Pedidos.style.display = "block";
}
enviarCliente(){
    console.log("Salvar cliente");

    let cardapio = document.querySelector(".Cardapio");
    let painel = document.querySelector(".criar-clientes");
    let cliente = document.querySelector(".nome-cliente");
    let nomeCliente = document.getElementById("nome-cliente").value;
    let telefoneCliente = document.getElementById("telefone-cliente").value;
    let qtdCliente = document.getElementById("qtd-cliente").value;
    let visitasCliente = document.getElementById("visita-cliente").value;

    console.log(nomeCliente);

    painel.style.display = "none";
    cardapio.style.display = "block";
    cliente.style.display = "block";

    document.querySelector(".nome-cliente").innerHTML = nomeCliente;

    var clientes = new Cliente(telefoneCliente,nomeCliente,qtdCliente,visitasCliente);
}


}

var painelBalcao = new PainelBalcao();