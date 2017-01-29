from django.contrib import admin
from core.models import Rubric, Vacancy, UserRequest, UserResponse


admin.site.register(Rubric)
admin.site.register(Vacancy)
admin.site.register(UserRequest)
admin.site.register(UserResponse)
