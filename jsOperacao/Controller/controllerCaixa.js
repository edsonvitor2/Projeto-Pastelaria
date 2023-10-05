class Caixa{
constructor(){
    this.keycaixa;
    this.status;
    this.initButtons();
    this.listarCaixa();
    this.diferenca();

    this.valorDelivery;
    this.valorMesa;
    this.valorBalcao;

    this.debitoMesa;
    this.debitoBalcao;
    this.debitoDelivery;
}

initButtons(){
    let abrirCaixa = document.querySelector(".abriCaixa");

    let fecharCaixa = document.querySelector("#fechar-caixa");

    let fecharCaixaVisu = document.querySelector(".fechar-caixa");

    let fecharDesc = document.querySelector(".fecharDesc");

    let inputDebito = document.querySelector("#caixa-debito");
    let inputCredito = document.querySelector("#caixa-credito");
    let inputDinheiro = document.querySelector("#caixa-dinheiro");
    let inputPix = document.querySelector("#caixa-pix");

    inputDebito.addEventListener('keyup',e =>{
        let char = e.key;
        if(char == ','){
            char = '.'
            let value = document.querySelector("#caixa-debito").value;
            let result = value + char;
            let a = result.split('');
            a.splice(a.length - 2,1);
            console.log(a);
            let valor = a.join('');
            document.querySelector("#caixa-debito").value = valor;
        }
    });
    inputCredito.addEventListener('keyup',e =>{
        let char = e.key;
        if(char == ','){
            char = '.'
            let value = document.querySelector("#caixa-credito").value;
            let result = value + char;
            let a = result.split('');
            a.splice(a.length - 2,1);
            console.log(a);
            let valor = a.join('');
            document.querySelector("#caixa-credito").value = valor;
        }
    });
    inputDinheiro.addEventListener('keyup',e =>{
        let char = e.key;
        if(char == ','){
            char = '.'
            let value = document.querySelector("#caixa-dinheiro").value;
            let result = value + char;
            let a = result.split('');
            a.splice(a.length - 2,1);
            console.log(a);
            let valor = a.join('');
            document.querySelector("#caixa-dinheiro").value = valor;
        }
    });
    inputPix.addEventListener('keyup',e =>{
        let char = e.key;
        if(char == ','){
            char = '.'
            let value = document.querySelector("#caixa-pix").value;
            let result = value + char;
            let a = result.split('');
            a.splice(a.length - 2,1);
            console.log(a);
            let valor = a.join('');
            document.querySelector("#caixa-pix").value = valor;
        }
    });

    fecharDesc.addEventListener('click',e=>{
        document.querySelector(".descricao").style.display ='none';
    })
    fecharCaixaVisu.addEventListener("click",e=>{
        document.querySelector(".caixa").style.display = 'none';
    });
    abrirCaixa.addEventListener("click",e=>{
        this.abrirCaixa();
        setTimeout(() => {
            location.reload();
            }, 500);
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
    alert("Caixa fechado Com Sucesso!!!");
}

diferenca(){
    let inputDebito = document.querySelector("#caixa-debito");
    let inputCredeito = document.querySelector("#caixa-credito");
    let inputDinheiro = document.querySelector("#caixa-dinheiro");
    let inputPix = document.querySelector("#caixa-pix");

    inputPix.addEventListener("keyup",e=>{
        let pixsis = document.querySelector("#sis-pix").value;

        let a = event.target.value;
        var pix = parseFloat(a);
        let diferenca = pix - pixsis;

        document.querySelector("#dif-pix").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputDinheiro.addEventListener("keyup",e=>{
        let dinheirosis = document.querySelector("#sis-dinheiro").value;

        let a = event.target.value;
        var dinheiro = parseFloat(a);
        let diferenca = dinheiro - dinheirosis;

        document.querySelector("#dif-dinheiro").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputDebito.addEventListener("keyup",e=>{
        let debitosis = document.querySelector("#sis-debito").value;

        let a = event.target.value;
        var debito = parseFloat(a);
        let diferenca = debito - debitosis;
        document.querySelector("#dif-debito").value = diferenca.toFixed(2);
        this.calcularDiferenca();
    });

    inputCredeito.addEventListener("keyup",e=>{
        let creditosis = document.querySelector("#sis-credito").value;

        let a = event.target.value;
        var credito = parseFloat(a);
        let diferenca = credito - creditosis;
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

    let totalsis = document.querySelector("#sis-total").value;

    let difTotal = totalsis - somaTotal;

    document.querySelector("#dif-total").value = difTotal.toFixed(2);
  }

listarValoresCaixaFechado(){

    if(this.status  == 'aberto'){
        document.querySelector("#dif-pix").value = '0,00';
        document.querySelector("#dif-debito").value = '0,00';
        document.querySelector("#dif-credito").value = '0,00';
        document.querySelector("#dif-dinheiro").value = '0,00';
        document.querySelector("#dif-total").value = '0,00';

    document.querySelector("#caixa-pix").value = '0,00';

    document.querySelector("#caixa-dinheiro").value = '0,00';

    document.querySelector("#caixa-credito").value ='0,00';

    document.querySelector("#caixa-debito").value = '0,00';

    document.querySelector("#caixa-total").value = '0,00';
    }else{
        firebase.database().ref('Caixas').child(this.keycaixa).once('value',e =>{
           
        let data = e.val();

        let debito =  data.debito;
        let credito = data.credito;
        let pix = data.pix;
        let dinheiro = data.dinheiro;
        let total = pix + debito + credito + dinheiro;

        let sisdebito = document.querySelector("#sis-debito").value;
        let siscredito = document.querySelector("#sis-credito").value;
        let sispix = document.querySelector("#sis-pix").value;
        let sisdinheiro = document.querySelector("#sis-dinheiro").value;
        let sistotal = document.querySelector("#sis-total").value;

    document.querySelector("#caixa-pix").value = pix.toFixed(2);

    document.querySelector("#caixa-dinheiro").value = dinheiro.toFixed(2);

    document.querySelector("#caixa-credito").value = credito.toFixed(2);

    document.querySelector("#caixa-debito").value = debito.toFixed(2);

    document.querySelector("#caixa-total").value = total.toFixed(2);

        document.querySelector("#dif-debito").value = sisdebito - debito;
        document.querySelector("#dif-pix").value = sispix - pix;
        document.querySelector("#dif-credito").value = siscredito - credito;
        document.querySelector("#dif-dinheiro").value = sisdinheiro - dinheiro;
        document.querySelector("#dif-total").value = sistotal - total;


        });
    }
}

listarPedidosBalcao(caixa) {
    var forDebito = [];
    var forCredito = [];
    var forPix = [];
    var forDinheiro = [];
    let total;

    document.querySelector("#sis-pix").value = 0;
    document.querySelector("#sis-dinheiro").value = 0;
    document.querySelector("#sis-credito").value = 0;
    document.querySelector("#sis-debito").value = 0;

    firebase.database().ref("pedidos").once("value", element => {
        let table = document.querySelector("#pedido-balcao");
        table.innerHTML = '';
        element.forEach(e => {
            let key = e.key;
            let pedido = e.val();

                if (pedido.caixa == caixa && pedido.status == 'Finalizado!') {
                    let cliente = pedido.nome;
                    let formaPagamento = pedido.pagamento;
                    let valor = pedido.valorPedido;
                    let pagamento = pedido.pagamento;

                    let tr = document.createElement('tr');

                    tr.innerHTML = ` 
                        <td class="pedido">'---'</td>
                        <td>${cliente}</td>
                        <td>${valor}</td>
                        <td>${formaPagamento}</td>
                        <td>
                            <button id="btn-descrição">
                            Descrição
                            </button>
                        </td>
                    `;
                    table.appendChild(tr);
                    if(pagamento == 'debito'){
                        forDebito.push(valor);
                        //console.log(forDebito);
                    }else if(pagamento == 'credito'){
                        forCredito.push(valor);
                        //console.log(forCredito);
                    }
                    else if(pagamento == 'dinheiro'){
                        forDinheiro.push(valor);
                        //console.log(forDinheiro);
                    }
                    else if(pagamento == 'pix'){
                        forPix.push(valor);
                        //console.log(forPix);
                    }
                    else if(pagamento == 'separado'){
                        forDebito.push(pedido.debito);
                        //console.log('debito',forDebito);

                        forCredito.push(pedido.credito);
                        //console.log('credito',forCredito);

                        forDinheiro.push(pedido.dinheiro);
                        //console.log('Dinheir',forDinheiro);

                        forPix.push(pedido.pix);
                        //console.log('Pix',forPix);
                    }

                    let soma = forDebito.join('+');
                    let debito = eval(soma);

                    let somaP = forPix.join('+');
                    var pix = eval(somaP);
                    //console.log('pix',pix);

                    let somaDi = forDinheiro.join('+');
                    var dinheiro = eval(somaDi);
                    //console.log('dinheiro',dinheiro);

                    let somaC = forCredito.join('+');
                    var credito = eval(somaC);
                    //console.log('credito',credito);
                    if(isNaN(debito)){
                        debito = 0;
                    }
                    if(isNaN(pix)){
                        pix = 0;
                    }
                    if(isNaN(dinheiro)){
                        dinheiro = 0;
                    }
                    if(isNaN(credito)){
                        credito = 0;
                    }

                    total = debito+pix+dinheiro+credito;

                    if(isNaN(total)){
                        this.valorBalcao = 0;
                    }else{
                        this.valorBalcao = total;
                    }
                    
                    this.debitoBalcao = debito;
                    this.creditoBalcao = credito;
                    this.dinheiroBalcao = dinheiro;
                    this.pixBalcao = pix;

                    tr.querySelector("#btn-descrição").addEventListener("click",e=>{

                        document.querySelector(".descricao").style.display ='block';

                        let descPedido = document.querySelector(".pedidosDesc");
                        
                        descPedido.innerHTML = '';
                        console.log(pedido,key)
                        firebase.database().ref("pedidos").child(key).once('value',snapshot=>{
                        let val = snapshot.val();

                        let item = val.pedido;
                            item.forEach(e =>{
                                let itens = e;
                                let trPedidos = document.createElement('tr');
        
                                trPedidos.innerHTML = ` 
                                <td>${itens.produto}</td>
                                <td>${itens.sabor}</td>
                                <td>${itens.quantidade}</td>
                                <td>${itens.valor}</td>
                            `;
                            descPedido.appendChild(trPedidos);
                            })
                        })
                    })
                }
        });
        console.log('total Balcao',total);
    });
}

listarPedidosDelivey(caixa) {
    var forDebito = [];
    var forCredito = [];
    var forPix = [];
    var forDinheiro = [];
    let total;

    document.querySelector("#sis-pix").value = 0;
    document.querySelector("#sis-dinheiro").value = 0;
    document.querySelector("#sis-credito").value = 0;
    document.querySelector("#sis-debito").value = 0;

    firebase.database().ref("pedidoDelivery").once("value", element => {
        let table = document.querySelector("#pedido-delivery");
        table.innerHTML = '';
        element.forEach(e => {
            let key = e.key;
            let pedido = e.val();

                if (pedido.caixa == caixa && pedido.status == 'Finalizado!') {
                    let cliente = pedido.nome;
                    let pagamento = pedido.pagamento;
                    let valor = pedido.valorPedido;

                    if(pagamento == 'debito'){
                        forDebito.push(valor);
                        //console.log(forDebito);
                    }else if(pagamento == 'credito'){
                        forCredito.push(valor);
                        //console.log(forCredito);
                    }
                    else if(pagamento == 'dinheiro'){
                        forDinheiro.push(valor);
                        //console.log(forDinheiro);
                    }
                    else if(pagamento == 'pix'){
                        forPix.push(valor);
                        //console.log(forPix);
                    }
                    else if(pagamento == 'separado'){
                        forDebito.push(pedido.debito);
                        //console.log('debito',forDebito);

                        forCredito.push(pedido.credito);
                        //console.log('credito',forCredito);

                        forDinheiro.push(pedido.dinheiro);
                        //console.log('Dinheir',forDinheiro);

                        forPix.push(pedido.pix);
                        //console.log('Pix',forPix);
                    }

                    let soma = forDebito.join('+');
                    let debito = eval(soma);
                    //console.log('debito',debito);

                    let somaP = forPix.join('+');
                    var pix = eval(somaP);
                    //console.log('pix',pix);

                    let somaDi = forDinheiro.join('+');
                    var dinheiro = eval(somaDi);
                    //console.log('dinheiro',dinheiro);

                    let somaC = forCredito.join('+');
                    var credito = eval(somaC);
                    //console.log('credito',credito);

                    if(isNaN(debito)){
                        debito = 0;
                    }
                    if(isNaN(pix)){
                        pix = 0;
                    }
                    if(isNaN(dinheiro)){
                        dinheiro = 0;
                    }
                    if(isNaN(credito)){
                        credito = 0;
                    }
                    total = debito+pix+dinheiro+credito;
                    
                    if(isNaN(total)){
                        this.valorDelivery = 0;
                    }else{
                        this.valorDelivery = total;
                    }
                    

                    this.debitoDelivery = debito;
                    this.creditoDelivery = credito;
                    this.dinheiroDelivery = dinheiro;
                    this.pixDelivery = pix;
                  
                    let tr = document.createElement('tr');

                    tr.innerHTML = ` 
                        <td class="pedido">'---'</td>
                        <td>${cliente}</td>
                        <td>${valor}</td>
                        <td>${pagamento}</td>
                        <td>
                            <button id="btn-descrição">
                            Descrição
                            </button>
                        </td>
                    `;
                    table.appendChild(tr);
                    tr.querySelector("#btn-descrição").addEventListener("click",e=>{

                        document.querySelector(".descricao").style.display ='block';

                        let descPedido = document.querySelector(".pedidosDesc");
                        
                        descPedido.innerHTML = '';
                        console.log(pedido,key)
                        firebase.database().ref("pedidoDelivery").child(key).once('value',snapshot=>{
                        let val = snapshot.val();

                        let item = val.pedido;
                            item.forEach(e =>{
                                let itens = e;
                                let trPedidos = document.createElement('tr');
        
                                trPedidos.innerHTML = ` 
                                <td>${itens.produto}</td>
                                <td>${itens.sabor}</td>
                                <td>${itens.quantidade}</td>
                                <td>${itens.valor}</td>
                            `;
                            descPedido.appendChild(trPedidos);
                            })
                        })
                    })
                }
        });
        console.log('total Delivery',total);
    });
}

listarPedidosMesa(caixa) {
    var forDebito = [];
    var forCredito = [];
    var forPix = [];
    var forDinheiro = [];
    let total;

    document.querySelector("#sis-pix").value = 0;
    document.querySelector("#sis-dinheiro").value = 0;
    document.querySelector("#sis-credito").value = 0;
    document.querySelector("#sis-debito").value = 0;

    firebase.database().ref("pedidosMesa").once("value", element => {
        let table = document.querySelector("#pedido-mesa");
        table.innerHTML = '';
        element.forEach(e => {
            let key = e.key;
            let pedido = e.val();

                if (pedido.caixa == caixa && pedido.status == 'Finalizado!') {
                    let cliente = pedido.nome;
                    let pagamento = pedido.pagamento;
                    let valor = pedido.valorPedido;

                    if(pagamento == 'debito'){
                        forDebito.push(valor);
                        //console.log(forDebito);
                    }else if(pagamento == 'credito'){
                        forCredito.push(valor);
                        //console.log(forCredito);
                    }
                    else if(pagamento == 'dinheiro'){
                        forDinheiro.push(valor);
                        //console.log(forDinheiro);
                    }
                    else if(pagamento == 'pix'){
                        forPix.push(valor);
                        //console.log(forPix);
                    }
                    else if(pagamento == 'separado'){
                        forDebito.push(pedido.debito);
                        //console.log('debito',forDebito);

                        forCredito.push(pedido.credito);
                        //console.log('credito',forCredito);

                        forDinheiro.push(pedido.dinheiro);
                        //console.log('Dinheir',forDinheiro);

                        forPix.push(pedido.pix);
                        //console.log('Pix',forPix);
                    }

                    let soma = forDebito.join('+');
                    let debito = eval(soma);
                    //console.log('debito',debito);

                    let somaP = forPix.join('+');
                    var pix = eval(somaP);
                    //console.log('pix',pix);

                    let somaDi = forDinheiro.join('+');
                    var dinheiro = eval(somaDi);
                    //console.log('dinheiro',dinheiro);

                    let somaC = forCredito.join('+');
                    var credito = eval(somaC);
                    //console.log('credito',credito);

                    if(isNaN(debito)){
                        debito = 0;
                    }
                    if(isNaN(pix)){
                        pix = 0;
                    }
                    if(isNaN(dinheiro)){
                        dinheiro = 0;
                    }
                    if(isNaN(credito)){
                        credito = 0;
                    }
                    total = debito+pix+dinheiro+credito;
                    
                    if(isNaN(total)){
                        this.valorMesa = 0;
                    }else{
                        this.valorMesa = total;
                    }

                    this.debitoMesa = debito;
                    console.log('debitomesa',debito);
                    this.creditoMesa = credito;
                    this.dinheiroMesa = dinheiro;
                    this.pixMesa = pix;

                    let tr = document.createElement('tr');

                    tr.innerHTML = ` 
                        <td class="pedido">'---'</td>
                        <td>${cliente}</td>
                        <td>${valor}</td>
                        <td>${pagamento}</td>
                        <td>
                            <button id="btn-descrição">
                            Descrição
                            </button>
                        </td>
                    `;
                    table.appendChild(tr);
                    tr.querySelector("#btn-descrição").addEventListener("click",e=>{

                        document.querySelector(".descricao").style.display ='block';

                        let descPedido = document.querySelector(".pedidosDesc");
                        
                        descPedido.innerHTML = '';
                        console.log(pedido,key)
                        firebase.database().ref("pedidosMesa").child(key).once('value',snapshot=>{
                        let val = snapshot.val();

                        let item = val.pedido;
                            item.forEach(e =>{
                                let itens = e;
                                let trPedidos = document.createElement('tr');
        
                                trPedidos.innerHTML = ` 
                                <td>${itens.produto}</td>
                                <td>${itens.sabor}</td>
                                <td>${itens.quantidade}</td>
                                <td>${itens.valor}</td>
                            `;
                            descPedido.appendChild(trPedidos);
                            })
                        })
                    })
                }
        });
        console.log('total Mesa',total);
    });
}
abrirCaixa() {
    // Obter os valores do novo caixa
    let data = document.querySelector("#data").value;
    let turno = document.querySelector("#turno").value;
    let fundoCaixa = document.querySelector("#fundo").value;
    let status = "aberto"; 
    let dataAtual = new Date();
    let hora = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();
    let horaInicio = `${hora}:${minutos}`;
    let horaFim = "00:00";

    // Primeiro, obtemos a referência para a lista de Caixas no Firebase e ordenamos pela chave ID em ordem decrescente.
    const caixasRef = firebase.database().ref("Caixas").orderByChild("id").limitToLast(1);

    // Em seguida, usamos a função once() para obter o último caixa registrado.
    caixasRef.once("value", snapshot => {
        // Verificamos se há algum caixa registrado.
        if (snapshot.exists()) {
            // Se existir, pegamos o valor do ID do último caixa.
            const ultimoCaixa = Object.values(snapshot.val())[0];
            const ultimoCaixaId = ultimoCaixa.id;

            // Verificamos se o último caixa está fechado.
            if (ultimoCaixa.status === "fechado") {
                // Se estiver fechado, somamos 1 ao ID para obter o ID do próximo caixa.
                const novoId = ultimoCaixaId + 1;

                // Finalmente, criamos o novo caixa no Firebase com o novo ID.
                firebase.database().ref("Caixas").push({
                    id: novoId,
                    data,
                    turno,
                    status,
                    fundoCaixa,
                    horaInicio,
                    horaFim
                });
                alert("Caixa Aberto Com Sucesso!!!");
            } else {
                // Caso o último caixa esteja aberto, exibimos uma mensagem de erro.
                alert("Aviso: Há um caixa aberto. Por favor, feche o caixa atual antes de abrir um novo.");
            }
        } else {
            // Caso não haja nenhum caixa registrado ainda (novo estabelecimento), criamos o primeiro caixa com ID 1.
            firebase.database().ref("Caixas").push({
                id: 1,
                data,
                turno,
                status,
                fundoCaixa,
                horaInicio,
                horaFim
            });
        }
    });
}

    listarCaixa(){

        let table = document.querySelector(".tabelaCaixa");
        firebase.database().ref('Caixas').once("value",element=>{
            table.innerText ='';
            element.forEach(e => {
                let key = e.key;
                let data = e.val();
                
                let tr = document.createElement('ul');
    
                tr.innerHTML = ` 
                <li class="id">ID Caixa : ${data.id}</li>
                <li> data : ${data.data}</li>
                <li> Fundo : ${data.fundoCaixa}</li>
                <li> Data : ${data.status}</li>
                <li>
                <button id="abrir">Abrir</button>
                </li>`;
            table.appendChild(tr);

            tr.querySelector("#abrir").addEventListener("click",e=>{
                document.querySelector(".caixa").style.display = 'block';
                firebase.database().ref('Caixas').child(key).once('value',e =>{
                    this.keycaixa = key;
                   
                    let dados = e.val();
                    this.status = dados.status;

                    document.querySelector("#data2").value = dados.data;

                    document.querySelector("#horainicio").value = dados.horaInicio;

                    document.querySelector("#horafim").value = dados.horaFim;

                    document.querySelector("#status").value = dados.status;

                    document.querySelector("#fundoCaixa").value = dados.fundoCaixa;

                    let idcaixa = tr.querySelector(".id").innerText;

                    this.listarPedidosBalcao(idcaixa);
                    this.listarPedidosDelivey(idcaixa);
                    this.listarPedidosMesa(idcaixa);

                    setTimeout(() => {
                        this.valorTotalCaixa();
                        this.listarValoresCaixaFechado()
                        }, 500);
                    
                    ;
                });
                
            });

            });
        });
    }

valorTotalCaixa(){

    console.log(this.valorBalcao , this.valorDelivery , this.valorMesa);

    if(this.valorBalcao == undefined){
        this.valorBalcao = 0;
    }
    if(this.valorDelivery == undefined){
        this.valorDelivery = 0;
    }
    if(this.valorMesa == undefined){
        this.valorMesa = 0;
    }

    if(this.debitoMesa == undefined){
        this.debitoMesa = 0;
    }
    if(this.debitoDelivery == undefined){
        this.debitoDelivery = 0;
    }
    if(this.debitoBalcao == undefined){
        this.debitoBalcao = 0;
    }

    if(this.creditoMesa == undefined){
        this.creditoMesa = 0;
    }
    if(this.creditoDelivery == undefined){
        this.creditoDelivery = 0;
    }
    if(this.creditoBalcao == undefined){
        this.creditoBalcao = 0;
    }

    if(this.dinheiroMesa == undefined){
        this.dinheiroMesa = 0;
    }
    if(this.dinheiroDelivery == undefined){
        this.dinheiroDelivery = 0;
    }
    if(this.dinheiroBalcao == undefined){
        this.dinheiroBalcao = 0;
    }

    if(this.pixMesa == undefined){
        this.pixMesa = 0;
    }
    if(this.pixDelivery == undefined){
        this.pixDelivery = 0;
    }
    if(this.pixBalcao == undefined){
        this.pixBalcao = 0;
    }

    let valorTotal = this.valorBalcao + this.valorDelivery + this.valorMesa;
    let totalDebito =  this.debitoMesa + this.debitoDelivery + this.debitoBalcao ;
    let totalCredito =  this.creditoMesa  + this.creditoDelivery + this.creditoBalcao ;;
    let totalDinheiro =  this.dinheiroMesa + this.dinheiroDelivery + this.dinheiroBalcao ;;
    let totalPix =  this.pixMesa + this.pixDelivery + this.pixBalcao ;;

    document.querySelector("#sis-pix").value = totalPix;
    document.querySelector("#sis-dinheiro").value = totalDinheiro;
    document.querySelector("#sis-credito").value = totalCredito;
    document.querySelector("#sis-debito").value = totalDebito;
    document.querySelector("#sis-total").value = valorTotal;
    
    console.log('valorTotal',valorTotal);
    console.log('totalDebito',totalDebito);
    console.log('totalCredito',totalCredito);
    console.log('totalDinheiro',totalDinheiro);
    console.log('totalPix',totalPix);
}

}

var caixa = new Caixa();


//