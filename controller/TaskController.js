const { data } = require("jquery");
const Protocolo = require("../models/task");
const { prototype } = require("router");
const { stringify } = require('csv-stringify');
const task = require("../models/task");

let message = "";
let type = "";


// página de acesso
const home = (req, res) => {
    return res.render("login");
}

const page_report = async (req, res) => {
    const protocol = req.body.protocolo.trim();
    console.log("Protocolo recebido e processado:", protocol);

    try{
        const task_list = await Protocolo.findOne({protocol});
        console.log("resultado da busca", task_list)
        res.render("reports", {task_list: task_list});
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
}

// envia para a página de formulário de reporte
const page_forms = (req, res) => {
    return res.render("forms");
}

// cadastra o reporte no banco de dados
const report_erro = async (req, res) => {
    const protocol = req.body;
    
    if(!protocol){
        // message: "Coloque o reporte no formulário!";
        return res.redirect("/");
    }
    
    try{
        await Protocolo.create(protocol);
        console.log("Reporte feito com sucesso", {protocol});
        return res.redirect("page_accompany_dev");     
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
    
}

// acessa a página de reporte para os clientes
const page_accompany_client = (req, res) => {
    return res.render("reports", {consult_task: null});
}

// consulta os dados de reporte para os clientes
const page_consult_report = async (req, res) => {
    
    const protocol_consult = req.body.protocolo_consultado.trim();
    console.log("Protocolo recebido e processado:", protocol_consult);

    try{
        const consult_task = await Protocolo.findOne({protocol: protocol_consult});
        console.log("resultado da busca:", consult_task)
        res.render("reports", {consult_task: consult_task});
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
}

// acessa a página do reporte para os desenvolvedores
const page_accompany_dev = (req, res) => {
    return res.render("steps", {task_list: null});
}

// consulta os dados de reporte para os desenvolvedores
const page_edit_report = async (req, res) => {

    const protocol = req.body.protocolo.trim();
    // console.log("Protocolo recebido e processado:", protocol);

    try{
        const task_list = await Protocolo.findOne({protocol: protocol});
        // console.log("resultado da busca:", task_list);

        if(!task_list){
            // console.log("deu red");
            return res.redirect("page_accompany_dev");
        }

        const client_name = task_list.client;
        const history_list = await Protocolo.find({client: client_name});
        
        res.render("steps", {
        task_list: task_list,
        history_list: history_list
        });
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
}

const get_protocol = async (req, res) =>{

    const protocol = req.params.protocolo;
    // console.log("recebido e processado:", protocol);

    try{
        const task_list = await Protocolo.findOne({protocol: protocol});

        if (!task_list) {
            return res.render("steps", {
                task_list: null,
                history_list: []
            });
        }        
        // console.log("res: ", history_list);

        return res.render("steps", {
            task_list: task_list,
            history_list: history_list
        });
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
}

const update_report = async (req, res) => {
    console.log("Resultado", req.body)
    const { protocolo, client, email, senha, tecnico, modulo, outro_modulo, descricao, link_erro, etapa } = req.body;
    try {
        const update_task = await Protocolo.findOneAndUpdate(
            { protocol: protocolo }, // Filtro
            { client, email, senha, tecnico, modulo, outro_modulo, descricao, link_erro, etapa }, // Dados para atualizar
            { new: true } // Retorna o documento atualizado
        );

        if (update_task) {
            // Se a atualização foi bem-sucedida, redireciona o cliente para a página de acompanhamento
            res.redirect('/page_accompany_dev');
        } else {
            res.status(404).send('Protocolo não encontrado para atualização.');
        }

        // res.render("steps", {
        //     task_list: null, 
        //     history_list: []
        // });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
};

const export_data = async (req, res) => {
    try {
        const { client } = req.body;

        if (!client) {
            return res.status(400).send("Nome do cliente não fornecido.");
        }

        // Busca os relatórios no banco de dados com base no nome do cliente
        // O método .lean() é usado para obter objetos JavaScript simples, o que é mais rápido para essa finalidade
        const relatorios = await Protocolo.find({ client: client }).lean();

        if (relatorios.length === 0) {
            return res.status(404).send("Nenhum relatório encontrado para este cliente.");
        }

        // Define as colunas do seu arquivo CSV
        const columns = [
            'protocolo',
            'email',
            'cnpj',
            'modulo',
            'descricao'
        ];

        // Configura o cabeçalho da resposta HTTP para forçar o download do arquivo
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="relatorios_${client}.csv"`);

        // Cria o gerador de CSV
        stringify(relatorios, { 
            header: true, 
            columns: columns 
        }, (err, output) => {
            if (err) {
                throw err;
            }
            res.send(output);
        });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    home,
    page_report,
    page_forms,
    report_erro,
    page_accompany_client,
    page_consult_report,
    page_accompany_dev,
    page_edit_report,
    update_report,
    get_protocol,
    export_data
}