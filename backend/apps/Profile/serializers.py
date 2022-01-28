from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Achievement, Experince, Skill, UserProfile,Project,Education

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','is_admin','last_login']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields=['user','professionalTitle','headline','profilePic','github','linkedin','contactNo']
        extra_kwargs = {'user': {'required': False}}


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields=['id','projectTitle','projectSubTitle','projectDescription','user','projectLink']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experince
        fields=['id','user','organisationName','role','startDate','endDate','loaction','description']

class AchievmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields=['id','archieved']
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields=['id','skillName']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model =Education
        fields=['id','boardName','collegeName','startDate','endDate','Courses']
