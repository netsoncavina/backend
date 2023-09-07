const { pet } = require("../models/pets.model");

async function createPet(params, callback) {
  if (!params.petName) {
    return callback({
      message: "O nome do pet é obrigatório",
    });
  }

  // if (!params.age) {
  //   return callback({
  //     message: "A idade do pet é obrigatória",
  //   });
  // }

  // if (!params.type) {
  //   return callback({
  //     message: "O tipo do pet é obrigatório",
  //   });
  // }

  // if (!params.breed) {
  //   return callback({
  //     message: "A raça do pet é obrigatória",
  //   });
  // }

  // if (!params.image) {
  //   return callback({
  //     message: "A imagem do pet é obrigatória",
  //   });
  // }

  const petModel = new pet(params);
  petModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getPets(params, callback) {
  const petName = params.petName;

  // Pesquisa por nome do pet se o parâmetro for informado
  var condition = petName
    ? {
        petName: { $regex: new RegExp(petName), $options: "i" },
      }
    : {};

  pet
    .find(condition)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getPetById(params, callback) {
  const petId = params.petId;

  pet
    .findById(petId)
    .then((response) => {
      if (!response) callback("Id inválido");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updatePet(params, callback) {
  const petId = params.petId;

  pet
    .findByIdAndUpdate(petId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback("Id inválido");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deletePet(params, callback) {
  const petId = params.petId;

  pet
    .findByIdAndRemove(petId)
    .then((response) => {
      if (!response) callback("Id inválido");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
};
