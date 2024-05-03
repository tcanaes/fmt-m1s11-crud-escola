
const Utils = {};

Utils.converteStrToData = function (dataAMD) {
    const ano = dataAMD.substring(0, 4);
    const mes = dataAMD.substring(4, 6);
    const dia = dataAMD.substring(6, 8);
    return new Date(`${ano}-${mes}-${dia}T00:00:00Z`);
}

module.exports = Utils;