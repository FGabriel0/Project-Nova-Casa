
export const validar = (nome,email,senha,confirmPassword) => {
    const msg = [];

    if (!nome) {
       msg.push("O campo Nome é obrigatório");
    }
    if (!email) {
       msg.push("\nO campo Email é obrigatório\n");
    } else if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
       msg.push("Por favor,insira um E-mail válido\n");
    }

    if (!senha) {
        msg.push("O campo Senha é obrigatório\n");
     }
     if (!confirmPassword) {
        msg.push("O campo Confirma Senha é obrigatório\n");
     }
    if(!senha || !confirmPassword){
       msg.push("Digite a Senha 2x\n");
    }

    return msg;
}






