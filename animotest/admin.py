from django.contrib import admin
from .models import EvaluacionAnimo

@admin.register(EvaluacionAnimo)
class EvaluacionAnimoAdmin(admin.ModelAdmin):
    list_display = ('nombre_usuario', 'fecha_evaluacion', 'promedio')
    list_filter = ('fecha_evaluacion',)
    search_fields = ('nombre_usuario',)
    date_hierarchy = 'fecha_evaluacion'