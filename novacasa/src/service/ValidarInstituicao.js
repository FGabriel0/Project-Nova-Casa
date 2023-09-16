export const ValidarInstituicao = (nome, fone) => {
    const msg = [];
  
    if (!nome) {
      msg.push("O Campo Nome é Obrigatório");
    }
    if (!fone) {
      msg.push("O Campo Fone é Obrigatório");
    } else if (!fone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
      msg.push("Número Inválido");
    }
  
    return msg;
  };
  