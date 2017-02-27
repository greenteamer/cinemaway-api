from django.shortcuts import render


def profile(request):
    # return render(request, 'authentication/profile.html')
    return render(request, 'core/index.html')


def facebook(request):
    # return render(request, 'authentication/profile.html')
    return render(request, 'core/index.html')
