class VilaControllerBalcao{
    constructor(){
        this.cardapio = firebase.database().ref("cardapio");

        this.carrinho = firebase.database().ref("carrinhoBalcao");
        this.EditarPedido = false;
        this.valortotal = [];
        this.adicionais = [];
        this.Value;
        this.addValue=[];
        this.valorAdc;
        this.pedido;
        this.idCardapio;
        this.keyProduto;
        this.itens;
        this.keyAttPedido ;
        this.valorAttPedido = [];
        this.qtdAttPedido;
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        this.listarPedidos();
        this.initAdicionais();
    }

    loadElements(){
        this.el = {};

        document.querySelectorAll("[id]").forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    elementsPrototype(){
        Element.prototype.hide = function(){
            this.style.display = "none";
        }

        Element.prototype.show = function(){
            this.style.display = "block";
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event=>{
                this.addEventListener(event,fn);
            });
        }

        Element.prototype.css = function(styles){
            for(let name in styles){
                this.style[name] = styles[name];
            }
        }
    }
    //qtdFrango
    initAdicionais(){
        this.el.adcFrango.on('click',e=>{
            this.addArrayAdicionais("  frango");
            this.adicionarValor(4);
        });
        this.el.removeFrango.on('click',e=>{
            this.removeArrayAdicionais('  frango');
            this.removerValor(4);
        });

        this.el.adcCarne.on('click',e=>{
            this.addArrayAdicionais(" Carne");
            this.adicionarValor(5);
        });
        this.el.removeCarne.on('click',e=>{
            this.removeArrayAdicionais(' Carne');
            this.removerValor(5);
        });

        this.el.adcMilho.on('click',e=>{
            this.addArrayAdicionais(" Milho");
            this.adicionarValor(2);
        });
        this.el.removeMilho.on('click',e=>{
            this.removerValor(2);
            this.removeArrayAdicionais(' Milho');
        });

        this.el.adcCheddar.on('click',e=>{
            this.addArrayAdicionais(" Cheddar");
            this.adicionarValor(2);
        });
        this.el.removeCheddar.on('click',e=>{
            this.removerValor(2);
            this.removeArrayAdicionais(' Cheddar');
        });

        this.el.adcMussarela.on('click',e=>{
            this.addArrayAdicionais(" Mussarela");
            this.adicionarValor(3);
        });
        this.el.removeMussarela.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Mussarela');
        });

        this.el.adcPequi.on('click',e=>{
            this.addArrayAdicionais(" Pequi");
            this.adicionarValor(3);
        });
        this.el.removePequi.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Pequi');
        });

        this.el.adcCatupiry.on('click',e=>{
            this.addArrayAdicionais(" Catupiry");
            this.adicionarValor(3);
        });
        this.el.removeCatupiry.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Catupiry');
        });

        this.el.adcTomate.on('click',e=>{
            this.addArrayAdicionais(" Tomate");
            this.adicionarValor(2);
        });
        this.el.removeTomate.on('click',e=>{
            this.removerValor(2);
            this.removeArrayAdicionais(' Tomate');
        });

        this.el.adcQueriroba.on('click',e=>{
            this.addArrayAdicionais(" Queriroba");
            this.adicionarValor(3);
        });
        this.el.removeQueriroba.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Queriroba');
        });

        this.el.adcPresunto.on('click',e=>{
            this.addArrayAdicionais(" Presunto");
            this.adicionarValor(3);
        });
        this.el.removePresunto.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Presunto');
        });

        this.el.adcAzeitona.on('click',e=>{
            this.addArrayAdicionais(" Azeitona");
            this.adicionarValor(2);
        });
        this.el.removeAzeitona.on('click',e=>{
            this.removerValor(2);
            this.removeArrayAdicionais(' Azeitona');
        });

        this.el.adcCalabresa.on('click',e=>{
            this.addArrayAdicionais(" Calabresa");
            this.adicionarValor(3);
        });
        this.el.removeCalabresa.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Calabresa');
        });

        this.el.adcPalmito.on('click',e=>{
            this.addArrayAdicionais(" Palmito");
            this.adicionarValor(3);
        });
        this.el.removePalmito.on('click',e=>{
            this.removerValor(3);
            this.removeArrayAdicionais(' Palmito');
        });
    }
    adicionarValor(value){
        this.addValue.push(value);
        let a = this.addValue.join('+');
        let b = eval(a);
        let d = parseFloat(this.value);
        let c = b + d;
        let valor = c.toFixed(2);
        firebase.database().ref(this.idCardapio).child(this.keyProduto).update({valor});
        
        this.initCardapio(this.idCardapio);

    }
    removerValor(value){
        firebase.database().ref(this.idCardapio).child(this.keyProduto).once("value",e=>{
            let data = e.val();
            
            let result = data.valor - value;
            let valor = result.toFixed(2);
            
            firebase.database().ref(this.idCardapio).child(this.keyProduto).update({valor});

            this.valorAdc = '';
            this.initCardapio(this.idCardapio);
        });
    }
    addArrayAdicionais(value){
        
        let adicionais = value;
        this.adicionais.push(adicionais);
        let adc = this.adicionais;
      
        // Atualizar o valor do array adc no nó existente 
        firebase.database().ref(this.idCardapio).child(this.keyProduto).child('adc').set(adc);
        this.initCardapio(this.idCardapio);
    }
