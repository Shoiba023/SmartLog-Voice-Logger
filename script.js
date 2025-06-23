function startDictation() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support speech recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.start();

  recognition.onresult = function(event) {
    document.getElementById('text').value = event.results[0][0].transcript;
    recognition.stop();
  };

  recognition.onerror = function(event) {
    document.getElementById('status').innerText = 'Error: ' + event.error;
    recognition.stop();
  };
}

function submitData() {
  const spokenText = document.getElementById('text').value;

  if (!spokenText) {
    alert("Please enter or record a task.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbxxcVF6N0EU0h7Hw68o0AU29gIowuwMII24kD-82BI777q2jrfpo_euA533kfbrIZ04Sw/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: spokenText,
      source: "Mobile",
      status: "Pending",
      notes: "",
    }),
  });

  document.getElementById('status').innerText = "✅ Submitted successfully!";
  document.getElementById('text').value = "";
}
