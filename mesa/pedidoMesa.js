class PedidoMesa{
  constructor(cliente,produto,caixa,chave,carrinho) {
    this._cliente = cliente;
    this._pedido = produto;
    this._caixa = caixa;
    this._chave = chave;
    this._carrinho = carrinho;

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

      let valorPedido = parseFloat(document.querySelector("#valorTotal").innerText);

      let formaPagamento = document.querySelector("#forma-pagamento").value;

    if(formaPagamento == 'separado'){
      firebase.database().ref("pedidosMesa").push({
        nome : dados.nome,
        telefone : dados.telefone,
        endereco : dados.endereco,
        complemento : dados.complemento,
        pedido : this._pedido,
        caixa : this._caixa,
        status: 'Mesa Ocupada!',
        valorPedido,
        pagamento : document.querySelector("#forma-pagamento").value,
        debito: document.querySelector("#pag-debito").value,
        credito: document.querySelector("#pag-credito").value,
        dinheiro: document.querySelector("#pag-dinheiro").value,
        pix: document.querySelector("#pag-pix").value,
        pago : 'Não!',
      });
    }else{
      firebase.database().ref("pedidosMesa").push({
        nome : dados.nome,
        telefone : dados.telefone,
        endereco : dados.endereco,
        complemento : dados.complemento,
        pedido : this._pedido,
        caixa : this._caixa,
        status: 'Mesa Ocupada!',
        valorPedido,
        pagamento : document.querySelector("#forma-pagamento").value,
        pago : 'Não!',
      });
    }
    });
    alert('Pedido Realizado!');
  }

editarPedido(){
let quantidade = [];
let valores = [];

let cliente = this._cliente;
console.log(cliente);
document.querySelector("#forma-pagamento").value = cliente.pagamento;
document.querySelector("#valorTotal").value = cliente.valorPedido;

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

quantidade.push(pedido.quantidade);
let soma = quantidade.join('+');
let qtd = eval(soma);

valores.push(pedido.valor);
let soma2 = valores.join('+');
let value = eval(soma2);

document.querySelector("#valorTotal").innerText = value;
document.querySelector("#quantidadeTotal").innerText = qtd;

if(cliente.pagamento == 'separado'){
  document.querySelector('#form-pagamento').style.display = 'block';
  document.querySelector("#pag-debito").value = cliente.debito;
  document.querySelector("#pag-credito").value = cliente.credito;
  document.querySelector("#pag-dinheiro").value = cliente.dinheiro;
  document.querySelector("#pag-pix").value = cliente.pix;
}

});

}

juntarPedido() {
  
let valores = [];
let quantidades = [];
let itens = [];

firebase.database().ref("carrinhoMesas").once('value', snapshot => {
  snapshot.forEach(item => {
    let carrinho = item.val();
    itens.push(carrinho);
  });
  console.log(itens )
  console.log(this._pedido )
this._pedido = this._pedido.concat(itens);
firebase.database().ref('carrinhoMesas').remove();

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


document.querySelector("#quantidadeTotal").innerText = quantidade;

document.querySelector("#valorTotal").innerText = valor;

this._valor = valor.toFixed(2);

});
});
}

finalizarEdicao(){
let pedido = this._pedido;
let valor = [];
let valorPedido;
let pagamento = document.querySelector("#forma-pagamento").value;

pedido.forEach(item=>{
  valor.push(item.valor);
  let soma = valor.join('+');
  let value = eval(soma);

  valorPedido = value.toFixed(2);
  console.log(valorPedido);
});
if(pagamento == 'separado'){
        
  firebase.database().ref("pedidosMesa").child(this._chave).update({
    debito: document.querySelector("#pag-debito").value,
    credito: document.querySelector("#pag-credito").value,
    dinheiro: document.querySelector("#pag-dinheiro").value,
    pix: document.querySelector("#pag-pix").value,
    pagamento : document.querySelector("#forma-pagamento").value,
    valorPedido : valorPedido,
    pedido : this._pedido
  });
  firebase.database().ref("pedidosMesa").child(this._chave).child('pagamento').set(pagamento);
  firebase.database().ref("pedidosMesa").child(this._chave).child('valorPedido').set(valorPedido);
}else{
  firebase.database().ref("pedidosMesa").child(this._chave).child('pedido').set(pedido);
  firebase.database().ref("pedidosMesa").child(this._chave).child('pagamento').set(pagamento);
  firebase.database().ref("pedidosMesa").child(this._chave).child('valorPedido').set(valorPedido);
}


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
<td>${snapshot.valor}</td>
<td>${snapshot.adicionais}</td>
<td>${snapshot.observacoes}</td>

`;
tabela.appendChild(tr);

if(this._cliente.pagamento == 'separado'){
  document.querySelector("#nome").value = this._cliente.nome;
  document.querySelector("#telefone").value = this._cliente.telefone;
  document.querySelector("#total").value = this._cliente.valorPedido;
  document.querySelector("#pagamento").value = this._cliente.pagamento;
  document.querySelector("#valor-debito").value = this._cliente.debito;
  document.querySelector("#valor-credito").value = this._cliente.credito;
  document.querySelector("#valor-dinheiro").value = this._cliente.dinheiro;
  document.querySelector("#valor-pix").value = this._cliente.pix;
}else{
  document.querySelector("#nome").value = this._cliente.nome;
  document.querySelector("#telefone").value = this._cliente.telefone;
  document.querySelector("#total").value = this._cliente.valorPedido;
  document.querySelector("#pagamento").value = this._cliente.pagamento;
}

});

}

finalizarPedido(){
let pagamento  = document.querySelector("#pagamento").value;

if(pagamento == 'separado'){
  let dinheiro = parseFloat(document.querySelector("#valor-dinheiro").value);
  let debito =  parseFloat(document.querySelector("#valor-debito").value);
  let credito =  parseFloat(document.querySelector("#valor-credito").value);
  let pix =  parseFloat(document.querySelector("#valor-pix").value);

  let valorPedido = dinheiro+debito+credito+pix;

  let status = 'Finalizado!';
  let pago = 'Sim!';
  firebase.database().ref("pedidosMesa").child(this._chave).update({
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
  firebase.database().ref("pedidosMesa").child(this._chave).child('pagamento').set(pagamento);
  firebase.database().ref("pedidosMesa").child(this._chave).child('status').set(status);
  firebase.database().ref("pedidosMesa").child(this._chave).child('pago').set(pago);
}
}

}