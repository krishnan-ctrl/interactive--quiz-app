# Interactive Quiz Application

![Quiz App Screenshot](https://via.placeholder.com/600x400?text=Quiz+App+Screenshot)

A dynamic, interactive quiz application built with JavaScript that allows users to answer questions and receive instant feedback with scoring.

## Features

- 🎯 Dynamic question loading with shuffled options
- ✅ Instant feedback after each question
- 📊 Real-time scoring and progress tracking
- ⏱️ Built-in timer to track quiz duration
- 🎨 Polished, responsive UI with visual feedback
- 🔄 Option to restart the quiz
- 📝 Explanations for correct answers
- 📱 Mobile-friendly design

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6)
- Google Fonts (Poppins)

## Installation

No installation required! Simply:

1. Clone this repository or download the files
2. Open `index.html` in your web browser

```bash
git clone https://github.com/krishnan-ctrl/quiz-app.git
cd quiz-app
open index.html
```

## How to Use

1. Click "Start Quiz" to begin
2. Read each question carefully
3. Select your answer by clicking on an option
4. View instant feedback with explanation
5. Click "Next Question" to proceed
6. After the last question, view your results
7. Click "Restart Quiz" to try again

## Customization

To customize the quiz:

1. **Add/Edit Questions**:
   Modify the `sampleQuestions` array in `script.js`:
   ```javascript
   const sampleQuestions = [
       {
           question: "Your question here",
           options: ["Option 1", "Option 2", "Option 3", "Option 4"],
           answer: "Correct Option",
           explanation: "Explanation for correct answer"
       },
       // Add more questions...
   ];
   ```

2. **Change Styling**:
   Edit the `styles.css` file to modify colors, fonts, or layout.

3. **Adjust Settings**:
   - Change timer behavior in the `startTimer()` function
   - Modify feedback messages in the `endQuiz()` function

## Project Structure

```
quiz-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Future Enhancements

- [ ] Add different question types (multiple correct answers, true/false)
- [ ] Implement difficulty levels
- [ ] Add category selection
- [ ] High score tracking with localStorage
- [ ] Audio feedback for correct/incorrect answers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by Krishnan

