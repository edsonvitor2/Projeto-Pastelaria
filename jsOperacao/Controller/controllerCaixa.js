class Caixa{
constructor(){
    this.keycaixa;
    this.status;
    this.initButtons();
    this.listarCaixa();
    this.diferenca();
}
initButtons(){
    let abrirCaixa = document.querySelector(".abriCaixa");

    let fecharCaixa = document.querySelector("#fechar-caixa");

    abrirCaixa.addEventListener("click",e=>{
        this.abrirCaixa();
    });
    fecharCaixa.addEventListener("click",e=>{
        this.fecharCaixa();
    });
}

fecharCaixa(){
    let dataAtual = new Date();
    let hora = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();
    let horaFim = `${hora}:${minutos}`;

    let debito = parseFloat(document.querySelector("#caixa-debito").value);

    let credito = parseFloat(document.querySelector("#caixa-credito").value);

    let pix = parseFloat(document.querySelector("#caixa-pix").value);

    let dinheiro = parseFloat(document.querySelector("#caixa-dinheiro").value);
    let status = 'fechado';
    firebase.database().ref('Caixas').child(this.keycaixa).update({
        debito,
        credito,
        pix,
        dinheiro,
        status,
        horaFim
    });
}

diferenca(){
    let inputDebito = document.querySelector("#caixa-debito");
    let inputCredeito = document.querySelector("#caixa-credito");
    let inputDinheiro = document.querySelector("#caixa-dinheiro");
    let inputPix = document.querySelector("#caixa-pix");

    inputPix.addEventListener("keyup",e=>{
        let pixSis = document.querySelector("#sis-pix").value;

        let a = event.target.value;
        var pix = parseFloat(a);
        let diferenca = pix - pixSis;

        document.querySelector("#dif-pix").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputDinheiro.addEventListener("keyup",e=>{
        let dinheiroSis = document.querySelector("#sis-dinheiro").value;

        let a = event.target.value;
        var dinheiro = parseFloat(a);
        let diferenca = dinheiro - dinheiroSis;

        document.querySelector("#dif-dinheiro").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputDebito.addEventListener("keyup",e=>{
        let debitoSis = document.querySelector("#sis-debito").value;

        let a = event.target.value;
        var debito = parseFloat(a);
        let diferenca = debito - debitoSis;
        document.querySelector("#dif-debito").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputCredeito.addEventListener("keyup",e=>{
        let creditoSis = document.querySelector("#sis-credito").value;

        let a = event.target.value;
        var credito = parseFloat(a);
        let diferenca = credito - creditoSis;
        document.querySelector("#dif-credito").value = diferenca.toFixed(2);
        
        this.calcularDiferenca();
    });
    
}
calcularDiferenca() {
    let debito = parseFloat(document.querySelector("#caixa-debito").value) || 0;
    let credito = parseFloat(document.querySelector("#caixa-credito").value) || 0;
    let pix = parseFloat(document.querySelector("#caixa-pix").value) || 0;
    let dinheiro = parseFloat(document.querySelector("#caixa-dinheiro").value) || 0;
  
    let somaTotal = debito + credito + dinheiro + pix;
    document.querySelector("#caixa-total").value = somaTotal.toFixed(2);

    let totalSis = document.querySelector("#sis-total").value;

    let difTotal = totalSis - somaTotal;

    document.querySelector("#dif-total").value = difTotal;
  }

listarValoresCaixaFechado(){

    if(this.status  == 'aberto'){
        console.log("aberto");
    }else{
        firebase.database().ref('Caixas').child(this.keycaixa).once('value',e =>{
           
        let data = e.val();
        let debito = data.debito;
        let credito =data.credito;
        let pix = data.pix;
        let dinheiro = data.dinheiro;
        let total = pix + debito + credito + dinheiro;
    
    document.querySelector("#caixa-pix").value = pix.toFixed(2);

    document.querySelector("#caixa-dinheiro").value = dinheiro.toFixed(2);

    document.querySelector("#caixa-credito").value = credito.toFixed(2);

    document.querySelector("#caixa-debito").value = debito.toFixed(2);

    

    document.querySelector("#caixa-total").value = total.toFixed(2);

        });
    }

}

listarPedidos(caixa) {
    var forDebito = [];
    var forCredito = [];
    var forPix = [];
    var forDinheiro = [];
    document.querySelector("#sis-pix").value = 0;
    document.querySelector("#sis-dinheiro").value = 0;
    document.querySelector("#sis-credito").value = 0;
    document.querySelector("#sis-debito").value = 0;

    firebase.database().ref("pedidos").once("value", element => {
        let table = document.querySelector("#pedido");
        table.innerHTML = '';
        element.forEach(e => {
            let key = e.key;
            let pedido = e.key;

            e.forEach(a => {
                let dados = a.val();

                if (dados.caixa == caixa) {
                    let cliente = dados.cliente;
                    let formaPagamento = dados.FormaPagamento;
                    let valor = dados.valorTotalPedido;

                    if (formaPagamento == 'debito') {
                        forDebito.push(valor);
                        let soma = forDebito.join("+");
                        var debito = eval(soma);
                        document.querySelector("#sis-debito").value = debito.toFixed(2);
                    } else if (formaPagamento == 'credito') {
                        forCredito.push(valor);
                        let soma = forCredito.join("+");
                        var credito = eval(soma);
                        document.querySelector("#sis-credito").value = credito.toFixed(2);
                    } else if (formaPagamento == 'dinheiro') {
                        forDinheiro.push(valor);
                        let soma = forDinheiro.join("+");
                        var dinheiro = eval(soma);
                        document.querySelector("#sis-dinheiro").value = dinheiro.toFixed(2);
                    } else if (formaPagamento == 'pix') {
                        forPix.push(valor);
                        let soma = forPix.join("+");
                        var pix = eval(soma);
                        console.log(pix)
                        document.querySelector("#sis-pix").value = pix.toFixed(2);
                    }

                    // Calcula o total de todas as formas de pagamento
    var total = forDebito.reduce((acc, val) => acc + val, 0) +
                forCredito.reduce((acc, val) => acc + val, 0) +
                forDinheiro.reduce((acc, val) => acc + val, 0) +
                forPix.reduce((acc, val) => acc + val, 0);

                    document.querySelector("#sis-total").value = total.toFixed(2);

                    let tr = document.createElement('tr');

                    tr.innerHTML = ` 
                        <td class="pedido">${pedido}</td>
                        <td>${cliente}</td>
                        <td>${valor.toFixed(2)}</td>
                        <td>${formaPagamento}</td>
                        <td>
                            Descrição
                        </td>
                    `;
                    table.appendChild(tr);
                }
            });
        });
    });
}

    abrirCaixa(){
        
        let data = document.querySelector("#data").value;
        let turno = document.querySelector("#turno").value;
        let fundoCaixa = document.querySelector("#fundo").value;
        var id = 0;
        let status = "aberto"; 
        let dataAtual = new Date();
        let hora = dataAtual.getHours();
        let minutos = dataAtual.getMinutes();
        let horaInicio = `${hora}:${minutos}`;
        let horaFim = "00:00";
        
        firebase.database().ref("Caixas").push({
            id,data,turno,status,fundoCaixa,horaInicio,horaFim
        });
    }

    listarCaixa(){

        let table = document.querySelector(".tabelaCaixa");
        firebase.database().ref('Caixas').once("value",element=>{
            table.innerText ='';
            element.forEach(e => {
                let key = e.key;
                let data = e.val();
                
                let tr = document.createElement('tr');
    
                tr.innerHTML = ` 
                <td class="id">${data.id}</td>
                <td>${data.data}</td>
                <td>${data.fundoCaixa}</td>
                <td>${data.status}</td>
                <td>Total Vendido</td>
                <td>
                <button id="abrir">Abrir</button>
                </td>`;
            table.appendChild(tr);

            tr.querySelector("#abrir").addEventListener("click",e=>{
              
                firebase.database().ref('Caixas').child(key).once('value',e =>{
                    this.keycaixa = key;
                   
                    console.log(this.keycaixa);
                    let dados = e.val();
                    this.status = dados.status;
                    document.querySelector("#data2").value = dados.data;
                    document.querySelector("#horainicio").value = dados.horaInicio;
                    document.querySelector("#horafim").value = dados.horaFim;
                    let idcaixa = tr.querySelector(".id").innerText;
                    this.listarPedidos(idcaixa);
                    this.listarValoresCaixaFechado();
                });
                
            });

            });
        });
    }


}

var caixa = new Caixa();


//