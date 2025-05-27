from django import forms

class NombreUsuarioForm(forms.Form):
    nombre = forms.CharField(
        label="Tu nombre",
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ingresa tu nombre',
            'autofocus': True
        })
    )