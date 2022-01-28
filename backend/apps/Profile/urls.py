from urllib.parse import urlparse
from django.urls import path
from .views import UserProfileView,ProjectView,ExperienceView,AchievementView,SkillsView,EducationView,getAllUserDetails
from .auth import validateUser,updatePassword,UserAccount

urlpatterns = [
    path('user/validate/',validateUser),
    path('user/create/',UserAccount),
    path('user/changepassword/',updatePassword),
    path('userProfile/',UserProfileView),
    path('projects/<int:id>',ProjectView),
    path('projects/',ProjectView),
    path('experience/<int:id>',ExperienceView),
    path('experience/',ExperienceView),
    path('achievement/<int:id>',AchievementView),
    path('achievement/',AchievementView),
    path('skills/<int:id>',SkillsView),
    path('skills/',SkillsView),
    path('education/<int:id>',EducationView),
    path('education/',EducationView),
    path('all/',getAllUserDetails)
]
