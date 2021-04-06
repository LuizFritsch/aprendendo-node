var cons = require("../models/Consulta");
const mongoose = require("mongoose");
const Consulta = mongoose.model("Agendamento", cons);
class ConsultaFactory {

    build(consultaSimples) {
        var dia = consultaSimples.data.getDate() + 1;
        var mes = consultaSimples.data.getMonth();
        var ano = consultaSimples.data.getFullYear();
        var hora = Number.parseInt(consultaSimples.horario.split(':')[0]);
        var minutos = Number.parseInt(consultaSimples.horario.split(':')[1]);

        var dataInicio = new Date(ano, mes, dia, hora, minutos, 0, 0)

        //dataInicio.setHours(dataInicio.getHours() - 3);

        var cons = {
            id: consultaSimples._id,
            titulo: consultaSimples.nome + " - " + consultaSimples.descricao,
            inicio: dataInicio,
            fim: dataInicio,
        }

        return cons;
    }


}
module.exports = new ConsultaFactory();