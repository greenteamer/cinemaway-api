from django.contrib import admin
#  from authentication.models import Profile
from django.contrib.auth.admin import UserAdmin
#  from django.contrib.auth.models import Group

from .forms import UserChangeForm
from .forms import UserCreationForm
from .models import ExtUser


class UserAdmin(UserAdmin):
    """
    Base admin classs.

    form - form for change user settings.
    add_form - used for create users
    """
    form = UserChangeForm
    add_form = UserCreationForm

    # Fields listed in admin panel
    list_display = [
        'email',
        'firstname',
        'is_admin',
        'lastname',
    ]

    # Filter for admin panel
    list_filter = ('is_admin',)

    # Fieldsets for ordering and grouping
    fieldsets = (
                (None, {'fields': ('email', 'password')}),
                ('Personal info', {
                 'fields': (
                     'avatar',
                     'firstname',
                     'lastname',
                 )}),
                ('Permissions', {'fields': ('is_admin',)}),
                ('Groups', {'fields': ('groups',)}),
                ('Important dates', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2'
            )}
         ),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


# Register ExtUser admin panel in Django
admin.site.register(ExtUser, UserAdmin)
#  admin.site.register(Group)
#  admin.site.register(Profile)
