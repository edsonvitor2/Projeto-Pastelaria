class Pedido {
    constructor() {
      this.itens = [];

      this.criarComanda();
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
  
    criarComanda(){
      const database = firebase.database();
      const carrinhoRef = database.ref("carrinhoDelivery");
      
      var valores = [];
      var quantidades = [];
     
      carrinhoRef.once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("O nó carrinhoDelivery existe no Firebase.");
          firebase.database().ref("carrinhoDelivery").once('value',snapshot => {
            let tabela = document.querySelector('#comanda');
            
            tabela.innerHTML =''
            
            snapshot.forEach(item => {
                let dados = item.val();
                let key = item.key;
                console.log(dados);  
                
                let tr = document.createElement('tr');
    
                if(dados.observacoes == ''){
                    dados.observacoes = '0'
                }
    
                tr.innerHTML = `
              <td class="td ">
                  ${dados.produto}
              </td>
              <td class="td">
                  ${dados.sabor}
              </td>
              <td class="td">
                  ${dados.quantidade}
              </td>
              <td class="td">
                  ${dados.valor}
              </td>
              <td class="td">
              ${dados.adicionais}
              </td>
              <td class="td">
              <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${dados.observacoes}</textarea>
              </td>
              `;
              tabela.appendChild(tr);
    
              valores.push(dados.valor);
              let soma = valores.join('+');
              let valor = eval(soma);
    
              quantidades.push(dados.quantidade);
              let somaqtd = quantidades.join('+');
              let quantidade = eval(somaqtd);
    
              document.querySelector("#quantidadeTotal").innerText = quantidade;
    
              document.querySelector("#valorTotal").innerText = valor;
    
              firebase.database().ref('carrinhoDelivery').remove();
            });
        });
        } else {
          console.log("O nó carrinhoDelivery não existe no Firebase.");
          // Aqui você pode lidar com a situação em que o nó não existe
        }
      })
      .catch(error => {
        console.error("Ocorreu um erro ao verificar o nó carrinhoDelivery:", error);
      });

    }  

  }