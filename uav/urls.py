"""hackathon URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import path, include

from . import views

urlpatterns = [
    #path('', include('uav.urls')),
    #path('admin/', admin.site.urls),
    path('',views.startPage),
    path('app', views.app, name='app'),
    path('register', views.RegisterFormView, name = 'register'),
    path('login',views.login_user, name = 'login'),
    path('logout', views.logout_user, name='logout'),
    path('listbpla', views.listUav, name='listbpla'),
    path('list-route', views.listRoute, name='list-route'),
    path('listTasks', views.listTasks, name='listTasks'),
    path('select', views.select, name='select'),
    path('route', views.RedirectToOneRoute, name='route'),
    path('view', views.view, name='view'),

#-------------------Api-----------------------------------------------------------#
    path('api/getSpecifiedRoute', views.apiGetSpecifiedRoute, name = 'apiGetSpecifiedRoute'),
    path('api/getProblem', views.apiGetProblem, name = 'apiGetProblem'),
    path('api/createProblem', views.apiCreateProblem, name = 'apiCreateProblem'),
    path('api/getCharacteristics', views.apiGetCharacteristics, name = 'apiGetCharacteristics'),
    path('api/changeCharacteristics', views.apiChangeCharacteristics, name = 'apiChangeCharacteristics'), 
    path('api/getUav', views.apiGetUav, name='apiGetUav'), 
    path('api/getRoute', views.apiGetRoute, name='apiGetRoute'),
    path('api/saveRoute', views.apiSaveRoute,name = 'apiSaveRoute'),
    path('api/OptimizeRoute', views.apiOptimizeRoute, name='apiOptimizeRoute'),
    path('api/CreateUav', views.apiCreateUav, name='apiCreateUav'),
]

