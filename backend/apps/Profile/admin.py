from django.contrib import admin
from .models import Achievement, Education, Experince, Project, Skill, User, UserProfile
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','email','first_name','last_name','is_staff','is_active','is_admin']

@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):
    list_display =['user','professionalTitle','headline','contactNo','github','linkedin','profilePic']

@admin.register(Project)
class userProject(admin.ModelAdmin):
    list_display =['id','user','projectTitle','projectSubTitle','projectDescription','projectLink']

@admin.register(Experince)
class userExperience(admin.ModelAdmin):
    list_display =['id','user','organisationName','role','startDate','endDate','loaction','description']

@admin.register(Achievement)
class userAchievement(admin.ModelAdmin):
    list_display =['id','user','archieved']

@admin.register(Skill)
class userSkill(admin.ModelAdmin):
    list_display = ['id','user','skillName']

@admin.register(Education)
class userEducation(admin.ModelAdmin):
    list_display = ['id','user','boardName','collegeName','startDate','endDate','Courses']