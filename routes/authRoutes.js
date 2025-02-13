const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcryptjs');

// Route pour récupérer le meilleur score de l'utilisateur dans les 4 modes de quiz
router.get('/best-scores', async (req, res) => {
  try {
    // Récupérer l'utilisateur connecté (supposons que l'authentification est déjà gérée)
    const userId = req.user.id; // Supposons que vous avez un middleware d'authentification qui décode le token JWT et place les informations de l'utilisateur dans req.user

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const { mode1, mode2, mode3, mode4 } = user.quizScores;
    const bestScores = { mode1, mode2, mode3, mode4 };

    res.status(200).json(bestScores);
  } catch (error) {
    console.error('Erreur lors de la récupération des scores :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// Route POST pour l'inscription
router.post('/signup', async (req, res) => {
  console.log('Requête POST reçue sur /signup:', req.body);
  const { fullName, email, dateOfBirth, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "L'utilisateur existe déjà" });
    }

    // Créer un nouvel utilisateur
    user = new User({
      fullName,
      email,
      dateOfBirth,
      password,
    });

    // Hacher le mot de passe avant de l'enregistrer
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    res.status(200).json({ msg: "Inscription réussie" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour le login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "L'utilisateur n'existe pas" });
    }

    // Check if the password matches (using bcrypt)
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Mot de passe incorrect" });
    }

    // If authentication succeeds, return user information
    res.status(200).json({
      msg: 'Authentification réussie',
      user: {
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});





module.exports = router;