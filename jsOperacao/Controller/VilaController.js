class VilaControllerBalcao{
    constructor(){
        this.cardapio = firebase.database().ref("cardapio");

        this.carrinho = firebase.database().ref("carrinhoBalcao");

        this.valortotal = [];
        this.clienteAtivo;
        this.pedido;

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        this.listarPedidos();
        this.listCart();
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

initEvents(){
    
        this.el.enviar.on("click", e => {
            let cliente = this.el.nomeCliente.value;
            document.querySelector("#cliente-nome").innerText = cliente;
            firebase.database().ref('clienteAtivo').set({
                cliente
            });
            this.salvarCliente();
            this.el.criarClientes.hide();
            this.el.cardapio.show();
            this.el.pedidos.hide();
        });

        this.el.finalizar.on('click',e=>{
            this.el.pedidos.show();
            this.el.cardapio.hide();
            this.finalizarPedido();
        });

        this.el.telefoneCliente.addEventListener("keyup", () => {
            this.formatarNumero();
            this.verificarCliente();
        });
        this.el.telefoneCliente.addEventListener("input", () => {
            this.verificarCliente();
        });

        this.el.abrirPainel.on('click',e=>{
            this.el.criarClientes.show();
        });

        this.el.fecharPainel.on('click',e=>{
            this.el.criarClientes.hide();
        });

        this.el.pastel.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioPasteis");
        });

        this.el.panqueca.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioPanquecas");
        });

        this.el.tapioca.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioTapiocas");
        });

        this.el.batata.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioBatatas");
        });

        this.el.bebida.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioBebidas");
        });

        this.el.balcao.on('click',e=>{
            this.el.montar.show();
            this.initCardapio("cardapioProdutosBalcao");
        });

        this.el.enviarCozinha.on('click',e=>{
            this.enviarPedidoCozinha();
        });
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
            this.el.visitaCliente.value = "";
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
        let data = e.val();
        let status = data.status;
        let id = data.id;
    
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
    
                itens.push({ produto, sabor, quantidade, valor });
            });
    
            // Obtém o último pedido do banco de dados
            firebase.database().ref("pedidos").orderByKey().limitToLast(1).once("value", snapshot => {
                let pedido = 1; // Valor padrão se não houver pedidos anteriores
    
                snapshot.forEach(childSnapshot => {
                pedido = parseInt(childSnapshot.key) + 1;
                });
    
                numPedido = pedido;
    
                let valorTotalPedido = itens.reduce((total, objeto) => total + parseFloat(objeto.valor), 0);
    
                firebase.database().ref('clienteAtivo').on('value', e => {
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
    
                this.criarComanda(numPedido);
    
                // Remover o nó 'clienteAtivo'
                firebase.database().ref("clienteAtivo").remove();
                });
            });
            });
        } else {
            return false;
        }
        });
    });
    }
criarComanda(pedido){
this.el.enviarCozinha.hide();
var soma;
var objetos;
var valorTotal;
var quantidadeTotal = [];
var tr;
var table = document.querySelector("#Carrinho");

    firebase.database().ref("pedidos").child(pedido).on("value",element=>{
    
    table.innerHTML="";

        element.forEach(e =>{
        let key = e.key;
        let data = e.val();
        
        objetos = data.itens;
        valorTotal = data.valorTotalPedido;
        let index = objetos.length - 1;
        
        document.querySelector("#cliente-nome").innerText = data.cliente;

        for (let a = 0; a <= index; a++) {
            
            quantidadeTotal.push(objetos[a].quantidade);
            soma = quantidadeTotal.join('+');
            let result = eval(soma);
            
            tr = document.createElement("tr");

            tr.innerHTML = `
            <td>
            ${objetos[a].produto}
            </td>
            <td>
                ${objetos[a].sabor}
            </td>
            <td>
                ${objetos[a].quantidade}
            </td>
            <td>
                ${objetos[a].valor}
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
          childSnapshot.ref.update({ status: "Finalizado",
        pago:"Sim!" })
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
    var chave;
    firebase.database().ref("pedidos").on("value", element => {
        
    let table = document.querySelector("#pedido");
    table.innerHTML = '';
    element.forEach(e => {
        chave = e.key;
      e.forEach(item => {
        let iten = item.val();
        let key = item.key;

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
                <td>${valor.toFixed(2)}</td>
                <td>${pago}</td>
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
        }else{
            tr.innerHTML = ` 
            <td>${pedido}</td>
            <td>${cliente}</td>
            <td>${status}</td>
            <td>${valor.toFixed(2)}</td>
            <td>${pago}</td>
            <td class="v"><img src="/icones/iconV.png" width="40px"></td>
        `;
        table.appendChild(tr);
        }
      });
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

                let tr = document.createElement('tr');

        tr.innerHTML = ` 
        <td class="sabor">
            ${data.sabor}
        </td>
        <td class="qtd">
            <button class="btnSubtract ">-</button>
        </td>
        <td class="qtd">
            <input type="text" name="" id="" class="quantidade" value="0">
        </td>
        <td class="qtd">
            <button class="btnAdd">+</button>
        </td>
        <td>
        ${data.valor}
        </td>
        <td>
            <img src="/icones/iconCarrinho.png" width="40px" class="btnCarrinho">
        </td>
        <td>
            <img src="/icones/iconAdc.png" alt="" width="40px">
        </td>
        <td>
            <textarea id="myTextarea" rows="4" cols="8" placeholder="OBS:"></textarea>
        </td>
        `;
        table.appendChild(tr);
            //aqui envia o produto para o carrinho
        tr.querySelector(".btnCarrinho").addEventListener("click", e=>{
            console.log(data.sabor);
            let quantidade = tr.querySelector(".quantidade").value;
            let produto = data.produto;
            let sabor = data.sabor;
            let valor = quantidade * data.valor;
            let valorFim = valor.toFixed(2);

            this.createCart(produto,sabor,quantidade,valorFim);
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

    createCart(produto,sabor,quantidade,valor){
        this.carrinho.push({
            produto,sabor,quantidade,valor
        });
        this.listCart();
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
                
                tr.innerHTML = `
                <td class="td">
                    ${data.produto}
                </td>
                <td>
                    ${data.sabor}
                </td>
                <td>
                    ${data.quantidade}
                </td>
                <td>
                    ${data.valor}
                </td>
                <td>
                    <img src="/icones/iconEdit.png" width="40px" class="editar">
                </td>
                <td>
                    <img src="/icones/iconExcluir.png" width="40px" id="excluir">
                </td>
                <td>
            <textarea id="myTextarea" rows="4" cols="8" disabled placeholder="OBS:"></textarea>
        </td>
                `;
                tr.querySelector("#excluir").addEventListener("click",e=>{
                    firebase.database().ref("carrinhoBalcao").child(key).remove();
                    this.listCart();
                });
                tr.querySelector(".editar").addEventListener("click", (e) => {
                    tr.querySelector(".td").style.backgroundColor = "red";
                    console.log("ok");
                  });
                table.appendChild(tr);

            });
        });
    }
}
