class Pedido {
    constructor(cliente,produto,caixa,chave) {
      this._cliente = cliente;
      this._pedido = produto;
      this._caixa = caixa;
      this._chave = chave;
      this._valor;

      this.pedidos
    }
  
    // Métodos getter e setter para Cliente
    get cliente() {
      return this._cliente;
    }
  
    set cliente(novoCliente) {
      this._cliente = novoCliente;
    }
  
    // Métodos getter e setter para Produto
    get produto() {
      return this._produto;
    }
  
    set produto(novoProduto) {
      this._produto = novoProduto;
    }
  
    // Métodos getter e setter para Sabor
    get sabor() {
      return this._sabor;
    }
  
    set sabor(novoSabor) {
      this._sabor = novoSabor;
    }
  
    // Métodos getter e setter para Quantidade
    get quantidade() {
      return this._quantidade;
    }
  
    set quantidade(novaQuantidade) {
      this._quantidade = novaQuantidade;
    }
  
    // Métodos getter e setter para Valor
    get valor() {
      return this._valor;
    }
  
    set valor(novoValor) {
      this._valor = novoValor;
    }
  
    // Métodos getter e setter para ValorTaxa
    get valorTaxa() {
      return this._valorTaxa;
    }
  
    set valorTaxa(novoValorTaxa) {
      this._valorTaxa = novoValorTaxa;
    }
  
    // Métodos getter e setter para FormaPagamento
    get formaPagamento() {
      return this._formaPagamento;
    }
  
    set formaPagamento(novaFormaPagamento) {
      this._formaPagamento = novaFormaPagamento;
    }
  
    criarPedido(){
      firebase.database().ref("clientes").child(this._cliente).once('value',snapshot =>{

        let dados = snapshot.val();
        let taxa = parseFloat(dados.taxa);

        let valor = parseFloat(document.querySelector("#valorTotal").innerText);
        let soma = valor + taxa;
        let valorPedido = soma.toFixed(2);

        firebase.database().ref("pedidoDelivery").push({
          nome : dados.nome,
          telefone : dados.telefone,
          endereco : dados.endereco,
          complemento : dados.complemento,
          taxa : dados.taxa,
          pedido : this._pedido,
          caixa : this._caixa,
          status: 'Produzindo!',
          valorPedido,
          pagamento : document.querySelector("#forma-pagamento").value,
          pago : 'Não!'
        });
      });
      alert('Pedido Realizado!');
    }

editarPedido(){
  let cliente = this._cliente;
  this._pedido.forEach(e=>{

  let pedido = e;

  let tabela = document.querySelector('#comanda');

  let tr = document.createElement('tr');

  if(pedido.observacoes == ''){
    pedido.observacoes = '0'
  }

    tr.innerHTML = `
  <td class="td ">
      ${pedido.produto}
  </td>
  <td class="td">
      ${pedido.sabor}
  </td>
  <td class="td">
      ${pedido.quantidade}
  </td>
  <td class="td">
      ${pedido.valor}
  </td>
  <td class="td">
  ${pedido.adicionais}
  </td>
  <td class="td">
  <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${pedido.observacoes}</textarea>
  </td>
  `;
  tabela.appendChild(tr);

  document.querySelector("#quantidadeTotal").innerText = cliente.quantidade;

  document.querySelector("#taxa-entrega").value = cliente.taxa;

  document.querySelector("#valorTotal").innerText = cliente.valor;

  document.querySelector("#valor-total").value = cliente.valorPedido;
  });
  
}

juntarPedido() {
  let valores = [];
  let quantidades = [];
  let itens = [];
  firebase.database().ref("carrinhoDelivery").once('value', snapshot => {
    snapshot.forEach(item => {
      let carrinho = item.val();
      itens.push(carrinho);
    });

  this._pedido = this._pedido.concat(itens);
  firebase.database().ref('carrinhoDelivery').remove();

  let tabela = document.querySelector('#comanda');
          
  tabela.innerHTML =''
    
  this._pedido.forEach(item =>{

    let tr = document.createElement('tr');
    
    tr.innerHTML = `
  <td class="td ">
      ${item.produto}
  </td>
  <td class="td">
      ${item.sabor}
  </td>
  <td class="td">
      ${item.quantidade}
  </td>
  <td class="td">
      ${item.valor}
  </td>
  <td class="td">
  ${item.adicionais}
  </td>
  <td class="td">
  <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${item.observacoes}</textarea>
  </td>
  `;
  tabela.appendChild(tr);
  valores.push(item.valor);
  let soma = valores.join('+');
  let valor = eval(soma);

  quantidades.push(item.quantidade);
  let somaqtd = quantidades.join('+');

  let quantidade = eval(somaqtd);

  let taxa = parseFloat(document.querySelector("#taxa-entrega").value);
  
  let valorTotal = valor + taxa

  document.querySelector("#quantidadeTotal").innerText = quantidade;

  document.querySelector("#valorTotal").innerText = valor;

  document.querySelector("#valor-total").value = valorTotal.toFixed(2);
  
  this._valor = valorTotal.toFixed(2);

  });
  });
}

finalizarEdicao(){
  let pedido = this._pedido;

  let valorPedido = this._valor;

  console.log(pedido,valorPedido);

  firebase.database().ref("pedidoDelivery").child(this._chave).child('pedido').set(pedido);

  firebase.database().ref("pedidoDelivery").child(this._chave).child('valorPedido').set(valorPedido);
  
}
mostrarPedido(){
  let tabela = document.querySelector("#pedidofim");
  tabela.innerHTML = '';
  this._pedido.forEach(snapshot =>{
  let tr = document.createElement('tr');

  tr.innerHTML = `
  <td>${snapshot.produto}</td>
  <td>${snapshot.sabor}</td>
  <td>${snapshot.quantidade}</td>
  <td>${snapshot.adicionais}</td>
  <td>${snapshot.observacoes}</td>
  <td>${snapshot.valor}</td>
  `;
  tabela.appendChild(tr);

  document.querySelector("#nome").value = this._cliente.nome;
  document.querySelector("#telefone").value = this._cliente.telefone;
  document.querySelector("#endereco").value = this._cliente.endereco;
  document.querySelector("#total").value = this._cliente.valorPedido;
  document.querySelector("#taxa").value = this._cliente.taxa;

  });

}

finalizarPedido(){
  let pagamento  = document.querySelector("#pagamento").value;

  if(pagamento == 'dinheiro'){
    let dinheiro = parseFloat(document.querySelector("#valor-dinheiro").value);
    let debito =  parseFloat(document.querySelector("#valor-debito").value);
    let credito =  parseFloat(document.querySelector("#valor-credito").value);
    let pix =  parseFloat(document.querySelector("#valor-pix").value);

    let valorPedido = dinheiro+debito+credito+pix;

    let status = 'Finalizado!';
    let pago = 'Sim!';
    firebase.database().ref("pedidoDelivery").child(this._chave).update({
      dinheiro,
      debito,
      credito,
      pix,
      status,
      pago,
      valorPedido,
      pagamento
    });

  }else{
    let status = 'Finalizado!';
    let pago = 'Sim!';

    firebase.database().ref("pedidoDelivery").child(this._chave).child('status').set(status);
    firebase.database().ref("pedidoDelivery").child(this._chave).child('pago').set(pago);
  }
}

}