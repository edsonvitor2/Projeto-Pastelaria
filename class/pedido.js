class Pedido {
    constructor(cliente,produto) {
      this._cliente = cliente;
      this._pedido = produto;

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

        let nome = dados.nome;
        let telefone = dados.telefone;
        let endereco = dados.endereco;
        let complemento = dados.complemento;
        let taxa = dados.taxa;
        let pedido = this._pedido;

        firebase.database().ref("pedidoDelivery").push({
          nome,
          telefone,
          endereco,
          complemento,
          taxa,
          pedido
        });
      });
      alert('Pedido Realizado!');
    }

  }