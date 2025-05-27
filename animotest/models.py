from django.db import models
from django.utils import timezone

class EvaluacionAnimo(models.Model):
    CATEGORIAS = [
        ('tristeza', 'Tristeza'),
        ('ansiedad', 'Ansiedad'),
        ('motivacion', 'Motivación'),
        ('energia', 'Energía'),
        ('concentracion', 'Concentración'),
        ('autoestima', 'Autoestima'),
    ]
    
    nombre_usuario = models.CharField(max_length=100)
    fecha_evaluacion = models.DateTimeField(default=timezone.now)
    
    # Resultados
    tristeza = models.PositiveSmallIntegerField()
    ansiedad = models.PositiveSmallIntegerField()
    motivacion = models.PositiveSmallIntegerField()
    energia = models.PositiveSmallIntegerField()
    concentracion = models.PositiveSmallIntegerField()
    autoestima = models.PositiveSmallIntegerField()
    
    respuestas = models.JSONField(default=dict)
    
    class Meta:
        verbose_name = "Evaluación de Ánimo"
        verbose_name_plural = "Evaluaciones de Ánimo"
        ordering = ['-fecha_evaluacion']
    
    def __str__(self):
        return f"{self.nombre_usuario} - {self.fecha_evaluacion.strftime('%d/%m/%Y')}"
    
    @property
    def promedio(self):
        return round((
            self.tristeza + self.ansiedad + self.motivacion +
            self.energia + self.concentracion + self.autoestima
        ) / 6, 1)
    
    def obtener_puntuacion(self, categoria):
        return getattr(self, categoria)
