async function getAnswer() {
  const fileInput = document.getElementById("img");
  const result = document.getElementById("result");

  if (!fileInput.files.length) {
    alert("Please upload an image");
    return;
  }

  result.innerText = "Reading question from image...";

  // OCR
  const { data: { text } } = await Tesseract.recognize(
    fileInput.files[0],
    "eng"
  );

  const question = text.trim();

  if (!question) {
    result.innerText = "Could not read question clearly.";
    return;
  }

  result.innerText = "Finding answer...";

  // 🔑 PUT YOUR GEMINI API KEY HERE
  const API_KEY = "AIzaSyB_gXI7OUY_C31PmsMFJ50fnkqADccBe4w";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: question }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  try {
    const answer =
      data.candidates[0].content.parts[0].text;

    result.innerText = "Answer:\n\n" + answer;
  } catch (e) {
    result.innerText = "Answer not found. Try another image.";
  }
}
