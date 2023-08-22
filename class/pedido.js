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

        let valorPedido = soma;

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
      this.listarPedidos();
    }

    listarPedidos() {
      firebase.database().ref('Caixas').once("value",element=>{
        //table.innerText ='';
        element.forEach(e => {
          let key = e.key;
          let data = e.val();
    
          if(data.status == "aberto"){
            var chave;
            firebase.database().ref("pedidosDelivery").once("value", element => {
                
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
        
                if(status == "Em Produção!"){
                  tr.innerHTML = ` 
                    <td class="pedido">${pedido}</td>
                    <td>${cliente}</td>
                    <td>${status}</td>
                    <td>${valor}</td>
                    <td>${pago}</td>
                    <td>${iten.FormaPagamento}</td>
                    <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
    
                    <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
    
                    <td class="com"><img src="/icones/iconComanda.jpeg" width="40px"></td>
                `;
                table.appendChild(tr);
                        
          tr.querySelector(".entrega").addEventListener("click", e=>{
            this.pedido = pedido;
            this.el.entregar.show();
          });
    
          tr.querySelector(".Edit").addEventListener("click", e=>
            {
              let a = tr.querySelector(".pedido").innerText;
              this.el.cardapio.show();
              this.el.pedidos.hide();
              this.pedido = a; 
              this.EditarPedido = true;
            });
          }
            else if(status == "Finalizado!"){
              tr.innerHTML = ` 
              <td class="pedido">${pedido}</td>
              <td>${cliente}</td>
              <td>${status}</td>
              <td>${valor}</td>
              <td>${pago}</td>
              <td>${iten.FormaPagamento}</td>
              <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
    
              <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
    
              <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
              `;
              table.appendChild(tr);
    
              tr.querySelector(".com").addEventListener("click", e=>{
                //this.el.entregar.show();
                this.el.fecharComanda.show();
                this.el.pedidos.hide();
                this.mostrarPedido(pedido);
                this.pedido = pedido;
              });
            }
              else{
                tr.innerHTML = ` 
                <td class="pedido">${pedido}</td>
                <td>${cliente}</td>
                <td>${status}</td>
                <td>${valor}</td>
                <td>${pago}</td>
                <td>${iten.FormaPagamento}</td>
                <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
    
                <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
    
                <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                `;
                table.appendChild(tr);
    
                tr.querySelector(".entrega").addEventListener("click", e=>{
                  this.pedido = pedido;
                  this.el.entregar.show();
                });
    
                tr.querySelector(".com").addEventListener("click", e=>{
                  //this.el.entregar.show();
                  this.el.fecharComanda.show();
                  this.mostrarPedido(pedido);
                  this.pedido = pedido;
                });
    
                }
                }
                });
              });
            });
          }
        });
      });
    }  

  }