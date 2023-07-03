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

    let sabores = document.querySelector(".add-sabores");
    //Utilizando Botoes add-sabores

    sabores.addEventListener("click", e =>{
        if(this.sabores == true){
            this.fecharPainelSabores();
            this.sabores = false;
        }else if(this.sabores == false){
            this.abrirPainelSabores();
            this.sabores = true;
        }
        
    });

    abrirPainelNovoCliente.addEventListener("click", e =>{
        this.abrirPainel();
    });

    fecharPainelNovoCliente.addEventListener("click", e =>{
        this.fecharPainel();
    });

    salvarCliente.addEventListener("click", e =>{
        event.preventDefault();
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
    painel.style.display = "block";
}
fecharPainel(){
    console.log("Fechar painel");
    let painel = document.querySelector(".criar-clientes");
    painel.style.display = "none";
}
enviarCliente(){
    console.log("Salvar cliente");
    let painel = document.querySelector(".criar-clientes");
    painel.style.display = "none";
}


}

var painelBalcal = new PainelBalcao();