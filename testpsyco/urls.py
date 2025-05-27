"""
URL configuration for testpsyco project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path
from .views import InicioView, EvaluacionView, GuardarResultadosView, ResultadosView, HistorialView

app_name = 'animotest'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/', admin.site.urls),
    path('', include('animotest.urls')),
    path('', InicioView.as_view(), name='inicio'),
    path('evaluacion/', EvaluacionView.as_view(), name='evaluacion'),
    path('guardar-resultados/', GuardarResultadosView.as_view(), name='guardar_resultados'),
    path('resultados/<int:id_evaluacion>/', ResultadosView.as_view(), name='resultados'),
    path('historial/', HistorialView.as_view(), name='historial'),
]
