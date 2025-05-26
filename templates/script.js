    const preguntas = [
        { texto: "¿Te has sentido entusiasmado/a con tus proyectos o metas esta semana?", categoria: "motivacion" },
        { texto: "¿Te has sentido físicamente agotado/a la mayor parte del día?", categoria: "energia", inversa: true },
        { texto: "¿Has dudado de tu capacidad para superar desafíos?", categoria: "autoestima", inversa: true },
        { texto: "¿Te ha costado enfocarte en una tarea por más de 20 minutos?", categoria: "concentracion", inversa: true },
        { texto: "¿Has tenido pensamientos repetitivos sobre problemas sin solución?", categoria: "ansiedad", inversa: true },
        { texto: "¿Has llorado o sentido una profunda melancolía sin causa aparente?", categoria: "tristeza", inversa: true },

        { texto: "¿Has iniciado actividades nuevas por iniciativa propia?", categoria: "motivacion" },
        { texto: "¿Has tenido suficiente energía para cumplir con tus responsabilidades?", categoria: "energia" },
        { texto: "¿Te has comparado negativamente con otras personas?", categoria: "autoestima", inversa: true },
        { texto: "¿Has olvidado detalles importantes en tu trabajo o vida cotidiana?", categoria: "concentracion", inversa: true },
        { texto: "¿Te sientes en calma al tomar decisiones importantes?", categoria: "ansiedad" },
        { texto: "¿Disfrutas de actividades que solían hacerte feliz?", categoria: "tristeza" },

        { texto: "¿Sientes que tus esfuerzos diarios tienen un propósito significativo?", categoria: "motivacion" },
        { texto: "¿Tu sueño ha sido reparador y suficiente esta semana?", categoria: "energia" },
        { texto: "¿Has reconocido tus cualidades o logros con orgullo?", categoria: "autoestima" },
        { texto: "¿Puedes ignorar distracciones (como el celular) cuando lo necesitas?", categoria: "concentracion" },
        { texto: "¿Has experimentado tensión muscular o dolor por estrés?", categoria: "ansiedad", inversa: true },
        { texto: "¿Te has aislado de seres queridos sin motivo claro?", categoria: "tristeza", inversa: true },

        { texto: "¿Has postergado tareas importantes sin una razón clara?", categoria: "motivacion", inversa: true },
        { texto: "¿Has necesitado hacer pausas frecuentes por cansancio?", categoria: "energia", inversa: true },
        { texto: "¿Evitas situaciones donde podrías ser juzgado/a?", categoria: "autoestima", inversa: true },
        { texto: "¿Sientes que tu mente está 'en piloto automático' con frecuencia?", categoria: "concentracion", inversa: true },
        { texto: "¿Te preocupan excesivamente situaciones futuras?", categoria: "ansiedad", inversa: true },
        { texto: "¿Sientes que tu estado de ánimo afecta tu productividad?", categoria: "tristeza", inversa: true },

        { texto: "¿Te has sentido satisfecho/a con tus logros recientes?", categoria: "motivacion" },
        { texto: "¿Te sientes capaz de afrontar actividades adicionales sin sobrecargarte?", categoria: "energia" },
        { texto: "¿Te perdonas fácilmente por errores cometidos?", categoria: "autoestima" },
        { texto: "¿Terminas lo que empiezas sin perder el hilo fácilmente?", categoria: "concentracion" },
        { texto: "¿Puedes manejar imprevistos sin sentirte abrumado/a?", categoria: "ansiedad" },
        { texto: "¿Encuentras consuelo o apoyo cuando lo necesitas?", categoria: "tristeza" },
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
      for (let cat in categorias) {
        categorias[cat] = 0; // Reiniciar conteo de categorías
      }

      preguntas.forEach((preg, i)=>{
        let valor = respuestas[i];

        if (preg.inversa){
          valor = 6 - valor;
        }
        categorias[preg.categoria] += valor;
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