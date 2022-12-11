import pprint
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import json
from .models import *
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from .forms import SignInForm, SignUpForm
from django.views.decorators.http import require_http_methods
from predict import predict

# -----------------------API-------------------------------------------


@login_required
def apiGetUav(request):
    uavs = Uav.objects.all().select_related(
        'status').values('name', 'status__status', 'velocity')
    context = []
    for uav in uavs:
        context.append(
            {
                "name": uav['name'],
                "status": uav['status__status'],
                "velocity" : uav['velocity']
            }
        )
    context = json.dumps(context, ensure_ascii=False)
    return HttpResponse(context, content_type="application/json")


def apiGetSpecifiedRoute(request):
    #data = json.loads(request.body)["data"]
    data = {'name': "Route1"}
    name = data['name']
    route = Route.objects.filter(name=name)[0]
    context = {
        'points': route.points,
        'is_used': route.is_used
    }
    context = json.dumps(context, ensure_ascii=False)
    return HttpResponse(context, content_type="application/json")


@csrf_exempt
@login_required
def apiGetRoute(request):
    routes = Route.objects.all()
    context = []
    for route in routes:
        context.append(
            {
                'name': route.name,
                'points': json.loads(route.points),
                'time_create': route.on_create,
            }
        )
    context = json.dumps(context, ensure_ascii=False,
                         indent=4, sort_keys=True, default=str)
    return HttpResponse(context, content_type="application/json")


@csrf_exempt
@login_required
def apiGetProblem(request):

    problems = Problem.objects.all().select_related(
        'route', 'uav').values('route__name', 'uav__name')
    context = {}
    for problem in problems:
        context.update(problem)

    context = json.dumps(context, ensure_ascii=False)
    return HttpResponse(context, content_type="application/json")


@csrf_exempt
@login_required
def apiGetCharacteristics(request):
    data = json.loads(request.body)
    #data = {'name' : 'Тест1' }
    uav_route_name = data['name']
    uav = Uav.objects.filter(name=uav_route_name)[0]
    context = {
        'name': uav.name,
        'velocity': uav.velocity,
        'maximum_gforce': uav.maximum_gforce,
    }
    context = json.dumps(context, ensure_ascii=False)
    return HttpResponse(context, content_type="application/json")



@csrf_exempt
@login_required
def RedirectToOneRoute(request):
    
    route = Route.objects.filter(name = request.POST['name'])[0]
    
    count_points = len(json.loads(route.points))
    context =   {
            'name' : route.name, 
            'points' : json.loads(route.points),
            'count' : count_points
        }
    
    #context = json.dumps(context, ensure_ascii=False)
    return render(request, 'route.html', context = context)

@csrf_exempt
@login_required
def apiCreateUav(request):
    data = request.POST
    uav = Uav(
        name = data['bpla-name'],
        velocity = data['bpla-velocity'],
        maximum_gforce = data['bpla-gforce'],

        
    )

    uav.save()
    return redirect('listbpla')
@csrf_exempt
@login_required
def apiChangeCharacteristics(request):
    data = request.POST

    #data = {'name' : 'Тест1', 'velocity' : 20, 'maximum_gforce' : 10}
    uav = Uav.objects.filter(name=data['name'])[0]
    uav.name = data['change-name']
    uav.velocity = data['bpla-velocity']
    uav.maximum_gforce = data['bpla-gforce']


    uav.save()
    result = True
    return redirect('listbpla')


@csrf_exempt
@login_required
def apiCreateProblem(request):
    #data = json.loads(request.body)["data"]
    data = request.POST
    uav = Uav.objects.filter(name = data['name_vua'])[0]
    route = Route.objects.filter(name = data['name_route'])[0]

    problem = Problem(
        name=f'{uav.id}' + ' ' + f'{route.id}',
        uav=uav,
        route=route
    )
    problem.save()
    result = True
    return HttpResponse(json.dumps({"data": result}, default=lambda o: '<not serializable>'), content_type="application/json")


@csrf_exempt
@login_required
def apiSaveRoute(request):

    data = json.loads(request.body)
    user_ = User.objects.get(pk=1)
    uav_route_name = data['uav_name']
    uav_name = Uav.objects.filter(name=uav_route_name)[0]

    route_name = data['route_name']

    route_points = data['route']

    route = Route(
        name=route_name,
        points=route_points,
        user=user_,
        uav=uav_name
    )
    route.save()
    result = True
    return HttpResponse(json.dumps({"data": result}, default=lambda o: '<not serializable>'), content_type="application/json")


@csrf_exempt
@login_required
def apiCreateVua(request):
    #data = json.loads(request.body)["data"]
    uav_name = data['name']
    uav_velocity = data['velocity']
    uav_maximum_gforce = data['maximum_gforce']

    uav = Uav(
        name=uav_name,
        velocity=uav_velocity,
        maximum_gforce=uav_maximum_gforce,
    )
    uav.save()
    result = True
    return HttpResponse(json.dumps({"data": result}, default=lambda o: '<not serializable>'), content_type="application/json")


@csrf_exempt
@login_required
def apiOptimizeRoute(request):
    data = json.loads(request.body)
    points = data['route']
    vel = data['vel']
    tsp = data['tsp']
    wetzel = data['wetzel']
    overlapping = data['overlapping']

    optimize_points = json.dumps(predict(points,vel = vel, wetzel=wetzel, tsp=tsp, overlapping=overlapping))
    return HttpResponse(optimize_points, content_type="application/json")


# ------------------------------------------------------------------------------


# -------------------PAGES------------------------------------------------------
def startPage(request):
    print(request.user.is_authenticated)
    if not request.user.is_authenticated:
        return redirect('login')
    else:
        return redirect('app')


def app(request):
    return render(request, 'index.html')


@csrf_exempt
def RegisterFormView(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            # load the profile instance created by the signal
            user.save()
            raw_password = form.cleaned_data.get('password1')

            # login user after signing up
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            print(request.user.is_authenticated)
            # redirect user to home page
            return redirect('start')
    else:
        form = SignUpForm()

    return render(request, 'register.html', {'form': form})


@csrf_exempt
def login_user(request):

    if request.method == 'POST':
        name = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=name, password=password)
        if user is not None:
            login(request, user)
            return redirect("app")
        else:
            messages.success(request, ('Введен неверный логин/пароль!'))
            return redirect('login')
    else:

        return render(request, 'login.html')


def logout_user(request):
    logout(request)
    #messages.success(request,('You were logged out!'))
    return redirect('login')


def listUav(request):
    return render(request, 'listbpla.html')


def listRoute(request):
    return render(request, 'list-route.html')


def route(request):
    return render(request, 'route.html')


def listTasks(request):
    return render(request, 'tasks.html')


def select(request):
    return render(request, 'select.html')


def view(request):
    
    return render(request, 'view.html')
