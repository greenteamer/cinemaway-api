from django.contrib import admin
from core.models import Rubric, Vacancy, UserRequest, UserResponse, Rent, RentRubric


admin.site.register(Rubric)
admin.site.register(RentRubric)
admin.site.register(Vacancy)
admin.site.register(Rent)
admin.site.register(UserRequest)
admin.site.register(UserResponse)
