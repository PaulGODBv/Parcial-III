from django.shortcuts import render, redirect
from django.views import View
from django.http import JsonResponse
from .models import EvaluacionAnimo
from .forms import NombreUsuarioForm
import json

class InicioView(View):
    def get(self, request):
        form = NombreUsuarioForm()
        return render(request, 'animotest/test.html', {'form': form})
    
    def post(self, request):
        form = NombreUsuarioForm(request.POST)
        if form.is_valid():
            request.session['nombre_usuario'] = form.cleaned_data['nombre']
            return redirect('evaluacion')
        return render(request, 'animotest/test.html', {'form': form})

class EvaluacionView(View):
    def get(self, request):
        if 'nombre_usuario' not in request.session:
            return redirect('inicio')
        return render(request, 'animotest/test.html')

class GuardarResultadosView(View):
    def post(self, request):
        if 'nombre_usuario' not in request.session:
            return JsonResponse({'error': 'Sesión no iniciada'}, status=400)
        
        try:
            data = json.loads(request.body)
            
            evaluacion = EvaluacionAnimo(
                nombre_usuario=request.session['nombre_usuario'],
                tristeza=data['tristeza'],
                ansiedad=data['ansiedad'],
                motivacion=data['motivacion'],
                energia=data['energia'],
                concentracion=data['concentracion'],
                autoestima=data['autoestima'],
                respuestas=data['respuestas']
            )
            evaluacion.save()
            
            del request.session['nombre_usuario']
            
            return JsonResponse({
                'success': True,
                'evaluacion_id': evaluacion.id
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class ResultadosView(View):
    def get(self, request, id_evaluacion):
        try:
            evaluacion = EvaluacionAnimo.objects.get(pk=id_evaluacion)
            return render(request, 'animotest/results.html', {'evaluacion': evaluacion})
        except EvaluacionAnimo.DoesNotExist:
            return redirect('inicio')

class HistorialView(View):
    def get(self, request):
        evaluaciones = EvaluacionAnimo.objects.all().order_by('-fecha_evaluacion')
        return render(request, 'animotest/history.html', {'evaluaciones': evaluaciones})