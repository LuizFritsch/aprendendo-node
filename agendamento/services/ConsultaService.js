var cons = require("../models/Consulta");
const mongoose = require("mongoose");
const Consulta = mongoose.model("Agendamento", cons);
var ConsultaFactory = require("../factories/ConsultaFactory");
class ConsultaService {

    async criar_consulta(nome, email, descricao, cpf, data, horario) {
        var novaConsulta = new Consulta({
            nome,
            email,
            descricao,
            cpf,
            data,
            horario,
            ja_aconteceu: false
        });
        try {
            await novaConsulta.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAll(mostrarJaAcabadas) {
        if (mostrarJaAcabadas) {
            try {
                var consultas = await Consulta.find();
                return consultas
            } catch (error) {
                console.log(error);
                return [{}];
            }
        } else {
            try {
                var consultas = await Consulta.find({ 'ja_aconteceu': false });
                var consultass = [];
                consultas.forEach(consulta => {
                    if (consulta.data != undefined) {
                        consultass.push(ConsultaFactory.build(consulta));
                    }
                });
                return consultass
            } catch (error) {
                console.log(error);
                return [{}];
            }
        }
    }

}
module.exports = new ConsultaService();