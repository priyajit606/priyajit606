async function getAnswer() {
  const file = document.getElementById("img").files[0];
  if (!file) {
    alert("Please upload an image");
    return;
  }

  document.getElementById("result").innerText = "Reading question...";

  // OCR
  const { data: { text } } = await Tesseract.recognize(file, 'eng');

  document.getElementById("result").innerText = "Finding answer...";

  // Send text to backend (Cloudflare Worker)
  const res = await fetch("https://YOUR_WORKER_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: text })
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.answer;
}
