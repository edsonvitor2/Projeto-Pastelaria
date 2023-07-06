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

    // aqui vai os botoes de adicionar ou remover quaqntidades de pasteis 
    
    let btn_mais_carne = document.querySelector(".aum_carne");

    let btn_menos_carne = document.querySelector(".dim_carne");

    let btn_mais_ccq = document.querySelector(".aum_ccq");

    let btn_menos_ccq = document.querySelector(".dim_ccq");

    let btn_mais_ccc = document.querySelector(".aum_ccc");

    let btn_menos_ccc = document.querySelector(".dim_ccc");

    let btn_mais_ccb = document.querySelector(".aum_ccb");

    let btn_menos_ccb = document.querySelector(".dim_ccb");
    
    let btn_mais_ccp = document.querySelector(".aum_ccp");

    let btn_menos_ccp = document.querySelector(".dim_ccp");

    let btn_mais_frango = document.querySelector(".aum_frango");

    let btn_menos_frango = document.querySelector(".dim_frango");

    let btn_mais_fcq = document.querySelector(".aum_fcq");

    let btn_menos_fcq = document.querySelector(".dim_fcq");

    let btn_mais_fcc = document.querySelector(".aum_fcc");

    let btn_menos_fcc = document.querySelector(".dim_fcc");

    let btn_mais_fcb = document.querySelector(".aum_fcb");

    let btn_menos_fcb = document.querySelector(".dim_fcb");

    let btn_mais_fcs = document.querySelector(".aum_fcs");

    let btn_menos_fcs = document.querySelector(".dim_fcs");

    let btn_mais_queijo = document.querySelector(".aum_queijo");

    let btn_menos_queijo = document.querySelector(".dim_queijo");

    let btn_mais_qcp = document.querySelector(".aum_ccp");

    let btn_menos_qcp = document.querySelector(".dim_ccp");

    let btn_mais_qcc = document.querySelector(".aum_qcc");

    let btn_menos_qcc = document.querySelector(".dim_qcc");

    let btn_mais_qcs = document.querySelector(".aum_qcs");

    let btn_menos_qcs = document.querySelector(".dim_qcs");
    // botao de + - carne 
    btn_mais_carne.addEventListener("click", e=>{
        this.somarUnidade("qtd_carne");
    });

    btn_menos_carne.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_carne");
    });

    // botao de + - carne com queijo 
    btn_mais_ccq.addEventListener("click", e=>{
        this.somarUnidade("qtd_ccq");
    });
    btn_menos_ccq.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_ccq");
    });

    // botao de + - carne com calabresa 
    btn_mais_ccc.addEventListener("click", e=>{
        this.somarUnidade("qtd_ccc");
    });
    btn_menos_ccc.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_ccc");
    });

    // botao de + - carne com bacon
    btn_mais_ccb.addEventListener("click", e=>{
        this.somarUnidade("qtd_ccb");
    });
    btn_menos_ccb.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_ccb");
    });

    // botao de + - carne com presunto
    btn_mais_ccp.addEventListener("click", e=>{
        this.somarUnidade("qtd_ccp");
    });
    btn_menos_ccp.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_ccp");
    });

    // botao de + - frango
    btn_mais_frango.addEventListener("click", e=>{
        this.somarUnidade("qtd_frango");
    });
    btn_menos_frango.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_frango");
    });

    // botao de + - frango com queijo
    btn_mais_fcq.addEventListener("click", e=>{
        this.somarUnidade("qtd_fcq");
    });
    btn_menos_fcq.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_fcq");
    });

    // botao de + - frango com catupiry
    btn_mais_fcc.addEventListener("click", e=>{
        this.somarUnidade("qtd_fcc");
    });
    btn_menos_fcc.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_fcc");
    });

    // botao de + - frango com bacon
    btn_mais_fcb.addEventListener("click", e=>{
        this.somarUnidade("qtd_fcb");
    });
    btn_menos_fcb.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_fcb");
    });

    // botao de + - frango com cheddar
    btn_mais_fcs.addEventListener("click", e=>{
        this.somarUnidade("qtd_fcs");
    });
    btn_menos_fcs.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_fcs");
    });

    // botao de + - queijo
    btn_mais_queijo.addEventListener("click", e=>{
        this.somarUnidade("qtd_queijo");
    });
    btn_menos_queijo.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_queijo");
    });

    // botao de + - queijo com presunto
    btn_mais_qcp.addEventListener("click", e=>{
        this.somarUnidade('qtd_qcp');
    });
    btn_menos_qcp.addEventListener("click", e=>{
        this.subtrairUnidade('qtd_qcp');
    });

    // botao de + - queijo com catupiry
    btn_mais_qcc.addEventListener("click", e=>{
        this.somarUnidade("qtd_qcc");
    });
    btn_menos_qcc.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_qcc");
    });

    // botao de + - queijo com cheddar
    btn_mais_qcs.addEventListener("click", e=>{
        this.somarUnidade("qtd_qcs");
    });
    btn_menos_qcs.addEventListener("click", e=>{
        this.subtrairUnidade("qtd_qcs");
    });
    //finaliza os botoes de selecionar quantidade de sabores de pasteis

    // agora começa os botoes para adicoinar no carrinho!!!

    let btn_car_carne = document.querySelector("#car-carne");

    btn_car_carne.addEventListener("click", e=>{
        let produto = "carne";
        let quantidade = parseInt(document.querySelector("#qtd_carne").value);
        let valor = 15 * quantidade;
        console.log(produto,quantidade,valor);
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

    
    document.querySelector(".nome-cliente").innerHTML = nomeCliente;

    var clientes = new Cliente(nomeCliente,telefoneCliente,qtdCliente,visitasCliente);

    painel.style.display = "none";
    cardapio.style.display = "block";
    cliente.style.display = "block";

}

somarUnidade(id){
    
    let ed = id;

    let unidade = document.getElementById(id).value;
    
    let n1 = parseInt(unidade);

    let resultado = n1 + 1;
    console.log(resultado);
    document.getElementById(ed).value = resultado;

}

subtrairUnidade(id){

    let unidade = document.getElementById(id).value;
    if(unidade == 0){
        return false;
    }else{
        let n1 = parseInt(unidade);

        let resultado = n1 - 1;
    
        document.getElementById(id).value = resultado;
    }
   
}


}

var painelBalcao = new PainelBalcao();