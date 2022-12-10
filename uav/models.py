from django.db import models

# Create your models here.
STATUS_UAV = [
    (0, "На задании"),
    (1, "Ожидает")
]


class User(models.Model):
    name = models.CharField("Имя пользователя", max_length=255)

    on_create = models.DateTimeField("Время создания", auto_now_add=True, editable=False, null=False)
    on_change = models.DateTimeField("Время изменения", auto_now=True, null=False)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

class Uav(models.Model):
    name = models.CharField("Название БПЛА", max_length=255, unique=True)
    velocity = models.IntegerField("Скорость БПЛА", null=False)
    maximum_gforce = models.IntegerField("Максимальная перегрузка БПЛА", null=False)
    volume = models.IntegerField("Объем топлива БПЛА", null=False)
    
    def __str__(self) -> str:
        return self.name

    on_create = models.DateTimeField("Время создания", auto_now_add=True, editable=False, null=False)
    on_change = models.DateTimeField("Время изменения", auto_now=True, null=False)
    
    class Meta:
        verbose_name = "БПЛА"
        verbose_name_plural = "БПЛА"

class StatusUav(models.Model):
    status = models.IntegerField('Название статуса', null=False, choices=STATUS_UAV)
    uav = models.ForeignKey(Uav, on_delete=models.CASCADE, related_name='status', unique=True)

    on_create = models.DateTimeField("Время создания", auto_now_add=True, editable=False, null=False)
    on_change = models.DateTimeField("Время изменения", auto_now=True, null=False)
    

    class Meta:
        verbose_name = "Статус БПЛА"
        verbose_name_plural = "Статусы БПЛА"


class Route(models.Model):
    name = models.CharField("Название маршрута",max_length=255, unique=True)
    points = models.TextField("Точки маршрута")
    uav = models.ForeignKey(Uav, on_delete=models.CASCADE, related_name='route')
    is_used = models.BooleanField("В использовании", default=False)
    def __str__(self) -> str:
        return self.name

    on_create = models.DateTimeField("Время создания", auto_now_add=True, editable=False, null=False)
    on_change = models.DateTimeField("Время изменения", auto_now=True, null=False)

    class Meta:
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"

class Problem(models.Model):
    name = models.CharField("Название боевой задачи", max_length=255, unique=True)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='route')
    uav = models.ForeignKey(Uav, on_delete=models.CASCADE, related_name='uav')

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

class Event(models.Model):
    name = models.CharField("Название события", max_length=255)
    content = models.TextField("Описание события")
    place = models.TextField("Место регистрации события")

    class Meta:
        verbose_name = "Событие"
        verbose_name_plural = "События"

    on_create = models.DateTimeField("Время создания события", auto_now_add=True, editable=False, null=False)
    on_change = models.DateTimeField("Время изменения события", auto_now=True, null=False)