/**
 * Serviço de autenticação com Google
 * Para uso em produção, você precisará registrar seu aplicativo no Google Cloud Console
 * e obter um CLIENT_ID válido
 */

// Substitua pelo seu CLIENT_ID do Google Cloud Console
const CLIENT_ID = 'SEU_CLIENT_ID_DO_GOOGLE.apps.googleusercontent.com';

// Configuração da API do Google
let auth2;
let googleUser;

/**
 * Inicializa o serviço de autenticação quando o documento estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Exibir o botão de login ou o perfil do usuário
    checkAuthState();
    
    // Configurar botão de logout
    document.getElementById('signOutButton').addEventListener('click', signOut);
    
    // Inicializar a biblioteca do Google Sign-In
    initializeGoogleSignIn();
});

/**
 * Inicializa o SDK do Google Sign-In e renderiza o botão
 */
function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
    });
    
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { 
            theme: "outline", 
            size: "large",
            text: "signin_with", 
            shape: "rectangular",
            logo_alignment: "left",
            locale: "pt-BR",
            width: 250
        }
    );
}

/**
 * Manipula a resposta da autenticação
 * @param {Object} response - Resposta da autenticação
 */
function handleCredentialResponse(response) {
    // Decodifica o token JWT
    const responsePayload = parseJwt(response.credential);
    
    // Armazena as informações do usuário no localStorage
    localStorage.setItem('userToken', response.credential);
    localStorage.setItem('userName', responsePayload.name);
    localStorage.setItem('userEmail', responsePayload.email);
    localStorage.setItem('userPicture', responsePayload.picture);
    
    // Atualiza a interface
    updateUserInterface(responsePayload);
}

/**
 * Decodifica o token JWT para obter as informações do usuário
 * @param {string} token - Token JWT
 * @returns {Object} Informações decodificadas do usuário
 */
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

/**
 * Desconecta o usuário
 */
function signOut() {
    // Remove os dados do usuário
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPicture');
    
    // Recarrega a página para reiniciar o estado de autenticação
    location.reload();
}

/**
 * Verifica o estado de autenticação do usuário
 */
function checkAuthState() {
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
        // Se o token existir, o usuário está logado
        const userName = localStorage.getItem('userName');
        const userPicture = localStorage.getItem('userPicture');
        
        // Atualiza a interface com os dados do usuário
        updateUserInterface({
            name: userName,
            picture: userPicture
        });
    } else {
        // Se não houver token, mostra o botão de login
        document.getElementById('googleSignInButton').style.display = 'block';
        document.getElementById('userProfile').style.display = 'none';
    }
}

/**
 * Atualiza a interface com os dados do usuário
 * @param {Object} user - Informações do usuário
 */
function updateUserInterface(user) {
    // Exibe o perfil do usuário
    document.getElementById('userImage').src = user.picture;
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('googleSignInButton').style.display = 'none';
    
    // Atualizar outros elementos da interface que dependem do estado de login
    updateRestrictedContent(true);
}

/**
 * Atualiza elementos da interface que são restritos a usuários logados
 * @param {boolean} isLoggedIn - Indica se o usuário está logado
 */
function updateRestrictedContent(isLoggedIn) {
    // Exemplo: habilitar/desabilitar links de registro
    const registrarLink = document.querySelector('a[href="pages/registrar.html"]');
    const registrosLink = document.querySelector('a[href="pages/registros.html"]');
    
    if (registrarLink && registrosLink) {
        if (isLoggedIn) {
            // Usuário logado pode acessar todas as funcionalidades
            registrarLink.classList.remove('disabled-link');
            registrosLink.classList.remove('disabled-link');
        } else {
            // Usuário não logado tem acesso limitado
            registrarLink.classList.add('disabled-link');
            registrosLink.classList.add('disabled-link');
        }
    }
}