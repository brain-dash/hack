from django.contrib import admin

from .models import *


#admin.site.register(Uav)
admin.site.register(User)
#admin.site.register(Route)


@admin.register(Uav)
class UavAdmin(admin.ModelAdmin):
    model = Uav
    
    list_display = ['id', 'name']
@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    model = Route
    
    list_display = ['id', 'name', 'uav']

@admin.register(StatusUav)
class StatusUavAdmin(admin.ModelAdmin):
    model = StatusUav
    
    list_display = ['id', 'status', 'uav']


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    model = Problem
    
    list_display = ['id', 'route', 'uav']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    model = Event
    
    list_display = ['id', 'name', 'content', 'place']