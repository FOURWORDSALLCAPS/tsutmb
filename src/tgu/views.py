from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import LoginForm, RegisterForm


def view_404(request, exception):

    return render(request, '404.html', status=404)


def view_tgu(request):

    return render(request, 'tgu.html', {'user': request.user})


def view_login(request):

    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('tgu:view_tgu')
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


def view_register(request):

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('tgu:view_tgu')
    else:
        form = RegisterForm()

    return render(request, 'register.html', {'form': form})


def view_logout(request):

    from django.contrib.auth import logout
    logout(request)
    return redirect('tgu:view_tgu')
