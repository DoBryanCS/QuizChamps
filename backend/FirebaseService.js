const db = require("./firebase");

class FirebaseService {
  constructor() {
    this.quizs = db.ref("Quiz");
  }

  getQuizs() {
    return this.quizs;
  }

  getQuiz(id) {
    try {
      return this.quizs.child(id);
    } catch (error) {
      console.log(error);
    }
  }

  getQuizName(id) {
    try {
      return this.quizs.child(id).child("name");
    } catch (error) {
      console.log(error);
    }
  }

  updateQuiz(id, quiz) {
    try {
      this.quizs.child(id).update(quiz);
    } catch (error) {
      console.log(error);
    }
  }

  postQuiz(quiz) {
    try {
      this.quizs.push();
      const id = Math.random().toString(10).substr(2, 8);
      quiz.id = id;
      this.quizs.child(id).set(quiz);
    } catch (error) {
      console.log(error);
    }
  }

  deleteQuiz(id) {
    try {
      this.quizs.child(id).remove();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FirebaseService();
