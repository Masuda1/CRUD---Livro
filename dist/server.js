"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const Biblioteca_routes_1 = __importDefault(require("./router/Biblioteca.routes")); // Rotas de Bibliotecas
// Váriaveis para definições de rede
const startPort = 31063; // Porta inicial
const host = '0.0.0.0';
// Criando o app do Express
const app = (0, express_1.default)();
// Função para obter IPs locais
const getLocalIPs = () => {
    const interfaces = os_1.default.networkInterfaces();
    const ips = [];
    for (const iface of Object.values(interfaces)) {
        if (!iface)
            continue;
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                ips.push(config.address);
            }
        }
    }
    return ips;
};
// _________________________________________________________________________________________________________________________________________________________
// Configurando middleware
app.use(express_1.default.json()); // Para requisições com `Content-Type: application/json`3
app.use(express_1.default.urlencoded({ extended: true })); // Para requisições com Content-Type: application/x-www-form-urlencoded
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'
app.use(body_parser_1.default.json({ limit: '10mb' })); // Ajuste o limite conforme necessário
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
// _________________________________________________________________________________________________________________________________________________________
// Rotas raizes
app.use('/api/biblioteca', Biblioteca_routes_1.default);
// _________________________________________________________________________________________________________________________________________________________
// Função para encontrar uma porta disponível
const findAvailablePort = (port) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const server = app.listen(port, host, () => {
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            resolve(findAvailablePort(port + 1));
        });
    });
});
// _________________________________________________________________________________________________________________________________________________________
// Iniciar o servidor local
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = yield findAvailablePort(startPort);
    app.listen(port, host, () => {
        console.log(chalk_1.default.greenBright('\n[SRV ✅] Servidor iniciado com sucesso!'));
        console.log(chalk_1.default.cyanBright('\nEndereços disponíveis:'));
        console.log(chalk_1.default.yellowBright(`- Local:    http://127.0.0.1:${port}`));
        const localIPs = getLocalIPs();
        for (const ip of localIPs) {
            console.log(chalk_1.default.yellowBright(`- Rede:     http://${ip}:${port}`));
        }
        console.log(chalk_1.default.blueBright('\nPressione CTRL+C para parar o servidor.\n'));
    });
});
// _________________________________________________________________________________________________________________________________________________________
// Verifique se está em ambiente de desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    startServer();
}
// _________________________________________________________________________________________________________________________________________________________
// Exporta o app como handler para o Vercel
exports.default = app;