removeArrayAdicionais(value) {
let arrayAntigo = [];
firebase.database().ref(this.idCardapio).child(this.keyProduto).once('value').then(snapshot => {
    snapshot.forEach(e => {
        let key = e.key;
        e.forEach(a => {
            let b = a.val();
            
            arrayAntigo.push(b);

            let index = arrayAntigo.indexOf(value);
            if (index !== -1) {
                let adc = arrayAntigo.slice(0, index).concat(arrayAntigo.slice(index + 1));

                firebase.database().ref(this.idCardapio).child(this.keyProduto).child(key).set( adc)
                this.initCardapio(this.idCardapio);
                this.adicionais = [];
            } else {
                console.log('item nao encontrado');
            }
        });
    });
}).catch(error => {
    console.error('Erro ao acessar o banco de dados:', error);
});
}
    
initEvents(){
        this.el.pararPedido.on("click",e=>{
            firebase.database().ref("carrinhoBalcao").remove();
            this.atualizarPagina();
        })

        this.el.enviar.on("click", e => {
            event.preventDefault();
            let cliente = this.el.nomeCliente.value;
            
           let numero = document.querySelector("#telefone-cliente").value;
           if(numero == ""){
            document.querySelector("#telefone-cliente").value = "(62) 99141-4889"
           }
            if(cliente == ""){
                alert("Digite o nome do Cliente");
                return false;
            }else{
                event.preventDefault();
                document.querySelector("#cliente-nome").innerText = cliente;
                firebase.database().ref('clienteAtivo').set({
                    cliente
                });
                this.salvarCliente();
                this.el.criarClientes.hide();
                this.el.cardapio.show();
                this.el.pedidos.hide();
            }
        });

        this.el.finalizar.on('click',e=>{
            
                this.finalizarPedido();
                location.reload();
              
        });  

        this.el.telefoneCliente.addEventListener("keyup", () => {
            this.formatarNumero();
            this.verificarCliente();
        });

        this.el.abrirPainel.on('click',e=>{
            this.el.criarClientes.show();
            this.el.pedidos.hide();
        });

        this.el.fecharPainel.on('click',e=>{
            this.el.criarClientes.hide();
            this.el.pedidos.show();
        });

        this.el.pastel.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioPasteis");
            this.idCardapio = "cardapioPasteis";
        });

        this.el.panqueca.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioPanquecas");
            this.idCardapio = "cardapioPanquecas";
        });

        this.el.tapioca.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioTapiocas");
            this.idCardapio = "cardapioTapiocas";
        });

        this.el.batata.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioBatatas");
            this.idCardapio = "cardapioBatatas";
        });

        this.el.bebida.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioBebidas");
            this.idCardapio = "cardapioBebidas";
        });

        this.el.balcao.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioProdutosBalcao");
            this.idCardapio = "cardapioProdutosBalcao";
        });

        this.el.enviarCozinha.on('click',e=>{
            if(this.EditarPedido == true){
                this.editarPedidoCozinha(this.pedido);
                //this.el.cardapio.hide();
                //this.el.pedidos.show();
                //this.listarPedidos();
            }else{
                this.enviarPedidoCozinha();
                //this.el.cardapio.hide();
                //this.el.pedidos.show();
                //this.listarPedidos();
            }
        });

        this.el.fecharAdc.on('click',e=>{
            this.el.adicionar.hide();
            this.el.fecharAdc.hide();
            this.adicionais=[];
        })
    }
    salvarCliente(){
        let cliente = this.el.nomeCliente.value;
       
        let telefone = this.el.telefoneCliente.value;
        let visitas = parseInt(this.el.visitaCliente.value);
        let pessoas = this.el.qtdCliente.value;
        
        // Verificar se o número de telefone já está salvo
        firebase.database().ref("clientes").orderByChild("telefone").equalTo(telefone).once("value", snapshot => {
            if (snapshot.exists()) {
            // O número de telefone já está salvo, incrementar o número de visitas em 1
            snapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let clienteData = childSnapshot.val();
                let totalVisitas = clienteData.visitas + 1;
        
                // Atualizar o número de visitas do cliente
                firebase.database().ref("clientes").child(key).update({ visitas: totalVisitas });
            });
            } else {
            // O número de telefone não está salvo, salvar os dados do cliente normalmente
            firebase.database().ref("clientes").push({
                cliente,
                telefone,
                visitas,
                pessoas
            });
            }
        this.el.nomeCliente.value = "";
        this.el.telefoneCliente.value = "";
        this.el.visitaCliente.value = "";
        this.el.qtdCliente.value = "";
        });
    }
    verificarCliente(){
        let telefone = this.el.telefoneCliente.value;
  
        // Verificar se o número de telefone já está salvo
        firebase.database().ref("clientes").orderByChild("telefone").equalTo(telefone).once("value", snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
              let clienteData = childSnapshot.val();
      
              // Preencher campos repetíveis com os dados do cliente
              this.el.nomeCliente.value = clienteData.cliente;
              this.el.visitaCliente.value = clienteData.visitas;
            });
          } else {
            // Nenhum cliente com o número de telefone encontrado, limpar os campos repetíveis
            this.el.nomeCliente.value = "";
            this.el.visitaCliente.value = "0";
          }
        });
    }

    formatarNumero(){
// Adicione o evento de digitação ao campo de telefone
this.el.telefoneCliente.addEventListener("input", () => {
    let telefone = this.el.telefoneCliente.value;
  
    // Remover caracteres não numéricos do número de telefone
    telefone = telefone.replace(/\D/g, "");
  
    // Formatar o número de telefone conforme desejado
    let telefoneFormatado = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
  
    // Definir o valor formatado no campo de telefone
    this.el.telefoneCliente.value = telefoneFormatado;
  });
  
    }

