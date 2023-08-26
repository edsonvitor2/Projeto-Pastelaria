class Cliente {
    constructor(nome, telefone, endereco, complemento, taxa,_chaveCliente) {
      this._nome = nome;
      this._telefone = telefone;
      this._endereco = endereco;
      this._complemento = complemento;
      this._taxa = taxa;
      this._chaveCliente;
      this._produtos = [];
    }
    get Chave(){
        return this._chaveCliente;
    }

    set Chave(value){
        this._chaveCliente = value;
    }
    // Métodos getter e setter para Nome
    get Nome() {
      return this._nome;
    }
  
    set Nome(novoNome) {
      this._nome = novoNome;
    }
  
    // Métodos getter e setter para Telefone
    get telefone() {
      return this._telefone;
    }
  
    set telefone(novoTelefone) {
      this._telefone = novoTelefone;
    }
  
    // Métodos getter e setter para Endereço
    get endereco() {
      return this._endereco;
    }
  
    set endereco(novoEndereco) {
      this._endereco = novoEndereco;
    }
  
    // Métodos getter e setter para Complemento
    get complemento() {
      return this._complemento;
    }
  
    set complemento(novoComplemento) {
      this._complemento = novoComplemento;
    }
  
    // Métodos getter e setter para Taxa
    get taxa() {
      return this._taxa;
    }
  
    set taxa(novaTaxa) {
      this._taxa = novaTaxa;
    }
  
    salvarCliente(){
        const clienteRef = firebase.database().ref('clientes');

        clienteRef.orderByChild('telefone').equalTo(this._telefone).once('value', snapshot => {
        if (snapshot.exists()) {
            console.log('Cliente já existe. Não será salvo novamente.');

            let chaveCliente = Object.keys(snapshot.val())[0];

            this._chaveCliente = chaveCliente;

            this.mostrarDados()

            console.log('Chave do cliente existente:', this._chaveCliente);

        } else {
            clienteRef.push({
            nome: this._nome,
            telefone: this._telefone,
            endereco: this._endereco,
            complemento: this._complemento,
            taxa: this._taxa
            });
    
            console.log('Cliente salvo com sucesso.');
        }
        });
    }

    editarCliente(){
      const clienteRef = firebase.database().ref('clientes');

      clienteRef.orderByChild('telefone').equalTo(this._telefone).once('value', snapshot => {
      if (snapshot.exists()) {

      let chaveCliente = Object.keys(snapshot.val())[0];

      clienteRef.child(chaveCliente).update({
        nome: this._nome,
        telefone: this._telefone,
        endereco: this._endereco,
        complemento: this._complemento,
        taxa: this._taxa
        });
        console.log('Cliente Atualizado.');
      } else {
        console.log('Cliente não existe.');
      }
      });
  }
    
    mostrarDados(){
      firebase.database().ref("clientes").child(this._chaveCliente).once("value",snapshot =>{
        let dados = snapshot.val();

        
        document.querySelector("#cliente-nome").innerText = dados.nome;

        document.querySelector("#taxa-entrega").value = dados.taxa;
      })
      
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
                
                let produto = {
                  produto: dados.produto,
                  sabor: dados.sabor,
                  quantidade: dados.quantidade,
                  valor: dados.valor,
                  adicionais: dados.adicionais,
                  observacoes: dados.observacoes
                };
                this._produtos.push(produto);

                console.log(this._produtos); 
                
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

              let taxa = parseFloat(document.querySelector("#taxa-cliente").value);
              let valorTotal = valor + taxa
    
              document.querySelector("#quantidadeTotal").innerText = quantidade;
    
              document.querySelector("#valorTotal").innerText = valor;

              document.querySelector("#valor-total").value = valorTotal.toFixed(2);
    
              firebase.database().ref('carrinhoDelivery').remove();
            });
        });
        } else {
          console.log("O nó carrinhoDelivery não existe no Firebase.");
        }
      })
      .catch(error => {
        console.error("Ocorreu um erro ao verificar o nó carrinhoDelivery:", error);
      });

    }  

    somarValoresSeparados() {
      let dinheiro = parseFloat(document.querySelector("#pag-dinheiro").value);
      let debito = parseFloat(document.querySelector("#pag-debito").value);
      let credito = parseFloat(document.querySelector("#pag-credito").value);
      let pix = parseFloat(document.querySelector("#pag-pix").value);
  
      let total = dinheiro + debito + credito + pix;
      console.log(dinheiro);
      document.querySelector("#total-separado").value = total;
  }

    
  }