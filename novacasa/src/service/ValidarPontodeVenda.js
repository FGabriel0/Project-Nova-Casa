export const ValidarPontodeVenda = (nome) => {
    const msg = [];
  
    if (!nome) {
      msg.push("O Campo Nome é Obrigatório");
    }
    return msg;
  };
  