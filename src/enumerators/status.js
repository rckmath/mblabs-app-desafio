const Status = {
    SUCCESS: 1,     // Em caso de sucesso
    FAILED: 2,      // Em caso de falha
    PENDING: 3,     // Pendente de aprovação ou requisição
    NOT_FOUND: 4,   // Não encontrado
    DUPLICATED: 5   // Dado já existente
};

module.exports = Status;