enviarPedidoCozinha() {
    var caixa;
    let itens = [];
    var numPedido;
    let cliente;
    
    firebase.database().ref("Caixas").on("value", element => {
        element.forEach(e => {
        let key = e.key;
        let item = e.val();
        let status = item.status;
        let id = item.id;
    
        if (status === "aberto") {
            caixa = id;
    
            firebase.database().ref("carrinhoBalcao").once("value", element => {
            element.forEach(e => {
                let key = e.key;
                let data = e.val();
    
                let produto = data.produto;
                let sabor = data.sabor;
                let quantidade = data.quantidade;
                let valor = data.valor;
                let obs = data.obs;
                let adc = data.adc;
    
                itens.push({ produto, sabor, quantidade, valor,obs,adc });
            });
    
            // Obtém o último pedido do banco de dados
            firebase.database().ref("pedidos").orderByKey().limitToLast(1).once("value", snapshot => {
                let pedido = 1; // Valor padrão se não houver pedidos anteriores
    
                snapshot.forEach(childSnapshot => {
                pedido = parseInt(childSnapshot.key) + 1;
                });
    
                numPedido = pedido;
                this.pedido = pedido;
    
                let valorTotalPedido = itens.reduce((total, objeto) => total + parseFloat(objeto.valor), 0);
    
                firebase.database().ref('clienteAtivo').once('value', e => {
                var dados = e.val();
                cliente = dados.cliente;
                let status = "Em produção!";
                let pago = 'Não!';
    
                firebase.database().ref("pedidos").child(pedido).push({
                    itens,
                    valorTotalPedido,
                    cliente,
                    caixa,
                    status,
                    pago,
                });
    
                firebase.database().ref("carrinhoBalcao").remove();
                this.EditarPedido = true;
                this.criarComanda(numPedido);
                this.listarPedidos();
                
                });
            });
            });
        } else {
            return false;
        }
        });
    });
}
editarPedidoCozinha(pedido) {
// verificar se o caixa esta aberto.
firebase.database().ref("Caixas").once("value", element => {
    element.forEach(e => {
    let item = e.val();
    let status = item.status;
    let id = item.id;
    let objetos = [];
    let valor = [];
    let qtd = []
    
    if (status === "aberto") {
            firebase.database().ref('carrinhoBalcao').once("value",e=>{
            e.forEach(b=>{
            let arrayItens = b.val();
            
            qtd.push(arrayItens.quantidade);

            valor.push(arrayItens.valor);
            objetos.push(arrayItens);

            firebase.database().ref('pedidos').child(pedido).once("value",snapshot=>{
            snapshot.forEach(e=>{

            this.keyAttPedido = e.key;
           
            let somaAtt = this.valorAttPedido.join('+');
            let a = eval(somaAtt);

           

            let soma = valor.join('+');
            let b = eval(soma);

            let valorTotalPedido = a+b;
            
            firebase.database().ref('pedidos').child(pedido).child(this.keyAttPedido).update({valorTotalPedido});
                        });
                    });
                });
                this.itens = this.itens.concat(objetos);
                
                let itens =   this.itens;

                firebase.database().ref('pedidos').child(pedido).child(this.keyAttPedido).update({itens});
            });
        }
    });
    this.EditarPedido = false;
    this.criarComanda(pedido);
    this.carrinho.remove();
});
}
criarComanda(pedido){
this.pedido = pedido;
var soma;
var objetos;
var valorTotal;
var quantidadeTotal = [];
var tr;
var table = document.querySelector("#comanda");

    firebase.database().ref("pedidos").child(pedido).on("value",element=>{
    
    table.innerHTML="";

        element.forEach(e =>{
        let data = e.val();
        objetos = data.itens;
        this.itens = objetos;
        valorTotal = data.valorTotalPedido;
        let index = objetos.length - 1;
        
        document.querySelector("#cliente-nome").innerText = data.cliente;

        for (let a = 0; a <= index; a++) {
            
            quantidadeTotal.push(objetos[a].quantidade);
            soma = quantidadeTotal.join('+');
            let result = eval(soma);


            let adcValue = data.adc !== undefined ? data.adc : '0';
            let obsValue = data.obs !== undefined ? data.obs : 'Obs';
            
            tr = document.createElement("tr");
            this.valorAttPedido.push(objetos[a].valor);
            tr.innerHTML = `
            <td class="td">
            ${objetos[a].produto}
            </td>
            <td class="td">
                ${objetos[a].sabor}
            </td>
            <td class="td">
                ${objetos[a].quantidade}
            </td>
            <td class="td">
                ${objetos[a].valor}
            </td>
            <td class="td">
            ${adcValue}
            </td>
            <td class="td">
            <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${obsValue}</textarea>
            </td>
            <td class="td">
                <img src="/icones/iconExcluir.png" width="40px" id="excluir">
            </td>
            
            `;
            table.appendChild(tr);

            document.querySelector("#quantidadeTotal").innerText = result;
            document.querySelector("#valorTotal").innerText = valorTotal.toFixed(2);
        }
    });
    });
}
finalizarPedido() {
    let key = this.pedido;
    let statusAtual;
  
    firebase.database().ref('pedidos').child(key).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        // Obtenha o status atual do pedido
        statusAtual = childSnapshot.val().status;
  
        // Atualize o status apenas se não for "Finalizado"
        if (statusAtual !== "Finalizado") {
          // Atualize o status para "Finalizado"
          childSnapshot.ref.update({ 
            status: "Finalizado",
            pago:"Sim!",
            FormaPagamento : document.querySelector("#forma-pagamento").value
         })
            .then(() => {
              console.log('Status do pedido atualizado para "Finalizado".');
            })
            .catch(error => {
              console.error('Erro ao atualizar o status do pedido:', error);
            });
        } else {
          console.log('O status do pedido já está "Finalizado".');
        }
      });
    });
  }

