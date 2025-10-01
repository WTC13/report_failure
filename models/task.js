const {type} = require("jquery");
const mongoose = require("mongoose");

const task_schema = new mongoose.Schema({
    protocol:{
        type: String,
        require: true
    },
    client:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    tecnico:{
        type: String,
        enum: ["Douglas",
               "Vagner",
               "Wendell",
            ]
    },
    data:{
        type: Date,
        require: true,
    },  
    modulo:{
        type: String,
        enum: ["Financeiro",
               "Orçamento",
               "Serviços",
               "Relação de Materiais",
               "Plano de Corte",
               "Projeto de Vidro",
               "Produtos",
               "Preço dos Itens",
               "Relatórios",
               "Funcionários",
               "Outros"],
        require: true,
    },
    outro_modulo:{
        type: String,
        require: false,
    },
    descricao:{
        type: String,
        require: true,
    },
    link_erro:{
        type: String,
        require: false
    },
    etapa:{
        type: String,
        enum: ["Solicitação Reportada","Solicitação em Análise","Homologação","Produção","Valor Nulo"],
        default: "Solicitação Reportada"
    },
});

module.exports = mongoose.model("Protocolo", task_schema);