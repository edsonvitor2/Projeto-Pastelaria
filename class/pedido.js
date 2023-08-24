class Pedido {
    constructor(cliente,produto,caixa) {
      this._cliente = cliente;
      this._pedido = produto;
      this._caixa = caixa;

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

    editarPedido(chave){

    }
    
  }