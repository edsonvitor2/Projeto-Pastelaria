class DeliveryController{
  constructor(){
    this.bd = firebase.database();
    this.carrinho;
    this.cliente;
    this.pedido;

    this.elementsPrototype();
    this.loadElements();
    this.initEvents();
    this.initAdicionais();
    this.listarPedidos();
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
      if(this.style.display == 'none'){
        this.style.display = 'block'
      }else{
        this.style.display = 'none'
      }
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
  
  this.el.finalizarPedido.on('click',e=>{

  });

  this.el.pagamento.addEventListener('change', () => {  
    
  });

  this.el.fecharPaniel.on('click',e=>{
    this.el.fecharComanda.hide();
    this.el.pedidos.show();
  });

  this.el.fecharEntregador.on('click',e=>{
    this.el.entregar.hide();
  })

  this.el.pararPedido.on("click",e=>{
    
  })
  
  this.el.enviarEntrega.on("click",e=>{

  });

  this.el.enviar.on("click", e => {
    event.preventDefault();
    this.criarCliente();
    this.el.cardapio.show();
    this.el.criarClientes.hide();
  });

  this.el.finalizar.on('click',e=>{

    let cliente = this.cliente._chaveCliente;
    let produtos = this.cliente._produtos;

    firebase.database().ref("Caixas").once("value",snapshot=>{
      snapshot.forEach(item =>{
        let caixa = item.val();
        let id = caixa.id;
        console.log(id);
        if(caixa.status == 'aberto'){
          this.pedido = new Pedido(cliente,produtos, id);
          this.pedido.criarPedido();

          /*setTimeout(() => {
          location.reload();
          }, 500);*/

        }
      });
    });
  });  

  
  this.el.telefoneCliente.addEventListener("keyup", () => {
    this.formatarNumero();
    this.verificarCliente();
  });

  this.el.abrirPainel.on('click',e=>{
      this.el.criarClientes.show();
      this.el.pedidos.hide();
  });

  this.el.fecharPainel.on('click',e=>{
      this.el.criarClientes.hide();
      this.el.pedidos.show();
  });

  this.el.pastel.on('click',e=>{
    this.abrirCardapio('cardapioPasteis');
  });

  this.el.panqueca.on('click',e=>{
    this.abrirCardapio('cardapioPanquecas');
  });

  this.el.tapioca.on('click',e=>{
    this.abrirCardapio('cardapioTapiocas');
  });

  this.el.batata.on('click',e=>{
    this.abrirCardapio('cardapioBatatas');
  });

  this.el.bebida.on('click',e=>{
    this.abrirCardapio('cardapioBebidas');
  });

  this.el.balcao.on('click',e=>{
    this.abrirCardapio('cardapioProdutosBalcao');
  });

  this.el.enviarCozinha.on('click',e=>{
    
    this.cliente.criarComanda();
      
    setTimeout(() => {
      this.carrinho.listarCarrinho();
    }, 500);

  });

  this.el.fecharAdc.on('click',e=>{
    this.el.adicionar.hide();
    this.el.fecharAdc.hide();
  })
  }

  initAdicionais(){
    this.el.adcFrango.on('click',e=>{
        this.addArrayAdicionais("  frango");
        this.adicionarValor(4);
    });
    this.el.removeFrango.on('click',e=>{
        this.removeArrayAdicionais('  frango');
        this.removerValor(4);
    });

    this.el.adcCarne.on('click',e=>{
        this.addArrayAdicionais(" Carne");
        this.adicionarValor(5);
    });
    this.el.removeCarne.on('click',e=>{
        this.removeArrayAdicionais(' Carne');
        this.removerValor(5);
    });

    this.el.adcMilho.on('click',e=>{
        this.addArrayAdicionais(" Milho");
        this.adicionarValor(2);
    });
    this.el.removeMilho.on('click',e=>{
        this.removerValor(2);
        this.removeArrayAdicionais(' Milho');
    });

    this.el.adcCheddar.on('click',e=>{
        this.addArrayAdicionais(" Cheddar");
        this.adicionarValor(2);
    });
    this.el.removeCheddar.on('click',e=>{
        this.removerValor(2);
        this.removeArrayAdicionais(' Cheddar');
    });

    this.el.adcMussarela.on('click',e=>{
        this.addArrayAdicionais(" Mussarela");
        this.adicionarValor(3);
    });
    this.el.removeMussarela.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Mussarela');
    });

    this.el.adcPequi.on('click',e=>{
        this.addArrayAdicionais(" Pequi");
        this.adicionarValor(3);
    });
    this.el.removePequi.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Pequi');
    });

    this.el.adcCatupiry.on('click',e=>{
        this.addArrayAdicionais(" Catupiry");
        this.adicionarValor(3);
    });
    this.el.removeCatupiry.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Catupiry');
    });

    this.el.adcTomate.on('click',e=>{
        this.addArrayAdicionais(" Tomate");
        this.adicionarValor(2);
    });
    this.el.removeTomate.on('click',e=>{
        this.removerValor(2);
        this.removeArrayAdicionais(' Tomate');
    });

    this.el.adcQueriroba.on('click',e=>{
        this.addArrayAdicionais(" Queriroba");
        this.adicionarValor(3);
    });
    this.el.removeQueriroba.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Queriroba');
    });

    this.el.adcPresunto.on('click',e=>{
        this.addArrayAdicionais(" Presunto");
        this.adicionarValor(3);
    });
    this.el.removePresunto.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Presunto');
    });

    this.el.adcAzeitona.on('click',e=>{
        this.addArrayAdicionais(" Azeitona");
        this.adicionarValor(2);
    });
    this.el.removeAzeitona.on('click',e=>{
        this.removerValor(2);
        this.removeArrayAdicionais(' Azeitona');
    });

    this.el.adcCalabresa.on('click',e=>{
        this.addArrayAdicionais(" Calabresa");
        this.adicionarValor(3);
    });
    this.el.removeCalabresa.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Calabresa');
    });

    this.el.adcPalmito.on('click',e=>{
        this.addArrayAdicionais(" Palmito");
        this.adicionarValor(3);
    });
    this.el.removePalmito.on('click',e=>{
        this.removerValor(3);
        this.removeArrayAdicionais(' Palmito');
    });
  }

  criarCliente(){
    let nome = this.el.nomeCliente.value;
    let telefone = this.el.telefoneCliente.value;
    let endereco = this.el.enderecoCliente.value;

    this.cliente = new Cliente(nome,telefone,endereco,'complemento','taxa');
    console.log(nome);
    this.cliente.salvarCliente();
  }

  verificarCliente(){
    let telefone = this.el.telefoneCliente.value;
      console.log(telefone);
      // Verificar se o número de telefone já está salvo
      firebase.database().ref("clientes").orderByChild("telefone").equalTo(telefone).once("value", snapshot => {
        if (snapshot.exists()) 
        {
          snapshot.forEach(childSnapshot => {
        let clienteData = childSnapshot.val();
        this.keyClienteAtt = childSnapshot.key;
    
        console.log(this.keyClienteAtt);
        this.el.nomeCliente.value = clienteData.nome;
        this.el.telefoneCliente.value =clienteData.telefone;
        this.el.enderecoCliente.value = clienteData.endereco;
        this.el.complementoCliente.value =clienteData.complemento;
        this.el.taxaCliente.value = clienteData.taxa;
    
          });
        } else {
          this.el.nomeCliente.value = "";
        }
      });
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

      let adcValue = data.adc !== undefined ? data.adc : '0';
      let valorExibido = data.adc !== undefined ? data.valor : data.valorInicial;

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
      });
    
      tr.querySelector(".btnCarrinho").addEventListener("click", e=>{
        this.criarCarrinho(tr,data);
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

  criarCarrinho(tr,data){
    let quantidade = tr.querySelector(".quantidade").value;
    let produto = data.produto;
    let sabor = tr.querySelector(".sabor").innerText;
    let valorFim = quantidade * tr.querySelector(".card-valor").innerText;
    let valor = valorFim.toFixed(2);
    let obs = tr.querySelector("#myTextarea").value;
    let adc = tr.querySelector(".card-adc").innerText;
    
    this.carrinho = new Carrinho(produto,sabor,quantidade,valor,adc,obs);

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

adicionarValor(value){
  this.addValue.push(value);
  let a = this.addValue.join('+');
  let b = eval(a);
  let d = parseFloat(this.value);
  let c = b + d;
  let valor = c.toFixed(2);
  
}
removerValor(value){
  firebase.database().ref(this.idCardapio).child(this.keyProduto).once("value",e=>{
    let data = e.val();
    
    let result = data.valor - value;
    let valor = result.toFixed(2);
    
    firebase.database().ref(this.idCardapio).child(this.keyProduto).update({valor});

    this.valorAdc = '';
    this.initCardapio(this.idCardapio);
  });
}

formatarNumero(){
  // Adicione o evento de digitação ao campo de telefone
  this.el.telefoneCliente.addEventListener("input", () => {
    let telefone = this.el.telefoneCliente.value;
  
    // Remover caracteres não numéricos do número de telefone
    telefone = telefone.replace(/\D/g, "");
  
    // Formatar o número de telefone conforme desejado
    let telefoneFormatado = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
  
    // Definir o valor formatado no campo de telefone
    this.el.telefoneCliente.value = telefoneFormatado;
  });
  
}

listarPedidos() {
  var chave;
  var numero = 0;
  
  firebase.database().ref('Caixas').once("value",element=>{
    //table.innerText ='';
    element.forEach(e => {
      let key = e.key;
      let data = e.val();

      if(data.status == "aberto"){
        firebase.database().ref("pedidoDelivery").once("value", element => {
            
          let table = document.querySelector("#pedido");
          table.innerHTML = '';
          element.forEach(e => {
            
            chave = e.key;
            let dat = e.val();
            
            if(dat.caixa == data.id){

              numero += 1;

              if(dat.status == 'Produzindo!'){
                let tr = document.createElement('tr');
  
                tr.innerHTML = ` 
                <td>${numero}</td>
                <td>${dat.nome}</td>
                <td>${dat.status}</td>
                <td>${dat.valorPedido}</td>
                <td>${dat.pago}</td>
                <td>${dat.pagamento}</td>
  
                <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
  
                <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
  
                <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                `;

                table.appendChild(tr);

                tr.querySelector('.Edit').addEventListener("click",e=>{
                  console.log('Editar');
                });

                tr.querySelector('.entrega').addEventListener("click",e=>{
                  console.log('Enviar');
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
  
                <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
  
                <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                `;

                table.appendChild(tr);

              }else{
                let tr = document.createElement('tr');

                tr.innerHTML = ` 
                <td>${numero}</td>
                <td>${dat.nome}</td>
                <td>${dat.status}</td>
                <td>${dat.valorPedido}</td>
                <td>${dat.pago}</td>
                <td>${dat.pagamento}</td>
  
                <td class="Edit"><img src="/icones/iconEdit.png" width="40px"></td>
  
                <td class="entrega"><img src="/icones/iconMoto.png" width="40px"></td>
  
                <td class="com"><img src="/icones/iconComanda.png" width="40px"></td>
                `;

                table.appendChild(tr);

                tr.querySelector('.com').addEventListener("click",e=>{
                  console.log('Finalizar');
                });

              }
            }
          });
        });
      }
    });
  });

}  


}
var delivery = new DeliveryController();


/**/