    const preguntas = [
        { texto: "¿Te has sentido motivado para asistir a clases esta semana?", categoria: "motivacion" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },
        { texto: "¿Te has sentido motivado para asistir a clases esta semana?", categoria: "motivacion" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },
        { texto: "¿Te has sentido motivado para asistir a clases esta semana?", categoria: "motivacion" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },
        { texto: "¿Sientes que tu nivel de energía es suficiente para cumplir con tus responsabilidades académicas?", categoria: "energia" },
        { texto: "¿Has tenido pensamientos negativos sobre tus capacidades como estudiante?", categoria: "autoestima" },
        { texto: "¿Te ha resultado difícil concentrarte durante las clases o el estudio?", categoria: "concentracion" },
        { texto: "¿Te has sentido abrumado por tus tareas o evaluaciones?", categoria: "ansiedad" },
        { texto: "¿Has sentido tristeza o desánimo sin una causa clara?", categoria: "tristeza" },

    ];

    const categorias = {
      tristeza: 0,
      ansiedad: 0,
      motivacion: 0,
      energia: 0,
      concentracion: 0,
      autoestima: 0
    };

    let respuestas = [];
    let actual = 0;

    const preguntaTexto = document.getElementById("pregunta-texto");
    const respuestaSelect = document.getElementById("respuesta-select");
    const btnAnterior = document.getElementById("btn-anterior");
    const btnSiguiente = document.getElementById("btn-siguiente");
    const resultadoDiv = document.getElementById("resultado");

    function mostrarPregunta() {
      const pregunta = preguntas[actual];
      preguntaTexto.textContent = `Pregunta ${actual + 1}: ${pregunta.texto}`;
      respuestaSelect.value = respuestas[actual] || "";
      btnAnterior.disabled = actual === 0;
      btnSiguiente.textContent = actual === preguntas.length - 1 ? "Finalizar" : "Siguiente";
    }

    btnAnterior.addEventListener("click", () => {
      if (actual > 0) actual--;
      mostrarPregunta();
    });

    btnSiguiente.addEventListener("click", () => {
      const valor = respuestaSelect.value;
      if (!valor) return alert("Por favor selecciona una opción antes de continuar.");
      respuestas[actual] = parseInt(valor);
      if (actual < preguntas.length - 1) {
        actual++;
        mostrarPregunta();
      } else {
        procesarResultados();
      }
    });

    function procesarResultados() {
      preguntas.forEach((preg, i) => {
        categorias[preg.categoria] += respuestas[i];
      });

      let resumen = "<h3 class='text-azul'>Resultados por categoría:</h3><ul class='list-group'>";
      for (let cat in categorias) {
        const total = categorias[cat];
        let nivel = total <= 10 ? "Bajo" : total <= 17 ? "Medio" : "Alto";
        resumen += `<li class='list-group-item d-flex justify-content-between align-items-center'>
          <strong>${cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>
          <span class='badge bg-primary rounded-pill'>${total}/25 - ${nivel}</span>
        </li>`;
      }
      resumen += "</ul>";
      document.getElementById("test-container").style.display = "none";
      resultadoDiv.innerHTML = resumen;
    }

    mostrarPregunta();