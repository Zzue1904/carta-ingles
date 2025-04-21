const steps = [
  {
    question: "Heeey Griffiño ¿How are you feeling today?",
    options: ["Great, living the dream", "Could be better, but Im fine"],
    next: {
      "Great, living the dream": 1,
      "Could be better, but Im fine": 1
    }
  },
  {
    question: "Okeeey, next: Do you wanna play Digimon this week?",
    options: ["Of course! Lets digivolve and duel", "Skip this round… next question"],
    next: {
      "Of course! Lets digivolve and duel": 2,
      "Skip this round… next question": 2
    }
  },
  {
    question: "Valee, Wanna hang out this weekend?",
    options: ["Yeah, lets make a plan", " Nah, I will be a ghost this time"],
    next: {
      "Yeah, lets make a plan": 3,
      " Nah, I will be a ghost this time": 4  
    }
  },
  {
    question: "yeiii, Want to go for a random little adventure?",
    options: ["Yes, mystery mode on", "Not this time, adventure postponed"],
    next: {
      "Yes, mystery mode on": 4,
      "Not this time, adventure postponed": 4
    }
  },
  {
    question: "okeey, Plus, Wanna do a mini date this week?",
    options: ["Yes! Im in the mood", "Nah, not feeling it this time, skip"],
    next: {
      "Yes! Im in the mood": 6,
      "Nah, not feeling it this time, skip": 6
    }
  },
  {
    question: "Ehhh ice cold?? 悲しいです Ó╭╮Ò Thanks for the answer :(",
    options: []
  },
  {
    question: "Alright, just one more thing: Do you miss me? ಠಿ_ಠ",
    options: ["Maybe a little bit to much", "Nope, ice cold"],
    next: {
      "Maybe a little bit to much": 7,
      "Nope, ice cold": 5
    }
  },
  {
    question: "Jajaja really? Me too camotito ≽^•⩊•^≼ Thanks for the answer! :3",
    options: [],
    }
];

let currentStep = 0;

function showStep() {
  const step = steps[currentStep];
  document.getElementById("question").innerText = step.question;
  const buttonsDiv = document.getElementById("buttons");
  buttonsDiv.innerHTML = "";

  step.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => nextStep(option);
    buttonsDiv.appendChild(btn);
  });
}

function nextStep(answer) {
  const step = steps[currentStep];
  const next = step.next[answer];
  enviarRespuesta(step.question, answer);

  if (next !== undefined) {
    currentStep = next;
    showStep();
  }
}

function enviarRespuesta(pregunta, respuesta) {
  const formData = new FormData();
  formData.append("Pregunta", pregunta);
  formData.append("Respuesta", respuesta);

  fetch("https://formspree.io/f/xqaqzeye", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    console.log("Enviado a Formspree");
  }).catch(error => {
    console.error("Error al enviar:", error);
  });
}

window.onload = showStep;
