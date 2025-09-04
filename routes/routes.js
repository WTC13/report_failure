const routes = require("express").Router();
const TaskController = require("../controller/TaskController");

// página inicial
routes.get("/", TaskController.home);

// Cliente cadastra o erro
routes.post("/salvar_erro", TaskController.report_erro);

// Cliente cadastra o erro
routes.get("/page_report", TaskController.page_report);

// página para acessar o formulário de cadastro de erro
routes.get("/page_forms", TaskController.page_forms);

// página para cliente acessar o status do reporte
routes.get("/page_accompany_client", TaskController.page_accompany_client);
routes.post("/page_consult_report", TaskController.page_consult_report);

// página para os dev's acessar os reportes completos
routes.get("/page_accompany_dev", TaskController.page_accompany_dev);
routes.post("/page_edit_report", TaskController.page_edit_report);

//página para editar os dados do reporte
routes.get("/get_protocol/:protocol", TaskController.get_protocol);
routes.post("/update_report", TaskController.update_report);

//função para exportar dados
routes.post("/export_data", TaskController.export_data);

module.exports = routes;