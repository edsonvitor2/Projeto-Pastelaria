class CarrinhoBalcao {
constructor(produto, sabor, quantidade, valor, adicionais, observacoes) {
    this.produto = produto;
    this.sabor = sabor;
    this.quantidade = quantidade;
    this.valor = valor;
    this.adicionais = adicionais;
    this.observacoes = observacoes;

    this.criarCarrinho();
    this.listarCarrinho();
}

criarCarrinho() {
    firebase.database().ref("carrinhoBalcao").push({
    produto: this.produto,
    sabor: this.sabor,
    quantidade: this.quantidade,
    valor: this.valor,
    adicionais: this.adicionais,
    observacoes: this.observacoes
    });
}

listarCarrinho(){
    firebase.database().ref("carrinhoBalcao").once('value',snapshot => {
        let tabela = document.querySelector('#carrinho');
        
        tabela.innerHTML ='';
        
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
            <td class="td">
                <img src="/icones/iconExcluir.png" width="40px" id="excluir">
            </td>
            `;
            tabela.appendChild(tr);

            tr.querySelector("#excluir").addEventListener("click",e=>{
            firebase.database().ref("carrinhoBalcao").child(key).remove();
            this.listarCarrinho();
            });
        });
    });
}
}