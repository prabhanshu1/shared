from django.contrib.auth.models import User
from django.shortcuts import render
def save_profile(backend, user, response, *args, **kwargs):
    if backend.name == 'google-oauth2':
        print("\n\n in save_profile\n\n")
        print(user)
        print(response)
        try:

            user = User.objects.get(email=response["emails"][0]["value"])
            print("printing user;;")
            print(user)
            print("printed user;;")
        except User.DoesNotExist:
            print("creating user;;")
            user=User.objects.create_user(response["name"]["givenName"],response["emails"][0]["value"]);
            user.first_name=response["name"]["givenName"]
            user.last_name=response["name"]["familyName"]
            user.save()
            print("created user;;")

            #profile = user.get_profile()
        #if profile is None:
            print("\n\n in end of  save_profile\n\n")
