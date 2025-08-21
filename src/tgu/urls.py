from django.urls import path

from .views import view_tgu, view_login, view_register, view_logout


app_name = "tgu"

urlpatterns = [
    path("", view_tgu, name='view_tgu'),
    path('login/', view_login, name='view_login'),
    path('register/', view_register, name='view_register'),
    path('logout/', view_logout, name='view_logout'),
]
