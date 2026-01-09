async function getAnswer() {
  const fileInput = document.getElementById("img");
  const result = document.getElementById("result");

  if (!fileInput.files.length) {
    alert("Please upload an image");
    return;
  }

  result.innerText = "Reading question from image...";

  try {
    // OCR (same)
    const ocr = await Tesseract.recognize(
      fileInput.files[0],
      "eng"
    );

    const question = ocr.data.text.trim();

    if (question.length < 5) {
      result.innerText = "Question not clear. Try better image.";
      return;
    }

    result.innerText = "Finding answer...";

    // ✅ Gemini via Official JS SDK
    const model = window.genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const aiResult = await model.generateContent(
      "Answer this question clearly:\n\n" + question
    );

    const response = await aiResult.response;
    const answer = response.text();

    if (!answer) {
      result.innerText = "Answer not found. Try another question.";
      return;
    }

    result.innerText = "Answer:\n\n" + answer;

  } catch (err) {
    console.error(err);
    result.innerText = "Something went wrong. Try again.";
  }
}
