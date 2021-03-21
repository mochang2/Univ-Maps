from django.shortcuts import render, get_object_or_404, get_list_or_404

# Create your views here.


def Main_Page_With_Logos(request):
    return render(request, "main_page/main_page_with_logos.html")