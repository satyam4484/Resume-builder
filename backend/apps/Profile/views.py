from functools import partial
import re
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.response import Response
from .serializers import AchievmentSerializer, UserProfileSerializer,ProjectSerializer,ExperienceSerializer,SkillSerializer,EducationSerializer
from .models import Achievement, Education, UserProfile,Project,Experince,Skill

def ResponseFormat(error,msg,additionalmsg,data):
    return Response({"error":error,"msg":msg,"additonalMsg":additionalmsg,"data":data})


@api_view(['GET','POST','PATCH','DELETE'])
def EducationView(request,id=None):
    if request.method == "GET":
        try:
            education = Education.objects.filter(user = request.user)
            serializer = EducationSerializer(education,many=True)
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user Education",[]) 
    elif request.method =="POST":
        try:
            data = request.data
            serializer = EducationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user = request.user)
                return ResponseFormat(False,"","",[])
            else:
                return ResponseFormat(True,str(serializer.errors),"Error Occured in creating user Education !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in creating user Education ",[]) 
    elif request.method=="PATCH":
        try:
            if id:
                education = Education.objects.get(pk=id)
                data = request.data
                serializer = EducationSerializer(instance=education,data = data,partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(user=request.user)
                    return ResponseFormat(False,"Education updated Succesfully !!! ","",[])
                else :
                    return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating user Education !!!",[])
            else:
                return ResponseFormat(True,"Please Provide id to update ","Error Occured in Updating Education !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in updating user Education ",[]) 
    elif request.method=="DELETE":
        try:
            if id:
                education = Education.objects.get(pk=id)
                education.delete()
                return ResponseFormat(False,"Education deleted Succesfully !!! ","",[])

            else :
                return ResponseFormat(True,"please Provide an id to delete ","Error Occured in deleting user Education ",[]) 
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Deleting user Education",[])


# api calls for skills  

@api_view(['GET','POST','PATCH','DELETE'])
def SkillsView(request,id=None):
    if request.method == "GET":
        try:
            skill = Skill.objects.filter(user = request.user)
            serializer = SkillSerializer(skill,many=True)
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user skills",[]) 
    elif request.method =="POST":
        try:
            data = request.data
            serializer = SkillSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user = request.user)
                return ResponseFormat(False,"","",[])
            else:
                return ResponseFormat(True,str(serializer.errors),"Error Occured in creating user skills !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in creating user skills ",[]) 
    elif request.method=="PATCH":
        try:
            if id:
                skill = Skill.objects.get(pk=id)
                data = request.data
                serializer = SkillSerializer(instance=skill,data = data,partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(user=request.user)
                    return ResponseFormat(False,"skills updated Succesfully !!! ","",[])
                else :
                    return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating user skills !!!",[])
            else:
                return ResponseFormat(True,"Please Provide id to update ","Error Occured in Updating skills !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in updating user skills ",[]) 
    elif request.method=="DELETE":
        try:
            if id:
                skill = Skill.objects.get(pk=id)
                skill.delete()
                return ResponseFormat(False,"skill deleted Succesfully !!! ","",[])

            else :
                return ResponseFormat(True,"please Provide an id to delete ","Error Occured in deleting user skill ",[]) 
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Deleting user skill ",[])


# api calls for achievments
@api_view(['GET','POST','PATCH','DELETE'])
def AchievementView(request,id=None):
    if request.method == "GET":
        try:
            achievement = Achievement.objects.filter(user = request.user)
            serializer = AchievmentSerializer(achievement,many=True)
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user Achievement",[]) 
    elif request.method =="POST":
        try:
            data = request.data
            # data['user'] = request.user.id
            serializer = AchievmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user = request.user)
                return ResponseFormat(False,"","",[])
            else:
                return ResponseFormat(True,str(serializer.errors),"Error Occured in creating user Achievement !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in creating user Achievement ",[]) 
    elif request.method=="PATCH":
        try:
            if id:
                achievement = Achievement.objects.get(pk=id)
                data = request.data
                serializer = AchievmentSerializer(instance=achievement,data = data,partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(user=request.user)
                    return ResponseFormat(False,"Achievement updated Succesfully !!! ","",[])
                else :
                    return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating user Achievement !!!",[])
            else:
                return ResponseFormat(True,"Please Provide id to update ","Error Occured in Updating Achievement !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in updating user Achievement ",[]) 
    elif request.method=="DELETE":
        try:
            if id:
                achievement = Achievement.objects.get(pk=id)
                achievement.delete()
                return ResponseFormat(False,"Achievement deleted Succesfully !!! ","",[])

            else :
                return ResponseFormat(True,"please Provide an id to delete ","Error Occured in deleting user Achievement ",[]) 
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Deleting user Achievement ",[])


# api calls for experience
@api_view(['GET','POST','PATCH','DELETE'])
def ExperienceView(request,id=None):
    if request.method == "GET":
        try:
            experience = Experince.objects.filter(user = request.user)
            serializer = ExperienceSerializer(experience,many=True)
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user Experience",[]) 
    elif request.method =="POST":
        try:
            data = request.data
            data['user'] = request.user.id
            serializer = ExperienceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return ResponseFormat(False,"","",[])
            else:
                return ResponseFormat(True,str(serializer.errors),"Error Occured in creating user Experience !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in creating user Experience ",[]) 
    elif request.method=="PATCH":
        try:
            if id:
                experience = Experince.objects.get(pk=id)
                data = request.data
                data['user'] = request.user.id
                serializer = ExperienceSerializer(instance=experience,data = data,partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return ResponseFormat(False,"Experience updated Succesfully !!! ","",[])
                else :
                    return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating user Experience !!!",[])
            else:
                return ResponseFormat(True,"Please Provide id to update ","Error Occured in Updating Experience !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in updating user Experience ",[]) 
    elif request.method=="DELETE":
        try:
            if id:
                experience = Experince.objects.get(pk=id)
                experience.delete()
                return ResponseFormat(False,"Experience deleted Succesfully !!! ","",[])

            else :
                return ResponseFormat(True,"please Provide an id to delete ","Error Occured in deleting user Experience ",[]) 
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Deleting user Experience ",[])



# api method calls for project table 
@api_view(['GET','POST','PATCH','DELETE'])
def ProjectView(request,id=None):
    if request.method == "GET":
        try:
            projects = Project.objects.filter(user = request.user)
            serializer = ProjectSerializer(projects,many=True)
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user Projects ",[]) 
    elif request.method =="POST":
        try:
            data = request.data
            data['user'] = request.user.id
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return ResponseFormat(False,"","",[])
            else:
                return ResponseFormat(True,str(serializer.errors),"Error Occured in creating user Projects!!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in creating user Projects ",[]) 
    elif request.method=="PATCH":
        try:
            if id:
                project = Project.objects.get(pk=id)
                data = request.data
                data['user'] = request.user.id
                serializer = ProjectSerializer(instance=project,data = data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return ResponseFormat(False,"Project updated Succesfully !!! ","",[])
                else :
                    return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating user Projects !!!",[])
            else:
                return ResponseFormat(True,"Please Provide id to update ","Error Occured in Updating Project !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in updating user Projects ",[]) 
    elif request.method=="DELETE":
        try:
            if id:
                project = Project.objects.get(pk=id)
                project.delete()
                return ResponseFormat(False,"Project deleted Succesfully !!! ","",[])

            else :
                return ResponseFormat(True,"please Provide an id to delete ","Error Occured in deleting user Projects ",[]) 
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Deleting user Projects ",[]) 


@api_view(['GET','POST','PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,FormParser])
def UserProfileView(request):
    if request.method == "GET":
        try:
            user = UserProfile.objects.get(user = request.user)
            serializer =UserProfileSerializer(user,context={"request": request})
            return ResponseFormat(False,"","",serializer.data)
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in getting user Profile",[])
    # elif request.method=="POST":
    #     try:
    #         pass
    #     except Exception as e:
    #         return ResponseFormat(True,str(e),"Error Occured in Creating user Profile",[])
    elif request.method == "PATCH":
        try:
            data = request.data
            user = UserProfile.objects.get(user = request.user)
            serializer = UserProfileSerializer(instance=user,data=data,context={"request": request})
            if serializer.is_valid():
                serializer.save(user=request.user)
                return ResponseFormat(False,"","","Profile Updated SuccessFully !!!")
            else :
                return ResponseFormat(True,str(serializer.errors),"Error Occured in Updating UserProfile !!!",[])
        except Exception as e:
            return ResponseFormat(True,str(e),"Error Occured in Updating user Profile",[])

