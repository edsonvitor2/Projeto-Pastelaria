class Entregador {
    constructor(nome, statusPedido) {
      this._nome = nome;
      this._statusPedido = statusPedido;
    }
  
    // Métodos getter e setter para Nome
    get nome() {
      return this._nome;
    }
  
    set nome(novoNome) {
      this._nome = novoNome;
    }
  
    // Métodos getter e setter para Status do Pedido
    get statusPedido() {
      return this._statusPedido;
    }
  
    set statusPedido(novoStatusPedido) {
      this._statusPedido = novoStatusPedido;
    }
  }