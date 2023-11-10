const mongoose = require("mongoose");
const human = require("./personne");
require("dotenv").config();
const uri = process.env.MONGO_URI;
(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connecté à la base de données MongoDB.");
  } catch (err) {
    console.error(err);
  }
})();

// //Création et enregistrement  d'un modèle
(async () => {
  try {
    const pers = new human({
      name: "Sammba",
      age: 22,
      favoritesFoods: ["burger"],
    });
    const result = await pers.save();
    console.log(result);
  } catch (error) {
    console.log(`L'enregistrement ne passe pas`);
  }
})();
// //Création de nombreux enregistrements avec model.create()
(async () => {
  try {
    const instances = await human.create([
      {
        name: "Mary",
        age: 30,
        favoritesFoods: ["pizza", "tacos"],
      },
      {
        name: "John",
        age: 45,
        favoritesFoods: ["thiep", "yassa"],
      },
      {
        name: "woos",
        age: 20,
        favoritesFoods: ["chicken", "fish"],
      },
      {
        name: "oumar",
        age: 18,
        favoritesFoods: ["rice", "lentil"],
      },
      {
        name: "abdou",
        age: 67,
        favoritesFoods: ["fruits", "vegetables"],
      },
    ]);
    console.log(instances);
  } catch (error) {
    console.log("La creation a echoue");
  }
})();
// Utilisation model.find() pour rechercher sur la  base de données
(async () => {
  try {
    const found = await human.find({ name: { $exists: true } });
    console.log(found);
  } catch (error) {
    console.log("Name non trouve");
  }
})();
//Utilisez model.findOne() pour renvoyer un seul document correspondant à partir de notre base de données
(async () => {
  try {
    await mongoose.connect(uri);
    console.log("connex re");
    const foundP = await human.findOne({ favoritesFoods: "thiep" });
    console.log(foundP);
  } catch (error) {
    console.log("Non trouvee");
  }
})();
//Utilisez model.findById() pour rechercher la base de données par _id
(async () => {
  try {
    const id = "654e7531fbe8fa21381f087a";
    const foundid = await human.findById(id);
    console.log(foundid);
  } catch (error) {
    console.log(`l'id n'est pas trouver`);
  }
})();
// //Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
(async () => {
  try {
    const id = "654e7531fbe8fa21381f087a";
    const foundid = await human.findOneAndUpdate(
      { _id: id },
      { $push: { favoritesFoods: "thiou" } },
      { new: true }
    );
    console.log(foundid);
  } catch (error) {
    console.log("Personne non mis a jours");
  }
})();
//Supprimer un document à l'aide de model.findByIdAndRemove
(async () => {
  try {
    const id = "654e7531fbe8fa21381f087a";
    const foundid = await human.findByIdAndRemove(id);
    console.log(foundid);
  } catch (error) {
    console.log("Personne non supprimer");
  }
})();
//MongoDB et Mongoose - Supprimez de nombreux documents avec model.remove()
(async () => {
  try {
    const foundid = await human.deleteMany({ name: "John" });
    console.log(foundid);
  } catch (error) {
    console.log(`La personne n'est supprimee`);
  }
})();
//Aides aux requêtes de recherche en chaîne pour affiner les résultats de recherche
(async () => {
  try {
    // Utilisez .find() pour rechercher des personnes qui aiment les burritos
    const resultats = await human
      .find({ favoritesFoods: "fruits" })
      // Utilisez .sort() pour trier par nom (ordre croissant)
      .sort({ name: 1 })
      // Utilisez .limit() pour limiter les résultats à deux documents
      .limit(2)
      // Utilisez .select() pour masquer le champ 'age'
      .select({ age: 0 });
    console.log("Résultats de la recherche :", resultats);
  } catch (erreur) {
    console.log("Non trouver");
  }
})();
