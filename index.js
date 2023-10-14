class Users {
    constructor(){
        this.botoes();
    }
    botoes(){
        let criar = document.querySelector("#registrar");

        criar.addEventListener('click',e=>{
            this.criarUsuario();
        });

        let logar = document.querySelector("#logar");

        logar.addEventListener('click',e=>{
            this.logarUsuario();
        });
    }

    criarUsuario(){
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        const nome = document.getElementById("name").value; // Coletando o nome
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
           .then((userCredential) => {
               // Usuário registrado com sucesso
               var user = userCredential.user;
        
               // Salvar o nome no banco de dados do usuário
               firebase.database().ref('users/' + user.uid).set({
                   nome: nome
               });
           })
           .catch((error) => {
               // Ocorreu um erro durante o registro
               var errorCode = error.code;
               var errorMessage = error.message;
               console.error('Erro durante o registro:', errorCode, errorMessage);
           });
    }

    logarUsuario(){
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Usuário logado com sucesso
            var user = userCredential.user;
            console.log('Usuário logado:', user);

            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Ocorreu um erro durante o login
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Erro durante o login:', errorCode, errorMessage);
        });
    }
}

var usuario = new Users();
