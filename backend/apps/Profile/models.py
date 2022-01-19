from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None,**extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password,**extra_fields):
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=100,blank=True,null=True)
    last_name = models.CharField(max_length=100,blank=True,null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    professionalTitle = models.CharField(max_length=100,blank=True,null=True)
    headline = models.CharField(max_length=200,blank=True,null=True)
    profilePic = models.ImageField(upload_to='profile/',default='default.jpg')
    github = models.URLField(max_length=300,blank=True,null=True)
    linkedin = models.URLField(max_length=300,blank=True,null=True)
    contactNo = models.CharField(max_length=12,blank=True,null=True)

    def __str__(self):
        return self.user.email

@receiver(post_save, sender=User)
def create_user_profile(sender, instance,created,**kwargs):
    if created:
        UserProfile.objects.create(user=instance)
       
class Project(models.Model):
    projectTitle = models.CharField(max_length=100)
    projectSubTitle = models.CharField(max_length=100,blank=True,null=True)
    projectDescription = models.CharField(max_length=500,blank=True,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    projectLink = models.URLField(max_length=300,blank=True,null=True)
    def __str__(self):
        return self.projectTitle

class Experince(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    organisationName = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField(blank=True,null=True)
    loaction = models.CharField(max_length=100)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.organisationName 

class Achievement(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    archieved = models.CharField(max_length=200)

    def __str__(self):
        return self.archieved

class Skill(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    skillName = models.CharField(max_length=50)

    def __str__(self):
        return self.skillName
    
class Education(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    boardName = models.CharField(max_length=100)
    collegeName = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField()
    Courses = models.CharField(max_length=300)

    def __str__(self):
        return self.collegeName