listarPedidos() {
    firebase.database().ref('Caixas').once("value",element=>{
        //table.innerText ='';
        element.forEach(e => {
            let key = e.key;
            let data = e.val();
            

            if(data.status == "aberto"){
                var chave;
                firebase.database().ref("pedidos").once("value", element => {
                    
                let table = document.querySelector("#pedido");
                table.innerHTML = '';
                element.forEach(e => {
                    
                    chave = e.key;
                    let dat = e.val();
                    
                    
                  e.forEach(item => {
                    let iten = item.val();
                    let key = item.key;
                    if(iten.caixa == data.id){
                    
                        let pedido = chave;
                    let cliente = iten.cliente;
                    let status = iten.status;
                    let valor = iten.
                    valorTotalPedido;
                    let pago = iten.pago;
            
                    let tr = document.createElement('tr');
            
                    if(pago == "Não!"){
                        tr.innerHTML = ` 
                            <td class="pedido">${pedido}</td>
                            <td>${cliente}</td>
                            <td>${status}</td>
                            <td>${valor}</td>
                            <td>${pago}</td>
                            <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
                            <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                        `;
                        table.appendChild(tr);
                        tr.querySelector(".com").addEventListener("click", e=>{
                            let a = tr.querySelector(".pedido").innerText;
                            this.criarComanda(a);
                            this.el.cardapio.show();
                            this.el.pedidos.hide();
                            this.pedido = a;
                        });
        tr.querySelector(".Edit").addEventListener("click", e=>{
            let a = tr.querySelector(".pedido").innerText;
            this.el.cardapio.show();
            this.el.pedidos.hide();
            this.pedido = a; 
            this.EditarPedido = true;
            firebase.database().ref('clienteAtivo').set({
                cliente
            });
            this.criarComanda(a);
                        });
                        
                    }else{
                        tr.innerHTML = ` 
                        <td>${pedido}</td>
                        <td>${cliente}</td>
                        <td>${status}</td>
                        <td>${valor.toFixed(2)}</td>
                        <td>${pago}</td>
                        <td class="com"><img src="/icones/iconEdit.png" width="40px"></td>
                        <td class="v"><img src="/icones/iconV.png" width="40px"></td>
                        
                    `;
                    table.appendChild(tr);
                    }
                    }
                  });
                });
              });
            }
        });
    });

}      
initCardapio(id){
    let table = document.querySelector(".montar");

    firebase.database().ref(id).once('value').then((snapshot)=>{
        table.innerText = '';
        snapshot.forEach(e=>{

            let key = e.key;
            let data = e.val();
            let adicionaisString = []; 
            e.forEach(a=>{
                a.forEach(f=>{
                    adicionaisString.push(f.val());
                })
            });
            let adcValue = data.adc !== undefined ? data.adc : '0';
            let valorExibido = data.adc !== undefined ? data.valor : data.valorInicial;

            let tr = document.createElement('tr');

    tr.innerHTML = ` 
    <td class="sabor">
        ${data.sabor}
    </td>
    <td class="card-qtd-">
        <button class="btnSubtract ">-</button>
    </td>
    <td class="card-qtd">
        <input type="text" name="" id="" class="quantidade" value="1">
    </td>
    <td class="card-qtdm">
        <button class="btnAdd">+</button>
    </td>
    <td class="card-valor">
    ${valorExibido}
    </td>
    <td class="card-btn-car">
        <img src="/icones/iconCarrinho.png" width="40px" class="btnCarrinho">
    </td>
    <td class="card-btn-adc">
        <img src="/icones/iconAdc.png" alt="" width="40px" class="btnAdicionais">
    </td>
    <td class="card-obs">
        <textarea id="myTextarea" rows="4" cols="6" placeholder="OBS:" class="obs"></textarea>
    </td>
    <td class="card-adc">
        adc ${adcValue || '' }
    </td>
    `;
    table.appendChild(tr);
    tr.querySelector(".btnAdicionais").addEventListener("click", e=>{
        this.el.adicionar.show();
        this.el.fecharAdc.show();
        
        this.keyProduto = key;
        this.value = tr.querySelector(".card-valor").innerText;
        this.addValue = [];
        this.adicionais=[];

    });

        //aqui envia o produto para o carrinho
    tr.querySelector(".btnCarrinho").addEventListener("click", e=>{
        this.keyProduto = key;
        let quantidade = tr.querySelector(".quantidade").value;
        let produto = data.produto;
        let sabor = data.sabor;
        let valor = quantidade * data.valor;
        let valorFim = valor.toFixed(2);
        let obs = tr.querySelector("#myTextarea").value;
        let adc = tr.querySelector(".card-adc").innerText;

        this.carrinho.push({
            produto,sabor,quantidade,valor,obs,adc
        });

        this.listCart();

        firebase.database().ref(this.idCardapio).child(this.keyProduto).update({ adc: null});
        this.adicionais=[];
        this.initCardapio(this.idCardapio);
        
    });

        //aqui adiciona +1 a quantidade de pasteis
    tr.querySelector(".btnAdd").addEventListener("click", e=>{
        let n1 = parseInt(tr.querySelector(".quantidade").value);
        let result = n1 + 1;
        tr.querySelector(".quantidade").value = result;
    });

        //aqui subtrai 1 a quantidade de pasteis
    tr.querySelector(".btnSubtract").addEventListener("click", e=>{
        let n1 = parseInt(tr.querySelector(".quantidade").value);
        if(n1==0){
            return false
        }else{
            let result = n1 - 1;
            tr.querySelector(".quantidade").value = result;
        }
        
    });
        });
    })
    .catch((error) => {
        console.error(error);
    });
}
    
    listCart(){
        let quantidade = [];
        let table = document.querySelector("#Carrinho");
        this.valortotal = [];
        this.carrinho.on("value",element=>{
            table.innerText ='';
            element.forEach(e=>{

                let data = e.val();
                let key = e.key;
                let tr = document.createElement("tr");

                quantidade.push(data.quantidade);
                let somaqtd = quantidade.join('+');
                let quantidadefinal = eval(somaqtd);
                document.querySelector("#quantidadeTotal").innerText = quantidadefinal;
                
                this.valortotal.push(data.valor);
                let valorSomado= this.valortotal.join('+');
                let valorFinal = eval(valorSomado);
                document.querySelector("#valorTotal").innerText = valorFinal.toFixed(2);
                
                // Verifica se data.adc existe, caso contrário, define como "0"
              
                tr.innerHTML = `
                <td class="td ">
                    ${data.produto}
                </td>
                <td class="td">
                    ${data.sabor}
                </td>
                <td class="td">
                    ${data.quantidade}
                </td>
                <td class="td">
                    ${data.valor}
                </td>
                <td class="td">
                ${data.adc}
                </td>
                <td class="td">
                <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${data.obs}</textarea>
                </td>
                <td class="td">
                    <img src="/icones/iconExcluir.png" width="40px" id="excluir">
                </td>
                `;
                tr.querySelector("#excluir").addEventListener("click",e=>{
                    firebase.database().ref("carrinhoBalcao").child(key).remove();
                    this.listCart();
                });
                table.appendChild(tr);
            });
        });
    }

    atualizarPagina(){
        location.reload();
    }
}



// linha 472 Cria a comanda;
// linha 612 Cria o cardapio;
// linha 710 Cria o Carrinho;
// linha 717 lista o carrinho na tela;
// linha
// linha