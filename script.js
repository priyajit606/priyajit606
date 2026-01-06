async function getAnswer() {
  const file = document.getElementById('img').files[0];
  if(!file) return alert("Select an image first!");

  document.getElementById("result").innerText = "Extracting text...";

  // OCR using Tesseract
  const { data: { text } } = await Tesseract.recognize(file, 'eng');
  document.getElementById("result").innerText = "Fetching answer...";

  // Send OCR text to Cloudflare Worker (backend)
  const res = await fetch("https://YOUR_WORKER_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: text })
  });

  const answerData = await res.json();
  document.getElementById("result").innerText = answerData.answer;
}
