const express = require("express");
const router = express.Router();
const FirebaseService = require("../FirebaseService");

router.get("/", (req, res) => {
  const quizs = FirebaseService.getQuizs();
  try {
    quizs.on("value", (snapshot) => {
      console.log(snapshot.val());
      res.status(200).json(snapshot.val());
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const quiz = FirebaseService.getQuiz(req.params.id);
    quiz.once("value", (snapshot) => {
      console.log(snapshot.key);
      res.status(200).json(snapshot.val());
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:id", (req, res) => {
  const getUserQuizs = (id) => {
    try {
      const quizs = FirebaseService.getQuizs();
      const quizzes = [];
      quizs.on("value", (snapshot) => {
        snapshot.forEach((quiz) => {
          console.log(quiz.child("id").val());
          if (quiz.child("userID").val() === id) {
            quizzes.push(quiz.val());
          }
        });
      });
      return quizzes;
    } catch (error) {
      console.log(error);
    }
  };
  try {
    const quizs = getUserQuizs(req.params.id);
    res.status(200).json(quizs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    FirebaseService.postQuiz(req.body);
    res.status(200).json({ message: "Quiz ajouté" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    FirebaseService.updateQuiz(req.params.id, req.body);
    res.status(200).json({ message: "Quiz modifié" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    FirebaseService.deleteQuiz(req.params.id);
    res.status(200).json({ message: "Quiz supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
