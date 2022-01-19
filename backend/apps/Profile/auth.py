from django.shortcuts import render
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer


@api_view(['PUT'])
def updatePassword(request):
    try:
        data = request.data 
        user = User.objects.get(email = request.user)
        if not user.check_password(data['old_password']):
            return Response({"error":True,"msg":"Old password is not correct","additional":"erorr occured in changing password","data":""})       
        else:
            user.set_password(data['new_password'])
            user.save()
            return Response({"error":False,"msg":"","additional":"","data":""})
    except Exception as e:
        return Response({"error":True,"msg":str(e),"additional":"erorr occured in changing password","data":""})


@api_view(['POST','GET','PATCH'])
def UserAccount(request):
    if request.method == "GET":
        try:
            user = User.objects.get(email = request.user)
            serializer = UserSerializer(user)
            return Response({"error":False,"msg":"","additional":"","data":serializer.data})
        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"erorr occured in getting user data","data":""})
    elif request.method == "POST":
        try:
            data = request.data 
            serializer = UserSerializer(data = data,context={"request": request})
            if serializer.is_valid():
                serializer.save()
                return Response({"error":False,"msg":"Account Created Successfully !!","additional":"","data":""})
            else:
                return Response({"error":True,"msg":str(serializer.errors),"additional":"erorr occured in creating user ","data":""})
        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"error occured in creating user ","data":""})
    elif request.method == "PATCH":
        try:
            user = User.objects.get(email = request.user)
            data = request.data
            serializer = UserSerializer(data = data,instance = user)
            if serializer.is_valid():
                serializer.save()
                return Response({"error":False,"msg":"","additional":"","data":""})
            else:
                return Response({"error":True,"msg":str(serializer.errors),"additional":"error ocurred in updating user data ","data":""}) 
        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"erorr occured in updating user ","data":""})

@api_view(['POST'])
@permission_classes([AllowAny])
def validateUser(request):
    try:
        print("validating user")
        email = request.data['email']
        if User.objects.filter(email = email):
            return Response({"error":True,"msg":"Email Already Taken!!","additional":"","data":""})
        else:
            return Response({"error":False,"msg":"","additional":"","data":""})
    except Exception as e:
        return Response({"error":True,"msg":str(e),"additional":"erorr occured in validating email ","data":""})