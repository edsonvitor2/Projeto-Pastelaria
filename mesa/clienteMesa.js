class ClienteMesa {
  constructor(nome,telefone,qunatidade,visitas) {
    this._nome = nome;
    this._telefone = telefone;
    this._qunatidade = qunatidade;
    this._visitas = visitas;
    this._chaveCliente;
    this._carrinho = carrinho;

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
    visitas: this._visitas,
    quantidade: this._qunatidade,
    endereco: '0',
    complemento: '0',
    taxa: '0'
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
    visitas: this._visitas,
    quantidade: this._qunatidade,
    endereco: '0',
    complemento: '0',
    taxa: '0'
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
  })
}

criarComanda() {
  console.log(this._carrinho);
const database = firebase.database();
const carrinhoRef = database.ref("carrinhoMesas");
let tabela = document.querySelector('#comanda');
let valores = [];
console.log(this._carrinho);
carrinhoRef.once("value")
  .then(snapshot => {
    if (snapshot.exists()) {
      console.log("O nó carrinhoMesas existe no Firebase.");
      firebase.database().ref("carrinhoMesas").once('value', snapshot => {
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
          let tr = document.createElement('tr');

          if (produto.observacoes == '') {
            produto.observacoes = '0';
          }

          tr.innerHTML = `
            <td class="td">
              ${produto.produto}
            </td>
            <td class="td">
              ${produto.sabor}
            </td>
            <td class="td">
              ${produto.quantidade}
            </td>
            <td class="td">
              ${produto.valor}
            </td>
            <td class="td">
              ${produto.adicionais}
            </td>
            <td class="td">
              <textarea id="myTextarea" rows="4" cols="6" disabled placeholder="OBS:">${produto.observacoes}</textarea>
            </td>
          `;
          tabela.appendChild(tr);
          
          this._produtos.push(produto);
          console.log(this._produtos);

          document.querySelector("#quantidadeTotal").innerText = this._produtos.length;
        });
        firebase.database().ref('carrinhoMesas').remove();
      });
    } else {
      console.log("O nó carrinhoMesas não existe no Firebase.");
    }
  })
  .catch(error => {
    console.error("Ocorreu um erro ao verificar o nó carrinhoMesas:", error);
  });

  setTimeout(() => {
    this._produtos.forEach(e=>{
      valores.push(parseFloat(e.valor));
      let soma = valores.join('+');
      let valor = eval(soma);

      document.querySelector("#valorTotal").innerText = valor.toFixed(2);
    })
  }, 500);
}

  }