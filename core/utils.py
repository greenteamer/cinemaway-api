# -*- coding: utf-8 -*-
import random
from rest_framework.authtoken.models import Token


def get_token(request):
    try:
        token = Token.objects.get_or_create(user=request.user)
        return token[0].key
    except Exception:
        return None


def set_cart_id(request):
    if request.session.get('cart_id', '') == '':
        request.session['cart_id'] = generate_cart_id()

    return request.session['cart_id']


def generate_cart_id():
    cart_id = ''
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    for a in range(50):
        cart_id += characters[random.randint(0, len(characters)-1)]

    return cart_id


def del_session_cart_id(request):

    if request.session.get('cart_id', '') != '':
        del request.session['cart_id']


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
