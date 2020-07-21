const ProfileType = {
    ADMIN: 1, // Super admin (pode manipular todo o sistema)
    MANAGER: 2, // Admin manager (pode manipular certas infos do banco de dados)
    USER: 3, // Genérico, usuário padrão
};

module.exports = ProfileType;