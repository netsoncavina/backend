const petServices = require("../services/pets.services");
const upload = require("../middleware/upload");

exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      const petModel = {
        petName: req.body.petName,
        petAge: req.body.petAge,
        petType: req.body.petType,
        petBreed: req.body.petBreed,
        petImage: path != "" ? url + "/" + path : "",
      };

      petServices.createPet(petModel, (error, response) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Pet cadastrado com sucesso!",
            data: response,
          });
        }
      });
    }
  });
};

exports.findAll = (req, res, next) => {
  let petModel = {
    petName: req.query.petName,
  };
  petServices.getPets(petModel, (error, response) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        data: response,
      });
    }
  });
};

exports.findOne = (req, res, next) => {
  let petModel = {
    petId: req.params.id,
  };
  petServices.getPetById(petModel, (error, response) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Pet cadastrado com sucesso!",
        data: response,
      });
    }
  });
};

exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const url = req.protocol + "://" + req.get("host");
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      let petModel = {
        petId: req.params.id,
        petName: req.body.petName,
        petAge: req.body.petAge,
        petType: req.body.petType,
        petBreed: req.body.petBreed,
        petImage: path != "" ? url + "/" + path : "",
      };

      petServices.updatePet(petModel, (error, response) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Pet atualizado com sucesso!",
            data: response,
          });
        }
      });
    }
  });
};

exports.delete = (req, res, next) => {
  let petModel = {
    petId: req.params.id,
  };
  petServices.deletePet(petModel, (error, response) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Pet excluido com sucesso!",
        data: response,
      });
    }
  });
};
