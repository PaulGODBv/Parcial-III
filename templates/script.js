const preguntas = [
    // Motivación (2 inversas)
    { texto: "¿Te has sentido entusiasmado/a con tus proyectos o metas esta semana?", categoria: "motivacion" },
    { texto: "¿Has iniciado actividades nuevas por iniciativa propia?", categoria: "motivacion" },
    { texto: "¿Sientes que tus esfuerzos diarios tienen un propósito significativo?", categoria: "motivacion" },
    { texto: "¿Has postergado tareas importantes sin una razón clara?", categoria: "motivacion", inversa: true },
    { texto: "¿Te has sentido satisfecho/a con tus logros recientes?", categoria: "motivacion" },

    // Energía (2 inversas)
    { texto: "¿Te has sentido físicamente agotado/a la mayor parte del día?", categoria: "energia", inversa: true },
    { texto: "¿Has tenido suficiente energía para cumplir con tus responsabilidades?", categoria: "energia" },
    { texto: "¿Tu sueño ha sido reparador y suficiente esta semana?", categoria: "energia" },
    { texto: "¿Has necesitado hacer pausas frecuentes por cansancio?", categoria: "energia", inversa: true },
    { texto: "¿Te sientes capaz de afrontar actividades adicionales sin sobrecargarte?", categoria: "energia" },

    // Autoestima (3 inversas)
    { texto: "¿Has dudado de tu capacidad para superar desafíos?", categoria: "autoestima", inversa: true },
    { texto: "¿Te has comparado negativamente con otras personas?", categoria: "autoestima", inversa: true },
    { texto: "¿Has reconocido tus cualidades o logros con orgullo?", categoria: "autoestima" },
    { texto: "¿Evitas situaciones donde podrías ser juzgado/a?", categoria: "autoestima", inversa: true },
    { texto: "¿Te perdonas fácilmente por errores cometidos?", categoria: "autoestima" },

    // Concentración (3 inversas)
    { texto: "¿Te ha costado enfocarte en una tarea por más de 20 minutos?", categoria: "concentracion", inversa: true },
    { texto: "¿Has olvidado detalles importantes en tu trabajo o vida cotidiana?", categoria: "concentracion", inversa: true },
    { texto: "¿Puedes ignorar distracciones (como el celular) cuando lo necesitas?", categoria: "concentracion" },
    { texto: "¿Sientes que tu mente está 'en piloto automático' con frecuencia?", categoria: "concentracion", inversa: true },
    { texto: "¿Terminas lo que empiezas sin perder el hilo fácilmente?", categoria: "concentracion" },

    // Ansiedad (3 inversas)
    { texto: "¿Has tenido pensamientos repetitivos sobre problemas sin solución?", categoria: "ansiedad", inversa: true },
    { texto: "¿Te sientes en calma al tomar decisiones importantes?", categoria: "ansiedad" },
    { texto: "¿Has experimentado tensión muscular o dolor por estrés?", categoria: "ansiedad", inversa: true },
    { texto: "¿Te preocupan excesivamente situaciones futuras?", categoria: "ansiedad", inversa: true },
    { texto: "¿Puedes manejar imprevistos sin sentirte abrumado/a?", categoria: "ansiedad" },

    // Tristeza (3 inversas)
    { texto: "¿Has llorado o sentido una profunda melancolía sin causa aparente?", categoria: "tristeza", inversa: true },
    { texto: "¿Disfrutas de actividades que solían hacerte feliz?", categoria: "tristeza" },
    { texto: "¿Te has aislado de seres queridos sin motivo claro?", categoria: "tristeza", inversa: true },
    { texto: "¿Sientes que tu estado de ánimo afecta tu productividad?", categoria: "tristeza", inversa: true },
    { texto: "¿Encuentras consuelo o apoyo cuando lo necesitas?", categoria: "tristeza" }
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

      let resumen = "<h3 class='text-azul'>Tus resultados:</h3><ul class='list-group'>";
      for (let cat in categorias) {
        const total = categorias[cat];
        let nivel = total <= 10 ? "Bajo" : total <= 17 ? "Medio" : "Alto";
        
        // Mensajes para cada categoría y nivel
        let mensaje = "";
        switch(cat) {
          case "motivacion":
            mensaje = nivel === "Bajo" 
              ? "Parece que últimamente te cuesta encontrar motivación. ¡No te rindas! Prueba empezar con metas pequeñas y celebra cada logro." 
              : nivel === "Medio" 
              ? "Tienes un nivel decente de motivación, pero hay espacio para mejorar. Identifica qué te apasiona y conéctalo con tus tareas diarias." 
              : "¡Impresionante! Tu motivación es un motor poderoso. Sigue canalizando esa energía hacia tus objetivos.";
            break;
            
          case "energia":
            mensaje = nivel === "Bajo" 
              ? "Noto que tu energía está baja últimamente. Revisa tu sueño, alimentación y tiempo para descansar. Pequeños cambios pueden hacer gran diferencia." 
              : nivel === "Medio" 
              ? "Tu energía es regular, pero no óptima. ¿Has probado técnicas como la 'pomodoro' o pausas activas?" 
              : "¡Eres una batería humana! Sabes mantenerte activo/a. Recuerda equilibrar tu energía con momentos de desconexión.";
            break;
            
          case "autoestima":
            mensaje = nivel === "Bajo" 
              ? "Veo que dudas mucho de ti mismo/a. ¡Detente! Eres más capaz de lo que crees. Haz una lista de 3 cosas que hiciste bien hoy." 
              : nivel === "Medio" 
              ? "Tu autoestima flaquea a veces, pero también tienes momentos de seguridad. Practica el autoelogio diario." 
              : "¡Bravo! Confías en tus capacidades y eso se nota. No dejes que los errores ocasionales te desanimen.";
            break;
            
          case "concentracion":
            mensaje = nivel === "Bajo" 
              ? "La concentración parece ser un desafío. Reduce distracciones, prueba bloques de tiempo enfocado y descansa cada 25 minutos." 
              : nivel === "Medio" 
              ? "Tu concentración es aceptable, pero puedes mejorarla. ¿Has intentado eliminar notificaciones o usar ruido blanco?" 
              : "¡Enhorabuena! Tienes una gran capacidad de enfoque. Aprovecha este superpoder para proyectos importantes.";
            break;
            
          case "ansiedad":
          mensaje = nivel === "Bajo" 
              ? "La ansiedad parece estar alta. Considera priorizar tu bienestar con pausas conscientes y, si es necesario, busca apoyo profesional."
              : nivel === "Medio" 
              ? "El estrés te afecta moderadamente. Prueba técnicas de respiración o mindfulness cuando sientas que aumenta."
              : "Manejas bien el estrés. Sigue usando esas estrategias que te mantienen en calma ante los desafíos.";
          break;
          
          case "tristeza":
          mensaje = nivel === "Bajo" 
              ? "Noto que la tristeza pesa mucho. No estás solo/a. Comparte lo que sientes y considera pedir ayuda especializada si persiste."
              : nivel === "Medio" 
              ? "Algunos días son grises, pero no defines. Habla con alguien de confianza o escribe sobre lo que sientes."
              : "Tu ánimo parece positivo. Sigue cultivando actividades y relaciones que te den alegría y propósito.";
          break;
        }

        resumen += `
          <li class='list-group-item'>
            <div class="d-flex justify-content-between align-items-center">
              <strong>${cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>
              <span class='badge bg-primary rounded-pill'>${total}/25 - ${nivel}</span>
            </div>
            <div class="mt-2 text-mensaje ${nivel.toLowerCase()}">${mensaje}</div>
          </li>`;
      }

      resumen += "</ul>";
      document.getElementById("test-container").style.display = "none";
      resultadoDiv.innerHTML = resumen;
    }

    mostrarPregunta();