from django.urls import path
from . import views
from.views import MyTokenObtainPairView,RegistrationView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns =[
    path('',views.getRoutes),
  
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path ('register/',RegistrationView.as_view()),
    path('userList/',views.classUserList.as_view(),name='userList'),
    path('updateUser/<int:id>/',views.userDetails,name='updateuser'),
    path('updateuserForm/<int:id>/',views.updateUser,name='updateuserForm'),
    path('deleteUser/<int:id>/',views.deleteUser,name='deleteuser'),
    path('homeThings/',views.HomeThings,name='homeThings'),
    path('CreateCard/',views.CreateCard,name='CreateCard'),
]   