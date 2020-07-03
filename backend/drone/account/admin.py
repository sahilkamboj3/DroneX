from django.contrib import admin
from account.models import Account, Orders, DiscountCodes, Reviews
from django.contrib.auth.admin import UserAdmin


class AccountAdmin(UserAdmin):
    # list_filter is what the admin can filter by and shows those and what it will show on the home page for every user
    list_display = ('name',  'email', 'username', 'is_admin', 'is_staff',)
    list_filter = ('is_admin', 'is_staff',)

    search_fields = ('is_admin', 'name', 'email', 'username',)
    filter_horizontal = ()  # must have this or else code won't run
    readonly_fields = ('date_joined', 'last_login',)

    fieldsets = [
        ('User information', {'fields': [
         'name', 'email', 'username', 'password', 'profile_image']}),
        ('Permissions', {'fields': [
         'is_admin', 'is_staff', 'is_superuser']}),
    ]


class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'count', 'date_created', 'final_cost')
    search_fields = ('customer', 'count',)
    readonly_fields = ('date_created',)

    fieldsets = [
        ('User information', {'fields': ['customer']}),
        ('Order information', {'fields': ['final_cost', 'count', ]})
    ]


class DiscountCodesAdmin(admin.ModelAdmin):
    list_display = ('string', 'percentOff')
    search_fields = ('string', 'percentOff')


class ReviewsAdmin(admin.ModelAdmin):
    # list_display = ('user', 'stars', 'date_created', 'review', 'image',)
    list_display = ('user', 'stars', 'review', 'image',
                    'date_created', 'is_anonymous',)
    fieldsets = [
        ('User information', {'fields': ['user', 'is_anonymous']}),
        ('Review information', {'fields': ['review', 'stars', 'image']})
    ]
    readonly_fields = ('date_created',)
    list_filter = ('is_anonymous',)


admin.site.register(Account, AccountAdmin)
admin.site.register(Orders, OrderAdmin)
admin.site.register(DiscountCodes, DiscountCodesAdmin)
admin.site.register(Reviews, ReviewsAdmin)
