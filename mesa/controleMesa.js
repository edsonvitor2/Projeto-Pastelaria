class ControleMesa{
    constructor(){
      this.bd = firebase.database();
      this.carrinho;
      this.cliente;
      this.pedido;
  
      this.editar;
      this.produto;
      this.cardapio;
      this.carrinhoMesas;
  
      this.elementsPrototype();
      this.loadElements();
      this.initEvents();
      this.initAdicionais();
      //this.listarPedidos();
      
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
    this.el.mesaA.on("click",e =>{
      this.carrinhoMesas = 'mesa1';
      this.el.criarClientes.show();
      this.el.mesas.hide();
    });
    this.el.fecharPainel.on("click",e =>{
      this.el.criarClientes.hide();
      this.el.mesas.show();
    });
    this.el.mesaB.on("click",e =>{
      console.log(1);
    });
    this.el.mesaC.on("click",e =>{
      console.log(1);
    });
    this.el.mesaD.on("click",e =>{
      console.log(1);
    });
    this.el.mesaE.on("click",e =>{
      console.log(1);
    });
    this.el.mesaF.on("click",e =>{
        console.log(1);
    });
    this.el.mesaG.on("click",e =>{
        console.log(1);
    });
    this.el.mesaH.on("click",e =>{
        console.log(1);
    });
    this.el.mesaI.on("click",e =>{
        console.log(1);
    });
    this.el.mesaJ.on("click",e =>{
        console.log(1);
    });
    this.el.mesaK.on("click",e =>{
        console.log(1);
    });
    this.el.mesaL.on("click",e =>{
        console.log(1);
    });
    this.el.mesaM.on("click",e =>{
        console.log(1);
    });
    this.el.mesaN.on("click",e =>{
        console.log(1);
    });
    this.el.mesaO.on("click",e =>{
        console.log(1);
    });
    
    this.el.telefoneCliente.on("keyup",e=>{
      this.formatarNumero();
      this.verificarCliente();
    })
  
    this.el.enviar.on('click',e=>{
      if((this.el.nomeCliente.value == "") 
      || 
      (this.el.qtdCliente.value == "") 
      || 
      (this.el.visitaCliente.value == "")
      || 
      (this.el.telefoneCliente.value == "")
      ){
        alert('Preencha todos os Campos!!!');
      }else{
      event.preventDefault();
      this.salvarCliente();
      this.el.cardapio.show();
      this.el.criarClientes.hide();
      }
    });
  
    this.el.enviarCozinha.on('click',e=>{
      if(this.editar == true){
        this.pedido.juntarPedido();
        setTimeout(() => {
          this.carrinho.listarCarrinho();
        }, 500);
      }else{
        this.cliente.criarComanda();
        this.editar == true;
        setTimeout(() => {
          this.carrinho.listarCarrinho();
        }, 500);
      }
    });
  
    this.el.atualizar.on("click",e =>{
      this.editarCliente();
    });
  
    this.el.pastel.on('click',e=>{
      this.abrirCardapio('cardapioPasteis');
      this.cardapio = 'cardapioPasteis';
    });
  
    this.el.panqueca.on('click',e=>{
      this.abrirCardapio('cardapioPanquecas');
      this.cardapio = 'cardapioPanquecas';
    });
  
    this.el.tapioca.on('click',e=>{
      this.abrirCardapio('cardapioTapiocas');
      this.cardapio = 'cardapioTapiocas';
    });
  
    this.el.batata.on('click',e=>{
      this.abrirCardapio('cardapioBatatas');
      this.cardapio = 'cardapioBatatas';
    });
  
    this.el.bebida.on('click',e=>{
      this.abrirCardapio('cardapioBebidas');
      this.cardapio = 'cardapioBebidas';
    });
  
    this.el.balcao.on('click',e=>{
      this.abrirCardapio('cardapioProdutosBalcao');
      this.cardapio = 'cardapioProdutosBalcao';
    });
  
    this.el.fecharAdc.on('click',e=>{
      this.el.adicionar.hide();
      this.el.fecharAdc.hide();
    });
  
  /*this.el.finalizar.on('click',e=>{
    if(this.editar == true){
      this.pedido.finalizarEdicao();
      setTimeout(() => {
        location.reload();
        }, 500);
    }else{
      let cliente = this.cliente._chaveCliente;
    let produtos = this.cliente._produtos;
  
    firebase.database().ref("Caixas").once("value",snapshot=>{
      snapshot.forEach(item =>{
        let caixa = item.val();
        let id = caixa.id;
        console.log(id);
        if(caixa.status == 'aberto'){
          console.log(cliente,produtos,id);
          this.pedido = new PedidoBalcao(cliente,produtos, id);
          this.pedido.criarPedido();
  
          setTimeout(() => {
          location.reload();
          }, 500);
        }
      });
    });
    }
  });
  
  this.el.formaPagamento.addEventListener('change', () => {
    const selectedOption = this.el.formaPagamento.value;
    console.log(selectedOption)
  
    if (selectedOption == 'separado') {
      this.el.formPagamento.show();
    }else{
      this.el.formPagamento.hide();
    }
    if (selectedOption == 'dinheiro') {
      this.el.asd.show();
    }else{
      this.el.asd.hide();
    }
  });
  
  this.el.finalizarPedido.on('click',e=>{
    this.pedido.finalizarPedido();
    setTimeout(() => {
      location.reload();
      }, 500); 
  }); */
  }
 
  initAdicionais(){
    this.el.adcFrango.on('click',e=>{
        this.addArrayAdicionais("  frango");
        this.adicionarValor(4);
    });
    this.el.removeFrango.on('click',e=>{
        this.removeArrayAdicionais('  frango',4);
    });
  
    this.el.adcCarne.on('click',e=>{
        this.addArrayAdicionais(" Carne");
        this.adicionarValor(5);
    });
    this.el.removeCarne.on('click',e=>{
        this.removeArrayAdicionais(' Carne',5);
    });
  
    this.el.adcMilho.on('click',e=>{
        this.addArrayAdicionais(" Milho");
        this.adicionarValor(2);
    });
    this.el.removeMilho.on('click',e=>{
        this.removeArrayAdicionais(' Milho',2);
    });
  
    this.el.adcCheddar.on('click',e=>{
        this.addArrayAdicionais(" Cheddar");
        this.adicionarValor(2);
    });
    this.el.removeCheddar.on('click',e=>{
        this.removeArrayAdicionais(' Cheddar',2);
    });
  
    this.el.adcMussarela.on('click',e=>{
        this.addArrayAdicionais(" Mussarela");
        this.adicionarValor(3);
    });
    this.el.removeMussarela.on('click',e=>{
        this.removeArrayAdicionais(' Mussarela');
    });
  
    this.el.adcPequi.on('click',e=>{
        this.addArrayAdicionais(" Pequi");
        this.adicionarValor(3);
    });
    this.el.removePequi.on('click',e=>{
        this.removeArrayAdicionais(' Pequi');
    });
  
    this.el.adcCatupiry.on('click',e=>{
        this.addArrayAdicionais(" Catupiry");
        this.adicionarValor(3);
    });
    this.el.removeCatupiry.on('click',e=>{
        this.removeArrayAdicionais(' Catupiry');
    });
  
    this.el.adcTomate.on('click',e=>{
        this.addArrayAdicionais(" Tomate");
        this.adicionarValor(2);
    });
    this.el.removeTomate.on('click',e=>{
        this.removeArrayAdicionais(' Tomate');
    });
  
    this.el.adcQueriroba.on('click',e=>{
        this.addArrayAdicionais(" Queriroba");
        this.adicionarValor(3);
    });
    this.el.removeQueriroba.on('click',e=>{
        this.removeArrayAdicionais(' Queriroba');
    });
  
    this.el.adcPresunto.on('click',e=>{
        this.addArrayAdicionais(" Presunto");
        this.adicionarValor(3);
    });
    this.el.removePresunto.on('click',e=>{
        this.removeArrayAdicionais(' Presunto');
    });
  
    this.el.adcAzeitona.on('click',e=>{
        this.addArrayAdicionais(" Azeitona");
        this.adicionarValor(2);
    });
    this.el.removeAzeitona.on('click',e=>{
        this.removeArrayAdicionais(' Azeitona');
    });
  
    this.el.adcCalabresa.on('click',e=>{
        this.addArrayAdicionais(" Calabresa");
        this.adicionarValor(3);
    });
    this.el.removeCalabresa.on('click',e=>{
        this.removeArrayAdicionais(' Calabresa');
    });
  
    this.el.adcPalmito.on('click',e=>{
        this.addArrayAdicionais(" Palmito");
        this.adicionarValor(3);
    });
    this.el.removePalmito.on('click',e=>{
        this.removeArrayAdicionais(' Palmito');
    });
  }
  
  formatarNumero(){
    this.el.telefoneCliente.addEventListener("input", () => {
      let telefone = this.el.telefoneCliente.value;
    
      telefone = telefone.replace(/\D/g, "");
    
      let telefoneFormatado = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    
      this.el.telefoneCliente.value = telefoneFormatado;
    });
  }
  
  verificarCliente(){
    let telefone = this.el.telefoneCliente.value;
      console.log(telefone);
      // Verificar se o número de telefone já está salvo
      firebase.database().ref("clientes").orderByChild("telefone").equalTo(telefone).once("value", snapshot => {
        if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
        let clienteData = childSnapshot.val();
        this.keyClienteAtt = childSnapshot.key;
    
        console.log(this.keyClienteAtt);
        this.el.nomeCliente.value = clienteData.nome;
        this.el.telefoneCliente.value = clienteData.telefone;
        this.el.qtdCliente.value = clienteData.quantidade;
        this.el.visitaCliente.value = clienteData.visitas;
    
        });
        } else {
          this.el.nomeCliente.value = "";
        }
      });
    }
  
    salvarCliente(){
      let nome = this.el.nomeCliente.value;
      let telefone = this.el.telefoneCliente.value;
      let qunatidade = this.el.qtdCliente.value;
      let visitas = this.el.visitaCliente.value;
  
      this.cliente = new ClienteMesa(nome,telefone,qunatidade,visitas);
  
      this.cliente.salvarCliente();
    }
  
    editarCliente(){
      let nome = this.el.nomeCliente.value;
      let telefone = this.el.telefoneCliente.value;
      let qunatidade = this.el.qtdCliente.value;
      let visitas = this.el.visitaCliente.value;
  
      this.cliente = new ClienteBalcao(nome,telefone,qunatidade,visitas);
      
      this.cliente.editarCliente();
    }
  
  abrirCardapio(cardapio){
  this.el.montar.show();
  
  let table = document.querySelector(".montar");
  
  this.bd.ref(cardapio).once('value').then((snapshot)=>{
  table.innerText = '';
  snapshot.forEach(snapshotItem=>{
  
    let key = snapshotItem.key;
    let data = snapshotItem.val();
    
    let adicionaisString = []; 
  
    snapshotItem.forEach(element=>{
      element.forEach(item=>{
        adicionaisString.push(item.val());
      })
    });
  
    let adcValue = data.adicionais !== undefined ? data.adicionais : '0';
    let valorExibido = data.adicionais !== undefined ? data.valor : data.valorInicial;
    
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
  
      this.produto = key;
      this.produtoValor = data.valor;
  
      this.adicionais = [];
  
      console.log(this.produto);
    });
  
    tr.querySelector(".btnCarrinho").addEventListener("click", e=>{
      this.produto = key;
      this.criarCarrinho(tr,data);
      let adicionais = null;
  
      this.bd.ref(this.cardapio).child(this.produto).once("value",e=>{
        let dados = e.val();
        let valor = dados.valorInicial;
  
        this.bd.ref(this.cardapio).child(this.produto).update({
          adicionais,
          valor
        });
      });
      this.abrirCardapio(this.cardapio);
    });
  
        //aqui adiciona +1 a quantidade de pasteis
    tr.querySelector(".btnAdd").addEventListener("click", e=>{
      this.adicionaUnidade(tr);
    });
  
        //aqui subtrai 1 a quantidade de pasteis
    tr.querySelector(".btnSubtract").addEventListener("click", e=>{
      this.subtraiUnidade(tr);
    });
    
    });
    })
    .catch((error) => {
      console.error(error);
    });
  }
    
  adicionaUnidade(tr){
    let n1 = parseInt(tr.querySelector(".quantidade").value);
    let result = n1 + 1;
    tr.querySelector(".quantidade").value = result;
  }
  subtraiUnidade(tr){
    let n1 = parseInt(tr.querySelector(".quantidade").value);
    if(n1==0){
      return false
    }else{
      let result = n1 - 1;
      tr.querySelector(".quantidade").value = result;
    }
  }
  
  addArrayAdicionais(value){
    console.log('ok')
    firebase.database().ref(this.cardapio).child(this.produto).once('value',w=>{
      let dados = w.val();
  
      if(dados.adicionais !== undefined){
  
        let adicionais = dados.adicionais;
  
        adicionais.push(value);
  
        firebase.database().ref(this.cardapio).child(this.produto).update({
          adicionais
        })
        this.abrirCardapio(this.cardapio);
      }else{
        this.adicionais.push(value);
        let adicionais = this.adicionais;
  
        firebase.database().ref(this.cardapio).child(this.produto).update({
          adicionais
        })
        this.adicionais =[];
        this.abrirCardapio(this.cardapio);
        console.log(this.adicionais)
      }
    })
      
  }
  
  removeArrayAdicionais(adc,valoradc) {
    this.bd.ref(this.cardapio).child(this.produto).once('value',w=>{
      let dados = w.val();
  
      if(dados.adicionais !== undefined){
  
        let adicionais = dados.adicionais;
        const indexToRemove = adicionais.indexOf(adc);
  
        if (indexToRemove !== -1) {
  
          adicionais.splice(indexToRemove, 1);
  
          let sub = dados.valor - valoradc;
          let valor = sub.toFixed(2);
  
          this.bd.ref(this.cardapio).child(this.produto).update({
            adicionais,
            valor
          });
  
          this.abrirCardapio(this.cardapio);
        }
      }
    });
  }
  
  adicionarValor(value){
    let adc = parseFloat(value);
  
    this.bd.ref(this.cardapio).child(this.produto).once('value',e=>{
      let dados = e.val();
  
      let soma = parseFloat(dados.valor);
  
      let valor = adc + soma;
  
      this.bd.ref(this.cardapio).child(this.produto).update({
        valor
      });
    });
    this.abrirCardapio(this.cardapio);
  }
  
  criarCarrinho(tr,data){
    let quantidade = tr.querySelector(".quantidade").value;
    let produto = data.produto;
    let sabor = tr.querySelector(".sabor").innerText;
    let valorFim = quantidade * tr.querySelector(".card-valor").innerText;
    let valor = valorFim.toFixed(2);
    let obs = tr.querySelector("#myTextarea").value;
    let adc = tr.querySelector(".card-adc").innerText;
    
    this.carrinho = new CarrinhoMesa(produto,sabor,quantidade,valor,adc,obs,this.carrinhoMesas);
  }
  
  listarPedidos() {
    var numero = 0;
    
    firebase.database().ref('Caixas').once("value",element=>{
      //table.innerText ='';
      element.forEach(e => {
        let data = e.val();
  
        if(data.status == "aberto"){
          firebase.database().ref("pedidos").once("value", element => {
              
            let table = document.querySelector("#pedido");
            table.innerHTML = '';
            element.forEach(e => {
              
              let dat = e.val();
              let key = e.key;
              
              if(dat.caixa == data.id){
  
                numero += 1;
  
                if(dat.status == 'Produzindo!'){
                  let tr = document.createElement('tr');
  
                  let chave = key;
                  
  
                  tr.innerHTML = ` 
                  <td>${numero}</td>
                  <td>${dat.nome}</td>
                  <td>${dat.status}</td>
                  <td>${dat.valorPedido}</td>
                  <td>${dat.pago}</td>
                  <td>${dat.pagamento}</td>
    
                  <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
                  <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                  `;
  
                  table.appendChild(tr);
  
                  tr.querySelector('.Edit').addEventListener("click",e=>{
                    this.editar = true;
                    this.el.cardapio.show();
                    this.el.pedidos.hide();
  
                    if(dat.pagamento == 'separado'){
                      let cliente = {
                        nome: dat.nome,
                        telefone: dat.telefone,
                        endereco:dat.endereco,
                        complemento:dat.complemento,
                        taxa:dat.taxa,
                        caixa : dat.caixa,
                        status: dat.status,
                        valorPedido : dat.valorPedido,
                        pagamento : dat.pagamento,
                        pago : dat.pago,
                        debito : dat.debito,
                        credito : dat.credito,
                        dinheiro : dat.dinheiro,
                        pix : dat.pix,
                      }
                      let pedido = dat.pedido;
                    
                      this.pedido = new PedidoBalcao(cliente,pedido,0,chave);
                      this.pedido.editarPedido();
                    }else{
                      let cliente = {
                        nome: dat.nome,
                        telefone: dat.telefone,
                        endereco:dat.endereco,
                        complemento:dat.complemento,
                        taxa:dat.taxa,
                        caixa : dat.caixa,
                        status: dat.status,
                        valorPedido : dat.valorPedido,
                        pagamento : dat.pagamento,
                        pago : dat.pago,
                      }
                      let pedido = dat.pedido;
                    
                      this.pedido = new PedidoBalcao(cliente,pedido,0,chave);
                      this.pedido.editarPedido();
                    }
                  });
  
                  tr.querySelector('.com').addEventListener("click",e=>{
                    if(dat.pagamento == 'separado'){
  
                      this.el.pagamentoSeparado.show();
  
                      let cliente = {
                        nome: dat.nome,
                        telefone: dat.telefone,
                        endereco:dat.endereco,
                        complemento:dat.complemento,
                        taxa:dat.taxa,
                        caixa : dat.caixa,
                        status: dat.status,
                        valorPedido : dat.valorPedido,
                        pagamento : dat.pagamento,
                        pago : dat.pago,
                        debito: dat.debito,
                        credito: dat.credito,
                        dinheiro: dat.dinheiro,
                        pix: dat.pix,
                      }
                      let pedido = dat.pedido;
                      
                      this.pedido = new PedidoBalcao(cliente,pedido,0,chave);
                      this.pedido.mostrarPedido();
                    }else{
                      this.el.pagamentoSeparado.hide();
  
                      let cliente = {
                        nome: dat.nome,
                        telefone: dat.telefone,
                        endereco:dat.endereco,
                        complemento:dat.complemento,
                        taxa:dat.taxa,
                        caixa : dat.caixa,
                        status: dat.status,
                        valorPedido : dat.valorPedido,
                        pagamento : dat.pagamento,
                        pago : dat.pago,
                      }
                      let pedido = dat.pedido;
                      
                      this.pedido = new PedidoBalcao(cliente,pedido,0,chave);
                      this.pedido.mostrarPedido();
                    }
                    this.el.fecharComanda.show();
                    this.el.pedidos.hide();
                  });
  
                }else if(dat.status == 'Finalizado!'){
                  let tr = document.createElement('tr');
                  tr.innerHTML = ` 
                  <td>${numero}</td>
                  <td>${dat.nome}</td>
                  <td>${dat.status}</td>
                  <td>${dat.valorPedido}</td>
                  <td>${dat.pago}</td>
                  <td>${dat.pagamento}</td>
                  <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
                  <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                  `;
                  table.appendChild(tr);
                }
              }
            });
          });
        }
      });
    });
  }  
  
  }
  var balcao = new ControleMesa();